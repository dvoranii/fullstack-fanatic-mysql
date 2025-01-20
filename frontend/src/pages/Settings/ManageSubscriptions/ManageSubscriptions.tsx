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
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import { cancelSubscription } from "../../../services/checkoutService";

const ManageSubscriptions: React.FC = () => {
  const csrfToken = useCsrfToken();
  const { profile } = useContext(UserContext) || {};
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancellationDate, setCancellationDate] = useState<Date | null>(null);

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

      setError(null);
      alert("Your subscription has been successfully canceled.");
    } catch (error) {
      console.error("Error canceling subscription:", error);
      setError("An error occurred while canceling the subscription.");
    } finally {
      setIsLoading(false);
    }
  };

  const cancelCancelSubscription = () => {
    setShowModal(false);
  };

  return (
    <>
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

        {profile?.subscription_cancellation_date === null ? (
          <CancelButton onClick={handleCancelSubscription}>
            Cancel Subscription
          </CancelButton>
        ) : null}

        {isLoading && <LoadingSpinner />}
        {error && <div style={{ color: "red" }}>{error}</div>}

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
