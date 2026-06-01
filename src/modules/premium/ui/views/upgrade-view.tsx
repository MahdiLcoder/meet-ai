"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { authClient } from "@/lib/auth-client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

import { PricingCard } from "../components/pricing-card";

export const UpgradeView = () => {
  const trpc = useTRPC();

  const { data: products } = useSuspenseQuery(
    trpc.premium.getProducts.queryOptions(),
  );

  const { data: currentSubscription } = useSuspenseQuery(
    trpc.premium.getCurrentSubscription.queryOptions(),
  );

  return (
    <div className="flex-1 flex flex-col gap-10 fade-in">
      <div className="flex flex-col gap-6 items-center text-center">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">
            Premium Plans
          </p>
          <h1 className="font-bold text-4xl md:text-5xl bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            You are on the{" "}
            <span className="text-primary">
              {currentSubscription?.name ?? "Free"}
            </span>{" "}
            plan
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upgrade your plan to unlock advanced features and increase your
            limits
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max">
        {products.map((product) => {
          const isCurrentProduct = currentSubscription?.id === product.id;
          const isPremium = !!currentSubscription;

          let buttonText = "Upgrade";
          let onClick = () => authClient.checkout({ products: [product.id] });

          if (isCurrentProduct) {
            buttonText = "Manage";
            onClick = () => authClient.customer.portal();
          } else if (isPremium) {
            buttonText = "Change Plan";
            onClick = () => authClient.customer.portal();
          }

          return (
            <PricingCard
              key={product.id}
              buttonText={buttonText}
              onClick={onClick}
              variant={
                product.metadata.variant === "highlighted"
                  ? "highlighted"
                  : "default"
              }
              title={product.name}
              price={
                product.prices[0].amountType === "fixed"
                  ? product.prices[0].priceAmount / 100
                  : 0
              }
              description={product.description}
              priceSuffix={`/${product.prices[0].recurringInterval}`}
              features={product.benefits.map((benefit) => benefit.description)}
              badge={product.metadata.badge as string | null}
            />
          );
        })}
      </div>
    </div>
  );
};

export const UpgradeViewLoading = () => {
  return (
    <LoadingState title="Loading" description="This may take a few seconds" />
  );
};

export const UpgradeViewError = () => {
  return <ErrorState title="Error" description="Please try again later" />;
};
