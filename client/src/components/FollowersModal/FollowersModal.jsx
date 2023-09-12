import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import FollowersCard from "../FollowersCard/FollowersCard";

const FollowersModal = ({ modalOpened, setModalOpened }) => {
  // Access the Mantine theme
  const theme = useMantineTheme();

  return (
    <Modal
      // Configure modal appearance based on the theme and other properties
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      // Control modal visibility using the `modalOpened` prop
      opened={modalOpened}
      // Define an event handler to close the modal when clicked
      onClose={() => setModalOpened(false)}
    >
      {/* Render the FollowersCard component within the modal */}
      <FollowersCard location="modal" />
    </Modal>
  );
};

export default FollowersModal;
