import React, {  useCallback, useState } from "react";
import {
  Layout,
  FormLayout,
  TextField,
  Button,
} from "@shopify/polaris";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";

interface ModalAddStoryProps {
  onShowResourcePicker: () => void;
  onClose: () => void;
  onAddStory: (story: {
    productName: string;
    storyTitle: string;
    accountEmail: string;
    thumbnail?: string;
  }) => void;
  shop: string;
}

const ModalAddStory: React.FC<ModalAddStoryProps> = ({ onShowResourcePicker, onClose, onAddStory, shop }) => {
  const shopify = useAppBridge();
  const [productId, setProductId] = React.useState<string>("");
  const [productName, setProductName] = React.useState("Product Name");
  const [storyTitle, setStoryTitle] = React.useState("Story Title");
  const [accountEmail, setAccountEmail] = React.useState("Account Email");
  const [storyDescription, setStoryDescription] = React.useState("Story Description");
  const [thumbnail, setThumbnail] = useState<string>("");

  const handleSave = async() => {
    console.log(productName, storyTitle, accountEmail, thumbnail);
    if (productName && storyTitle && accountEmail) {
      onAddStory({
        productName,
        storyTitle,
        accountEmail,
        thumbnail,
      });
      setProductName("");
      setStoryTitle("");
      setAccountEmail("");
      setThumbnail("");
      onClose();


      await fetch("/api/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
          shop: shop,
          storyTitle,
          description: storyDescription,
        }),
      }); 
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleShowResourcePicker = useCallback(async () => {
    const selectedResources = await shopify.resourcePicker({
      type: "product",
      multiple: true,
      filter: { variants: false },
      action: "select",
    });

    const selection = selectedResources;

    setProductId(selection?.[0]?.id || "");
    console.log(selection?.[0]?.id);
  }, [shopify]);

  console.log(productName, storyTitle, accountEmail, thumbnail);

  return (
    <Modal id="my-modal">
      <TitleBar title="Add Product Story">
        <button variant="primary" onClick={onShowResourcePicker}>
          Show Resource Picker
        </button>
        <button onClick={onClose}>Close</button>
        <button variant="primary" onClick={handleSave}>Save</button>
      </TitleBar>
      <div style={{ padding: "20px" }}>
        <Layout>
          <Layout.Section variant="oneThird">
            <FormLayout>
                <TextField
                  label="Product names"
                  value={productName}
                  onChange={setProductName}
                  autoComplete="off"
                />
                <TextField
                  label="Story title"
                  value={storyTitle}
                  onChange={setStoryTitle}
                  autoComplete="off"
                />
                <TextField
                  label="Story description"
                  value={storyDescription}
                  onChange={setStoryDescription}
                  autoComplete="off"
                  multiline={4}
                />
                <Button
                  onClick={handleShowResourcePicker}
                  variant="primary"
                >
                  Show Resource Picker
                </Button>
              </FormLayout>
          </Layout.Section>
        </Layout>
      </div>
    </Modal>
  );
};

export default ModalAddStory;
