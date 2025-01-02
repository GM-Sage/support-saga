import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map((item: any) => ({
        quantity: item.quantity,
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image], // Include product image URL if available
          },
          unit_amount: item.price * 100, // Amount in cents
        },
      })),
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout session error:', error);
    return NextResponse.json({ error: 'Unable to create session' }, { status: 500 });
  }
}