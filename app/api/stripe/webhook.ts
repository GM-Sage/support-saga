import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { createPrintfulOrder } from '../../../lib/printful';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers['stripe-signature'];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret);
  } catch (error) {
    const err = error as Error;
    console.error('⚠️  Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Check if the session has shipping details
    if (session.shipping_details && session.shipping_details.address) {
      const { name, address } = session.shipping_details;
      const orderData = {
        recipient: {
          name: name || 'Unknown',
          address1: address.line1 || 'Unknown',
          city: address.city || 'Unknown',
          country_code: address.country || 'Unknown',
          zip: address.postal_code || 'Unknown',
        },
        items: session.line_items?.data.map((item: Stripe.LineItem) => ({
          variant_id: item.price?.product as string, // Replace with the correct Printful variant ID
          quantity: item.quantity || 1,
        })) || [],
      };

      try {
        await createPrintfulOrder(orderData);
      } catch (error) {
        console.error('Error creating Printful order:', error);
        return res.status(500).send('Error creating Printful order');
      }
    }
  }

  res.json({ received: true });
}