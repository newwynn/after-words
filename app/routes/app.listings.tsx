import {
  Card,
  Layout,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { useCallback } from "react";

export default function Index() {

  const handleOpen: () => void = useCallback(async () => {
    const productSelector = await shopify?.resourcePicker({ type: "product" });

    if (productSelector) {
      console.log("Selected Products", productSelector);
    }
  }, []);

  return (
    <Page
      title="Your Product Stories"
      subtitle="View, edit, and manage the origin stories shown after checkout for each product."
      primaryAction={{
        content: "Add Story",
        onAction: handleOpen,
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="200">
              <Text variant="bodyMd" as="p">
                AfterWords helps you build emotional connections with your
                customers by sharing the story behind each product — right after
                checkout.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}