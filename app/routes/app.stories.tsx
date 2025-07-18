import React, { useCallback } from "react";
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

import type { LoaderFunctionArgs } from "@remix-run/node";
import ModalAddStory from "../components/ModalAddStory";
import { authenticate } from "app/shopify.server";
import { Outlet, useLoaderData , useNavigate, useLocation } from "@remix-run/react";
import { ExternalIcon } from "@shopify/polaris-icons";


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

export default function Index() {
  const { shop } = useLoaderData<typeof loader>();
  console.log(shop);
  const [stories, setStories] = React.useState<Story[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on a child route
  const isChildRoute = location.pathname !== '/app/stories';

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
      {!isChildRoute && (
        <>
          <ModalAddStory
            onShowResourcePicker={handleShowResourcePicker}
            onClose={handleCloseModal}
            onAddStory={handleAddStory}
            shop={shop}
          />
          <Page
            title="Your Product Stories"
            subtitle="View, edit, and manage the origin stories shown after checkout for each product."
            primaryAction={{
              content: "Tell a Product's Story",
              // onAction: handleOpenModal,
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
              {/* <Layout.Section>
              <Card>
                <BlockStack gap="200">
                  <Text variant="bodyMd" as="p">
                    AfterWords helps you build emotional connections with your
                    customers by sharing the story behind each product — right after
                    checkout.
                  </Text>
                </BlockStack>
              </Card>
            </Layout.Section> */}

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
      )}
      <Outlet />
    </>
  );
}
