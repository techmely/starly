import type React from "react";

type Props = {
  locale: string;
};

const Page: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>Privacy Policy</h1>
      <ul>
        <li>
          Information Collection We collect personal information you provide directly to us, such as
          name, email address, and payment details when you use our services.
        </li>
        <li>
          Use of Information We use your information to: Provide and improve our services
          Communicate with you Process transactions Send marketing materials (with your consent)
        </li>
        <li>
          Information Sharing We may share your information with: Service providers who assist our
          operations Legal authorities when required by law Business partners with your consent
        </li>
        <li>
          Data Security We implement reasonable security measures to protect your personal
          information. Your Rights You have the right to:
        </li>
        <li>
          Access your personal data Request corrections or deletions Opt out of marketing
          communications
        </li>
        <li>
          Cookies We use cookies to enhance your browsing experience and analyze site traffic.
          Changes to Policy We may update this policy periodically. Check this page for the latest
          version. Contact Us For questions about this policy, contact: privacy@example.com
        </li>
      </ul>
    </div>
  );
};

export default Page;
