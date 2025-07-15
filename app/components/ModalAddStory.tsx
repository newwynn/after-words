import React, { useEffect } from "react";
import { Layout, FormLayout, TextField, LegacyCard, Card } from "@shopify/polaris";

interface ModalAddStoryProps {
  onShowResourcePicker: () => void;
  onClose: () => void;
  onAddStory: (story: {
    productName: string;
    storyTitle: string;
    accountEmail: string;
    thumbnail?: string;
  }) => void;
}

const ModalAddStory: React.FC<ModalAddStoryProps> = ({ onShowResourcePicker, onClose, onAddStory }) => {
  const [productName, setProductName] = React.useState("Product Name");
  const [storyTitle, setStoryTitle] = React.useState("Story Title");
  const [accountEmail, setAccountEmail] = React.useState("Account Email");
  const [thumbnail, setThumbnail] = React.useState("");

  const handleSave = () => {
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
    } else {
      alert("Please fill all fields.");
    }
  };

  console.log(productName, storyTitle, accountEmail, thumbnail);

  return (
    <ui-modal id="my-modal">
      <ui-title-bar title="Add Product Story">
        <button variant="primary" onClick={onShowResourcePicker}>
          Show Resource Picker
        </button>
        <button onClick={onClose}>Close</button>
        <button variant="primary" onClick={handleSave}>Save</button>
      </ui-title-bar>
      <div style={{ padding: "20px" }}>
        <Layout>
          <Layout.Section variant="oneThird">
            <Card>
                <img
                style={{
                    height: "200px",
                    width: "200px",
                }}
                src={thumbnail}
                alt="Product"
                />
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <LegacyCard sectioned>
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
                  type="email"
                  label="Account email"
                  value={accountEmail}
                  onChange={setAccountEmail}
                  autoComplete="email"
                />
              </FormLayout>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </div>
    </ui-modal>
  );
};

export default ModalAddStory;
