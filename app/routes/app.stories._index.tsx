import React from "react";
import {
  Layout,
  Page,
  Text,
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Badge,
  Button,
  InlineStack,
  FooterHelp,
  Link
} from "@shopify/polaris";

import { NavigateFunction , useNavigate } from "@remix-run/react";
import { ExternalIcon } from "@shopify/polaris-icons";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "app/shopify.server";

interface Story {
  [key: string]: unknown;
  id: string;
  productName: string;
  thumbnail: string;
  storyTitle: string;
  status: "added" | "not-added";
  lastUpdated: string;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const {session} = await authenticate.admin(request);
  return { shop: session.shop };
}; 

export default function StoriesIndex(): JSX.Element {

  // states
  let stories: Story[] = [];
  const navigate: NavigateFunction= useNavigate();
  const resourceName = { singular: "story", plural: "stories" };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(stories);

  // callbacks
  const rowMarkup: JSX.Element[] = stories.map(
    (
      { id, productName, thumbnail, storyTitle, status, lastUpdated },
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <InlineStack gap="200">
            <span style={{ fontSize: "1.2rem" }}>{thumbnail}</span>
            <Text as="span" variant="bodyMd" fontWeight="medium">
              {productName}
            </Text>
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          {storyTitle || (
            <Text as="span" tone="subdued">
              —
            </Text>
          )}
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Badge tone={status === "added" ? "success" : "critical"}>
            {status === "added" ? "Added" : "Not Added"}
          </Badge>
        </IndexTable.Cell>
        <IndexTable.Cell>{lastUpdated}</IndexTable.Cell>
        <IndexTable.Cell>
          <InlineStack gap="100">
            <Button size="slim" variant="plain">
              Edit
            </Button>
            <Button size="slim" variant="plain" tone="critical">
              Delete
            </Button>
          </InlineStack>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <>
      <Page
        title="Your Product Stories"
        subtitle="View, edit, and manage the origin stories shown after checkout for each product."
        primaryAction={{
          content: "Tell a Product's Story",
          url: "/app/stories/new",
        }}
        secondaryActions={[{
          content: "View Help Center",
          onAction: () => {
            window.open("https://help.shopify.com/manual", "_blank");
          },
          icon: ExternalIcon
        }]}
        backAction={{ content: "Stories", onAction: () => navigate("/app/stories") }}
      >
        <Layout>
          <Layout.Section>
            <LegacyCard>
              <IndexTable
                resourceName={resourceName}
                itemCount={stories.length}
                selectedItemsCount={
                  allResourcesSelected ? "All" : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                  { title: "Product" },
                  { title: "Story Title" },
                  { title: "Status" },
                  { title: "Last Updated" },
                  { title: "Actions" },
                ]}
              >
                {rowMarkup}
              </IndexTable>
            </LegacyCard>
          </Layout.Section>
        </Layout>
        <FooterHelp>
          Learn more about{" "}
          <Link url="https://help.shopify.com/manual" external>
            AfterWords
          </Link>
        </FooterHelp>
      </Page>
    </>
  );
}
