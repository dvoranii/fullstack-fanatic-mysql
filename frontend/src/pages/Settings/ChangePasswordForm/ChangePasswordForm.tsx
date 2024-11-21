import React, { useState } from "react";
import {
  Form,
  InputWrapper,
  Label,
  Input,
  SubmitButton,
} from "./ChangePasswordForm.styled";
import { changePassword } from "../../../services/passwordService";
import FormMessage from "../../../components/Form/Message";

const ChangePasswordForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"error" | "success">("error");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match.");
      setMessageType("error");
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      setMessage(
        "Password successfully updated. An email confirmation has been sent."
      );
      setMessageType("success");
    } catch (error) {
      setMessage("Failed to change password. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputWrapper>
        <Label htmlFor="current-password">Current Password:</Label>
        <Input
          type="password"
          id="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="new-password">New Password:</Label>
        <Input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="confirm-new-password">Confirm New Password:</Label>
        <Input
          type="password"
          id="confirm-new-password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
        />
      </InputWrapper>
      <SubmitButton type="submit">Change Password</SubmitButton>
      {message && (
        <FormMessage
          message={message}
          type={messageType}
          textAlign="center"
          fontSize="1rem"
          marginTop="20px"
        />
      )}
    </Form>
  );
};

export default ChangePasswordForm;
