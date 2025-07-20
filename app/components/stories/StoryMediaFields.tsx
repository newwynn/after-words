import React from "react";
import { Card, FormLayout, TextField } from "@shopify/polaris";
import type { StoryPayload } from "../../types/story";

interface StoryMediaFieldsProps {
  storyPayload: StoryPayload;
  onFieldChange: (field: keyof StoryPayload, value: string) => void;
}

const StoryMediaFields: React.FC<StoryMediaFieldsProps> = ({ storyPayload, onFieldChange }) => (
  <Card>
    <FormLayout>
      <TextField
        label="Story Image"
        value={storyPayload.image}
        onChange={(value) => onFieldChange("image", value)}
        autoComplete="off"
        placeholder="eg: https://example.com/image.jpg"
      />
      <TextField
        label="Story Video"
        value={storyPayload.video}
        onChange={(value) => onFieldChange("video", value)}
        autoComplete="off"
        placeholder="eg: https://example.com/video.mp4"
      />
    </FormLayout>
  </Card>
);

export default StoryMediaFields;
