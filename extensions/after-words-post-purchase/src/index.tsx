/**
 * Extend Shopify Checkout with a custom Post Purchase user experience.
 * This template provides two extension points:
 *
 *  1. ShouldRender - Called first, during the checkout process, when the
 *     payment page loads.
 *  2. Render - If requested by `ShouldRender`, will be rendered after checkout
 *     completes
 */
import React from 'react';

import {
  extend,
  render,
  BlockStack,
  Button,
  CalloutBanner,
  Heading,
  Image,
  Layout,
  TextBlock,
  TextContainer,
  View,
} from "@shopify/post-purchase-ui-extensions-react";

/**
 * Entry point for the `ShouldRender` Extension Point.
 *
 * Returns a value indicating whether or not to render a PostPurchase step, and
 * optionally allows data to be stored on the client for use in the `Render`
 * extension point.
 */
 extend("Checkout::PostPurchase::ShouldRender", async ({ storage, inputData }) => {
  const initialState = await getRenderData();
  const render = true;

  const lineItems = inputData?.initialPurchase?.lineItems;
  const shop = inputData?.shop;
  const productIds = lineItems?.map((item) => item.product.id);
  const productImg = lineItems?.map((item) => item.product.image);

  const stories = await fetch(
    `https://ur-diary-discusses-reserve.trycloudflare.com/api/stories?productId=${productIds.join(",")}&shop=${shop?.domain}`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${inputData.token}`,
        "Content-Type": "application/json"
      }
    }
  );
  
  if (!stories.ok) {
    console.error("Failed to fetch stories:", await stories.text());
    return { render: false };
  }
  
  const storiesData = await stories.json();

  if (render) {
    // Saves initial state, provided to `Render` via `storage.initialData`
    await storage.update(storiesData);
  }

  return {
    render,
  };
});

// Simulate results of network call, etc.
async function getRenderData() {
  return {
      couldBe: "anything",
  };
}

/**
* Entry point for the `Render` Extension Point
*
* Returns markup composed of remote UI components.  The Render extension can
* optionally make use of data stored during `ShouldRender` extension point to
* expedite time-to-first-meaningful-paint.
*/
render("Checkout::PostPurchase::Render", App);

// Top-level React component
export function App({ extensionPoint, storage }) {
  const initialState = storage.initialData;
  const story = initialState?.data;

  console.log(initialState)

  return (
      <BlockStack spacing="loose">
      <CalloutBanner title="Post-purchase extension template">
          Use this template as a starting point to build a great post-purchase
          extension.
      </CalloutBanner>
      <Layout
          maxInlineSize={0.95}
          media={[
          { viewportSize: "small", sizes: [1, 30, 1] },
          { viewportSize: "medium", sizes: [300, 30, 0.5] },
          { viewportSize: "large", sizes: [400, 30, 0.33] },
          ]}
      >
          <View>
          <Image source="https://cdn.shopify.com/static/images/examples/img-placeholder-1120x1120.png" />
          </View>
          <View />
          <BlockStack spacing="xloose">
          <TextContainer>
              <Heading>{story.storyTitle}</Heading>
              <TextBlock>
                {
                  story.description
                }
              </TextBlock>
          </TextContainer>
          <Button
              submit
              onPress={() => {
              // eslint-disable-next-line no-console
              console.log(`Extension point ${extensionPoint}`, initialState);
              }}
          >
              Primary button
          </Button>
          </BlockStack>
      </Layout>
      </BlockStack>
  );
}