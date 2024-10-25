import {
  ConsultationFormWrapper,
  NameWrapper,
  EmailWrapper,
  TextAreaWrapper,
  UserInfoWrapper,
  ConsultationFormWrapperOuter,
  SubmitBtnWrapper,
  FormComponentContainer,
} from "./ConsultationForm.styled";
import SwooshBG from "../../../assets/images/plansAndPricing/pink-swoosh.png";

const ConsultationForm: React.FC<{
  formRef: React.RefObject<HTMLDivElement>;
}> = ({ formRef }) => {
  return (
    <FormComponentContainer ref={formRef}>
      <img src={SwooshBG} className="swoosh-bg" alt="" />
      <ConsultationFormWrapperOuter id="consultForm">
        <ConsultationFormWrapper>
          <form action="">
            <UserInfoWrapper>
              <NameWrapper>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" />
              </NameWrapper>
              <EmailWrapper>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" />
              </EmailWrapper>
            </UserInfoWrapper>

            <TextAreaWrapper>
              <label htmlFor="message">Message</label>
              <textarea name="message" id=""></textarea>
            </TextAreaWrapper>
            <SubmitBtnWrapper>
              <button>Submit</button>
            </SubmitBtnWrapper>
          </form>
        </ConsultationFormWrapper>
      </ConsultationFormWrapperOuter>
    </FormComponentContainer>
  );
};

export default ConsultationForm;
