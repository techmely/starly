import type React from "react";

type Props = {
  locale: string;
};

const Page: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>Term of serive</h1>
      <ul>
        <li>
          Acceptance of Terms: By using our service, you agree to these terms. If you disagree,
          please do not use our service.
        </li>
        <li> You must be at least 18 years old to use this service</li>
        <li>
          User Eligibility
          <p>You must be at least 18 years old to use this service</p>
        </li>
        <li>
          User Account
          <p>
            You are responsible for maintaining the confidentiality of your account and password.
          </p>
        </li>
        <li>
          Acceptable
          <p>
            You agree not to: - Violate any laws or regulations - Infringe on intellectual property
            rights - Distribute malicious software - Harass or harm other users
          </p>
        </li>
        <li>
          Content Ownership
          <p>
            You retain ownership of content you create and submit.You grant us a license to use,
            modify, and distribute your content on our platform.
          </p>
        </li>
        <li>
          Service Modifications
          <p>We reserve the right to modify or discontinue the service at any time.</p>
        </li>
        <li>
          Limitation of Liability
          <p>We are not liable for any indirect, incidental, or consequential damages.</p>
        </li>
        <li>
          Termination
          <p>We may terminate or suspend your account for violations of these terms.</p>
        </li>
        <li>
          Governing Law
          <p>These terms are governed by[specify jurisdiction]law.</p>
        </li>
        <li>
          Changes to Terms
          <p>
            We may update these terms. Continued use of the service constitutes acceptance of new
            terms.
          </p>
        </li>
        <li>
          Contact Information
          <p>For questions about these terms, contact: admin@starmely.com</p>
        </li>
      </ul>
    </div>
  );
};

export default Page;
