import React, { useState, useCallback } from "react";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  RadioButton,
  LegacyStack,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { useNavigate } from "@remix-run/react";
import { useAppBridge } from "@shopify/app-bridge-react";

export default function Index() {
  // states
  const navigate = useNavigate();
  const shopify = useAppBridge();
  const [value, setValue] = useState<string>("Active");

  const handleResourcePicker = useCallback(async () => {
    const selectedResources = shopify?.resourcePicker({
      type: "product",
      multiple: true,
    });

    if (selectedResources) {
      console.log("Selected Resources:", selectedResources);
    }
  }, [shopify]);

  // callbacks
  const handleChange = useCallback(
    (_: boolean, newValue: string) => setValue(newValue),
    [],
  );

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
          <Card>
            <FormLayout>
              <TextField
                label="Story Title"
                onChange={() => {}}
                autoComplete="off"
              />
              <TextField
                type="email"
                label="Story Content"
                onChange={() => {}}
                autoComplete="email"
                multiline={8}
              />
            </FormLayout>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <BlockStack gap="200">
            <Card>
              <BlockStack gap="200">
                <Text variant="headingMd" as="h6">
                  Visibility
                </Text>
                <LegacyStack vertical>
                  <RadioButton
                    label="Active"
                    helpText="Story will be visible to customers."
                    checked={value === "Active"}
                    id="Active"
                    name="accounts"
                    onChange={handleChange}
                  />
                  <RadioButton
                    label="Inactive"
                    helpText="Story will not be visible to customers."
                    id="Inactive"
                    name="accounts"
                    checked={value === "Inactive"}
                    onChange={handleChange}
                  />
                </LegacyStack>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <Text variant="headingMd" as="h6">
                  Visibility
                </Text>
                <LegacyStack vertical>
                  <RadioButton
                    label="Active"
                    helpText="Story will be visible to customers."
                    checked={value === "Active"}
                    id="Active"
                    name="accounts"
                    onChange={handleChange}
                  />
                  <RadioButton
                    label="Inactive"
                    helpText="Story will not be visible to customers."
                    id="Inactive"
                    name="accounts"
                    checked={value === "Inactive"}
                    onChange={handleChange}
                  />
                </LegacyStack>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
