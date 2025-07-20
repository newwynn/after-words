import React, { useState, useCallback } from "react";
import {
  Page,
  Layout,
  BlockStack,
  PageActions,
} from "@shopify/polaris";
import { useNavigate } from "@remix-run/react";
import { useAppBridge } from "@shopify/app-bridge-react";

import ProductPicker from "../components/stories/ProductPicker";
import SelectedProductsList from "../components/stories/SelectedProductsList";
import StoryFormFields from "../components/stories/StoryFormFields";
import StoryMediaFields from "../components/stories/StoryMediaFields";
import { StoryPayload } from "app/types/story";
import VisibilitySelector from "../components/stories/VisibilitySelector";
import StoryButtonFields from "../components/stories/StoryButtonFields";
import type { Product } from "app/types/story";
// import type { Product, StoryPayload } from "../../types/story";


export default function NewStoryPage() {
  const navigate = useNavigate();
  const shopify = useAppBridge();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [storyPayload, setStoryPayload] = useState<StoryPayload>({
    title: "",
    content: "",
    image: "",
    video: "",
    buttonLabel: "",
    buttonLink: "",
    visibility: "Active",
  });

  // Normalize product shape from picker
  function normalizeProduct(raw: any): Product {
    return {
      id: raw.id,
      title: raw.title,
      handle: raw.handle,
      vendor: raw.vendor,
      images: raw.images?.map((img: any) => ({ originalSrc: img.originalSrc || img.src })),
      variants: raw.variants?.map((v: any) => ({ price: v.price })),
      descriptionHtml: raw.descriptionHtml,
      status: raw.status,
    };
  }

  // Handler to update story fields from selected product
  function handleProductSelect(product: Product) {
    setStoryPayload((prev) => ({
      ...prev,
      title: product.title || "",
      content: product.descriptionHtml || "",
      image: product.images && product.images[0]?.originalSrc ? product.images[0].originalSrc : "",
      visibility: product.status !== "draft" ? "Inactive" : "Active",
    }));
    setSelectedProducts([product]);
  }

  // Product selection handlers
  const handleProductBrowse = useCallback(async () => {
    const selected = await shopify?.resourcePicker({ type: "product", multiple: true, filter: { variants: false } });
    if (selected && selected.length) {
      const normalizedProducts = selected.map(normalizeProduct);
      setSelectedProducts(normalizedProducts);
      // Set story fields from the first selected product
      handleProductSelect(normalizedProducts[0]);
    }
  }, [shopify]);
  const handleProductSearch = useCallback(async () => {
    const selected = await shopify?.resourcePicker({ type: "product", multiple: true, filter: { variants: false } });
    console.log("Selected Products:", selected);
    if (selected && Array.isArray(selected)) {
      setSelectedProducts(selected.map(normalizeProduct));
    }
  }, [shopify]);

  // Story payload field handler
  const handleStoryPayloadChange = (field: keyof StoryPayload, value: string) => {
    setStoryPayload((prev: StoryPayload) => ({ ...prev, [field]: value }));
  };
  // Visibility handler
  const handleVisibilityChange = (value: StoryPayload["visibility"]) => {
    setStoryPayload((prev: StoryPayload) => ({ ...prev, visibility: value }));
  };

  return (
    <Page
      title="Tell a Product’s Story"
      subtitle="Use to follow a normal section with a secondary section to create a 2/3 + 1/3 layout on detail pages (such as individual product or order pages). Can also be used on any page that needs to structure a lot of content. This layout stacks the columns on small screens."
      backAction={{
        content: "Stories",
        onAction: () => navigate("/app/stories"),
      }}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="200">
            <ProductPicker onSearch={handleProductSearch} onBrowse={handleProductBrowse} />
            <SelectedProductsList products={selectedProducts} />
            <StoryFormFields storyPayload={storyPayload} onFieldChange={handleStoryPayloadChange} />
            <StoryMediaFields storyPayload={storyPayload} onFieldChange={handleStoryPayloadChange} />
          </BlockStack>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <BlockStack gap="200">
            <VisibilitySelector visibility={storyPayload.visibility} onChange={handleVisibilityChange} />
            <StoryButtonFields storyPayload={storyPayload} onFieldChange={handleStoryPayloadChange} />
          </BlockStack>
        </Layout.Section>
      </Layout>
      <PageActions
        primaryAction={{
          content: "Save",
          onAction: () => {
            // TODO: Replace with actual shop value from context/session
            const shop = "TODO_SHOP_DOMAIN";
            const selectedProduct = selectedProducts[0];
            const payload = {
              shop,
              storyTitle: storyPayload.title,
              description: storyPayload.content,
              buttonLabel: storyPayload.buttonLabel,
              buttonLink: storyPayload.buttonLink,
              visibility: storyPayload.visibility,
              image: storyPayload.image,
              video: storyPayload.video,
              product: selectedProduct
                ? {
                    productId: selectedProduct.id,
                    productHandle: selectedProduct.handle,
                    productTitle: selectedProduct.title,
                    vendor: selectedProduct.vendor || "",
                  }
                : null,
            };
            // Send POST request to API
            fetch("/api/stories", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            })
              .then(async (res) => {
                const data = await res.json();
                if (res.ok && data.success) {
                  alert("Story saved successfully!");
                  // Optionally navigate or reset form here
                } else {
                  alert("Failed to save story: " + (data.error || "Unknown error"));
                }
              })
              .catch((err) => {
                alert("Error saving story: " + err.message);
              });
          },
        }}
        secondaryActions={[
          {
            content: "Delete",
            destructive: true,
          },
        ]}
      />
    </Page>
  );
}

