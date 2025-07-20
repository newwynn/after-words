import React, { useState, useCallback } from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  Collapsible,
  Button,
  BlockStack,
  InlineStack,
  Badge,
  Box,
  Icon
} from "@shopify/polaris";
import { useNavigate } from "@remix-run/react";
import { ChevronDownIcon, ChevronUpIcon } from "@shopify/polaris-icons";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "app/shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  return { shop: session.shop };
};

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  isPopular?: boolean;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What is AfterWords and how does it work?",
    answer: "AfterWords is a Shopify app that helps you build emotional connections with customers by sharing product stories right after checkout. When a customer completes a purchase, they'll see a personalized story about the product they bought, creating a memorable post-purchase experience.",
    category: "Getting Started",
    isPopular: true
  },
  {
    id: "2",
    question: "How do I add a story to my products?",
    answer: "Navigate to the Stories section in your AfterWords dashboard, click 'Tell a Product's Story', select your product using the product picker, and write your story. You can include the product's origin, craftsmanship details, or any meaningful background that adds value to the customer experience.",
    category: "Getting Started",
    isPopular: true
  },
  {
    id: "3",
    question: "When do customers see the product stories?",
    answer: "Product stories are displayed immediately after a successful checkout, on the thank you page. This timing ensures customers are engaged and receptive to learning more about their purchase while the excitement of buying is still fresh.",
    category: "Customer Experience",
    isPopular: true
  },
  {
    id: "4",
    question: "Can I customize the appearance of the stories?",
    answer: "Yes! AfterWords offers various customization options including fonts, colors, layout styles, and positioning. You can match the story display to your brand's aesthetic through the customization settings in your dashboard.",
    category: "Customization"
  },
  {
    id: "5",
    question: "Is there a limit to how many stories I can create?",
    answer: "The number of stories you can create depends on your subscription plan. The basic plan allows up to 50 product stories, while premium plans offer unlimited stories. Check your current plan details in the billing section.",
    category: "Pricing & Plans"
  },
  {
    id: "6",
    question: "How do I track the performance of my stories?",
    answer: "AfterWords provides detailed analytics showing story views, engagement rates, and customer feedback. You can access these metrics from the Analytics section in your dashboard to understand which stories resonate most with your customers.",
    category: "Analytics"
  },
  {
    id: "7",
    question: "Can I schedule stories to go live at specific times?",
    answer: "Yes, you can schedule stories to activate on specific dates or during certain periods. This is useful for seasonal products, limited editions, or coordinating with marketing campaigns. Use the scheduling feature in the story editor.",
    category: "Advanced Features"
  },
  {
    id: "8",
    question: "What happens if I have multiple variants of a product?",
    answer: "You can create different stories for each product variant or use one story for all variants. The app automatically detects which variant was purchased and displays the appropriate story. This is particularly useful for products with different colors, sizes, or materials.",
    category: "Product Management"
  },
  {
    id: "9",
    question: "How do I cancel my subscription?",
    answer: "You can cancel your AfterWords subscription at any time from the billing section in your dashboard. Your stories will remain active until the end of your current billing period. All data will be preserved for 30 days after cancellation.",
    category: "Pricing & Plans"
  },
  {
    id: "10",
    question: "Is AfterWords compatible with my theme?",
    answer: "AfterWords is designed to work with all Shopify themes. The app integrates seamlessly with your checkout process without requiring theme modifications. If you experience any compatibility issues, our support team can help with custom integration.",
    category: "Technical"
  }
];



export default function FAQ(): JSX.Element {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = useCallback((id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  // Show all FAQs
  const allFAQs = faqData;

  const renderFAQItem = (item: FAQItem) => {
    const isOpen = openItems.has(item.id);
    
    return (
      <Card key={item.id}>
        <Box padding="400">
          <BlockStack gap="300">
            <div
              onClick={() => toggleItem(item.id)}
              style={{ cursor: 'pointer', width: '100%' }}
            >
              <InlineStack align="space-between" blockAlign="center">
                <InlineStack gap="200" blockAlign="center">
                  <Text variant="headingMd" as="h3">
                    {item.question}
                  </Text>
                  {item.isPopular && (
                    <Badge tone="info">Popular</Badge>
                  )}
                </InlineStack>
                <Box>
                  <Icon source={isOpen ? ChevronUpIcon : ChevronDownIcon} />
                </Box>
              </InlineStack>
            </div>
            
            <Collapsible
              open={isOpen}
              id={`faq-${item.id}`}
              transition={{duration: '200ms', timingFunction: 'ease-in-out'}}
            >
              <Box paddingBlockStart="200">
                <Text variant="bodyMd" as="p" tone="subdued">
                  {item.answer}
                </Text>
              </Box>
            </Collapsible>
          </BlockStack>
        </Box>
      </Card>
    );
  };

  return (
    <Page
      title="Frequently Asked Questions"
      subtitle="Find answers to common questions about AfterWords"
      backAction={{
        content: "Back to Dashboard",
        onAction: () => navigate("/app")
      }}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            {/* FAQ Items */}
            <Card>
              <Box padding="400">
                <BlockStack gap="400">
                  <Text variant="headingLg" as="h2">
                    Frequently Asked Questions
                  </Text>
                  <Text variant="bodyMd" as="p" tone="subdued">
                    Find answers to common questions about AfterWords
                  </Text>
                  
                  <BlockStack gap="300">
                    {allFAQs.map(renderFAQItem)}
                  </BlockStack>
                </BlockStack>
              </Box>
            </Card>

            {/* Contact Support */}
            <Card>
              <Box padding="400">
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h3">
                    Still need help?
                  </Text>
                  <Text variant="bodyMd" as="p">
                    Can't find the answer you're looking for? Our support team is here to help.
                  </Text>
                  <InlineStack gap="300">
                    <Button 
                      variant="primary"
                      onClick={() => window.open("mailto:support@afterwords.app", "_blank")}
                    >
                      Contact Support
                    </Button>
                    <Button 
                      variant="secondary"
                      onClick={() => window.open("https://docs.afterwords.app", "_blank")}
                    >
                      View Documentation
                    </Button>
                  </InlineStack>
                </BlockStack>
              </Box>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}