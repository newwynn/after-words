import React, { useCallback } from "react";
import {
  Card,
  Layout,
  Page,
  Text,
  BlockStack,
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Badge,
  Button,
  InlineStack,
} from "@shopify/polaris";

import ModalAddStory from "../components/ModalAddStory";


interface Story {
  [key: string]: unknown;
  id: string;
  productName: string;
  thumbnail: string;
  storyTitle: string;
  status: "added" | "not-added";
  lastUpdated: string;
}

export default function Index() {
  // Product Stories State
  const [stories, setStories] = React.useState<Story[]>([]);

  // Add Story Handler
  const handleAddStory = (story: {
    productName: string;
    storyTitle: string;
    accountEmail: string;
    thumbnail?: string;
  }) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    setStories(prev => [
      ...prev,
      {
        id: `prod_${Date.now()}`,
        productName: story.productName,
        thumbnail: story.thumbnail || "🖼️",
        storyTitle: story.storyTitle,
        status: "added",
        lastUpdated: formattedDate,
      },
    ]);
  };

  const resourceName = {
    singular: "story",
    plural: "stories",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(stories);

  const rowMarkup = stories.map(
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


const handleOpenModal = useCallback(() => {
  const modal = document.getElementById('my-modal') as any;
  if (modal && typeof modal.show === 'function') {
    modal.show();
  }
}, []);

const handleShowResourcePicker = useCallback(async () => {
  const selectedResources = await shopify?.resourcePicker({
    type: 'product',
    multiple: true,
  });

  if (selectedResources) {
    console.log('Selected Resources:', selectedResources);
  }

}, []);

const handleCloseModal = useCallback(() => {
  const modal = document.getElementById('my-modal') as any;
  if (modal && typeof modal.hide === 'function') {
    modal.hide();
  }
}, []);

  return (
    <>
      <ModalAddStory
        onShowResourcePicker={handleShowResourcePicker}
        onClose={handleCloseModal}
        onAddStory={handleAddStory}
      />
      <Page
        title="Your Product Stories"
        subtitle="View, edit, and manage the origin stories shown after checkout for each product."
        primaryAction={{
          content: "Tell a Product’s Story",
          onAction: handleOpenModal,
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
    </Page>
    </>
  );
}
