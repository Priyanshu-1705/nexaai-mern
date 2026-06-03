import Stripe from "stripe";
import Transaction
from "../models/Transaction.js";
import User
from "../models/User.js";

const stripe =
    new Stripe(
        process.env
            .STRIPE_SECRET_KEY
    );

export const stripeWebhooks =
    async (
        req,
        res
    ) => {

        const signature =
            req.headers[
                "stripe-signature"
            ];

        let event;

        try {

            event =
                stripe.webhooks.constructEvent(
                    req.body,
                    signature,
                    process.env
                        .STRIPE_WEBHOOK_SECRET
                );

        } catch (error) {

            console.log(
                "Webhook error:",
                error.message
            );

            return res
                .status(400)
                .send(
                    `Webhook Error: ${error.message}`
                );
        }

        try {

            switch (
                event.type
            ) {

                case
                    "checkout.session.completed": {

                    const session =
                        event.data.object;

                    const {
                        transactionId,
                        appId
                    } =
                        session.metadata || {};

                    if (
                        appId !==
                        "nexaai"
                    ) {
                        return res.json({
                            received:
                                true
                        });
                    }

                    const transaction =
                        await Transaction.findOne({
                            _id:
                                transactionId,
                            isPaid:
                                false
                        });

                    if (
                        !transaction
                    ) {

                        return res.json({
                            received:
                                true,
                            message:
                                "Transaction already processed"
                        });
                    }

                    // Add credits
                    await User.updateOne(
                        {
                            _id:
                                transaction.userId
                        },
                        {
                            $inc: {
                                credit:
                                    transaction.credit
                            }
                        }
                    );

                    // Mark paid
                    transaction.isPaid =
                        true;

                    await transaction.save();

                    console.log(
                        "Credits added successfully"
                    );

                    break;
                }

                default:
                    console.log(
                        `Unhandled event: ${event.type}`
                    );
            }

            return res.json({
                received: true
            });

        } catch (error) {

            console.log(
                "Webhook processing error:",
                error
            );

            return res
                .status(500)
                .send(
                    "Internal Server Error"
                );
        }
    };