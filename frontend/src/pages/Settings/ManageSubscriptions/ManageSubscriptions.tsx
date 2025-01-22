import React, { useContext, useState, useEffect } from "react";
import {
  SubscriptionPageWrapper,
  SubscriptionOptionDropdown,
  CancelButton,
  PremiumText,
} from "./ManageSubscriptions.styled";
import TitleBanner from "../../../components/TitleBanner/TitleBanner";

import { UserContext } from "../../../context/UserContext";
import { useCsrfToken } from "../../../hooks/useCsrfToken";
import { cancelSubscription } from "../../../services/checkoutService";

import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import SuccessConfirmationModal from "../../../components/SuccessConfirmationModal/SuccessConfirmationModal";

const ManageSubscriptions: React.FC = () => {
  const csrfToken = useCsrfToken();
  const { profile, setProfile } = useContext(UserContext) || {};
  const [isLoading, setIsLoading] = useState(false);
  const [cancellationDate, setCancellationDate] = useState<Date | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (profile?.subscription_cancellation_date) {
      setCancellationDate(new Date(profile.subscription_cancellation_date));
    }
  }, [profile]);

  const handleCancelSubscription = async () => {
    setShowModal(true);
  };

  const confirmCancelSubscription = async () => {
    setShowModal(false);
    setIsLoading(true);

    try {
      await cancelSubscription(csrfToken);

      const now = new Date();

      if (setProfile) {
        setProfile((prevProfile) => {
          if (!prevProfile) return null;
          return {
            ...prevProfile,
            subscription_cancellation_date: now.toISOString(),
          };
        });
      }
      setCancellationDate(now);

      setSuccessModalOpen(true);
      setSuccessModalMessage(
        "Your subscription has been successfully canceled."
      );
    } catch (error) {
      console.error("Error canceling subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelCancelSubscription = () => {
    setShowModal(false);
  };

  return (
    <>
      <SuccessConfirmationModal
        isOpen={isSuccessModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        message={successModalMessage}
        success={true}
      />
      <TitleBanner textContent={"Manage Subscriptions"}></TitleBanner>
      <SubscriptionPageWrapper>
        <SubscriptionOptionDropdown>
          <span>View:</span>
          <select defaultValue="option1">
            <option value="option1">Current Subscription</option>
            <option value="option2">Past Subscriptions</option>
            <option value="option3">All Subscriptions</option>
          </select>
        </SubscriptionOptionDropdown>

        <PremiumText isPremium={profile?.isPremium ?? false}>
          {profile?.isPremium ? (
            <span>
              You are currently a{" "}
              <span className="premium-level">{profile?.premiumLevel}</span>{" "}
              member.
              {cancellationDate && (
                <div>
                  Subscription ending at:{" "}
                  {cancellationDate.toLocaleDateString()}
                </div>
              )}
            </span>
          ) : (
            <span>You do not have an active subscription.</span>
          )}
        </PremiumText>

        {profile?.subscription_cancellation_date === null &&
        Boolean(profile?.isPremium) ? (
          <CancelButton onClick={handleCancelSubscription}>
            Cancel Subscription
          </CancelButton>
        ) : null}

        {isLoading && <LoadingSpinner />}

        {showModal && (
          <DeleteConfirmationModal
            onConfirm={confirmCancelSubscription}
            onCancel={cancelCancelSubscription}
            message="Are you sure you want to cancel your subscription? This action cannot be undone."
          />
        )}
      </SubscriptionPageWrapper>
    </>
  );
};

export default ManageSubscriptions;
