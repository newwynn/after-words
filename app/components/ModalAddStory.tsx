import React, {  useCallback, useState } from "react";
import {
  Layout,
  FormLayout,
  TextField,
  LegacyCard,
  Card,
  DropZone,
  Banner,
  List,
} from "@shopify/polaris";

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
  const [storyDescription, setStoryDescription] = React.useState("Story Description");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [rejectedFiles, setRejectedFiles] = useState<File[]>([]);
  const hasError = rejectedFiles.length > 0;

  const handleDrop = useCallback(
    (_droppedFiles: File[], acceptedFiles: File[], rejectedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setThumbnail(window.URL.createObjectURL(file));
      }
      setRejectedFiles(rejectedFiles);
    },
    []
  );

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
          productId: "unknown",
          shop: window.location.host,
          productName,
          storyTitle,
          accountEmail,
          thumbnail,
        }),
      }); 
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
              {thumbnail ? (
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: 'cover' as const,
                    display: 'block'
                  }}
                  src={thumbnail}
                  alt="Product"
                />
              ) : (
                <div>
                  <DropZone
                    accept="image/*"
                    type="image"
                    onDrop={handleDrop}
                    allowMultiple={false}
                  >
                    <DropZone.FileUpload />
                  </DropZone>
                  {hasError && (
                    <Banner
                      title="The following images couldn't be uploaded:"
                      tone="critical"
                    >
                      <List type="bullet">
                        {rejectedFiles.map((file, index) => (
                          <List.Item key={index}>
                            {`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
                          </List.Item>
                        ))}
                      </List>
                    </Banner>
                  )}
                </div>
              )}
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
                  label="Story description"
                  value={storyDescription}
                  onChange={setStoryDescription}
                  autoComplete="off"
                  multiline={4}
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
