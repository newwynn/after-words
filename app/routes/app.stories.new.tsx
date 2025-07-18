import React from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  Button,
} from "@shopify/polaris";
import { useNavigate } from "@remix-run/react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <Page
      title="Tell a Product’s Story"
      backAction={{ content: "Stories", onAction: () => navigate("/app/stories") }}
      primaryAction={{ content: "Coming Soon", disabled: true }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <Text variant="bodyMd" as="p">
              A dedicated story creation flow will be available here shortly.
            </Text>
            <Text variant="bodyMd" as="p">
              In the meantime, you can add stories from the main Stories page using the “Tell a Product’s Story” button.
            </Text>
            <Button onClick={() => navigate("/app/stories")}>Go back</Button>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
