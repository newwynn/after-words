import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  Page,
  Text,
  Card,
  Button,
  BlockStack,
  Layout,
  List,
} from "@shopify/polaris";
import { NavigateFunction, useNavigate } from "@remix-run/react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export default function Index(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  return (
    <Page
      title="AfterWords – Tell the Story Behind Every Product"
      subtitle="Share product origins, artisan details, and meaningful messages post-purchase."
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

              <Text as="h2" variant="headingSm">
                Key Features
              </Text>
              <List type="bullet">
                <List.Item>
                  Show unique stories per product on the post-purchase page
                </List.Item>
                <List.Item>
                  Include images of makers, materials, or your workspace
                </List.Item>
                <List.Item>
                  Boost customer trust and brand loyalty through transparency
                </List.Item>
                <List.Item>
                  Fully integrated into Shopify admin with no coding needed
                </List.Item>
                <List.Item>
                  Show stories on the post-purchase page
                </List.Item>
                <List.Item>
                  No additional setup required
                </List.Item>
              </List>

              <Text as="h2" variant="headingSm">
                How It Works
              </Text>
              <List type="bullet">
                <List.Item>Select products from your catalog</List.Item>
                <List.Item>Add a short story and optional image</List.Item>
                <List.Item>
                  We display it automatically after checkout
                </List.Item>
                <List.Item>
                  No coding required
                </List.Item>
              </List>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <BlockStack gap="200">
            {/* Why AfterWords Section */}
            <Card padding="400">
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Why AfterWords?
                </Text>
                <Text as="p" variant="bodyMd">
                  Customers don’t just buy products — they buy the people and
                  passion behind them. AfterWords helps you connect through:
                </Text>
                <List type="bullet">
                  <List.Item>
                    Storytelling at the moment of highest engagement
                  </List.Item>
                  <List.Item>Humanizing your brand and products</List.Item>
                  <List.Item>
                    Creating emotional loyalty and repeat sales
                  </List.Item>
                </List>
              </BlockStack>
            </Card>

            <Card padding="400">
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Ready to Tell Your First Story?
                </Text>
                <Text as="p" variant="bodyMd">
                  Start by selecting a product and writing your first
                  post-purchase message.
                </Text>
                <Button variant="primary" onClick={() => navigate("/listings")}>
                  Get Started
                </Button>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
