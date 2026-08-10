import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Shield, Lock, Eye, Database, Mail, Phone, FileText, AlertCircle, CheckCircle2, Heart, Clock } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Lakshya Hospital Kanpur',
  description: 'Learn how Lakshya Hospital collects, uses, and protects your personal and medical information. Your privacy and data security are our top priority.',
};

const SECTIONS = [
  {
    id: 'information-we-collect',
    icon: Database,
    title: 'Information We Collect',
    color: 'text-blue-600 bg-blue-50 border-blue-100',
    content: [
      {
        subtitle: 'Personal Information',
        body: 'When you use our website, appointment booking system, or contact forms, we may collect: full name, mobile number, email address, date of birth, gender, and residential address.',
      },
      {
        subtitle: 'Medical & Health Information',
        body: 'To provide healthcare services, we collect symptoms, medical history, diagnosis details, treatment records, prescriptions, lab reports, and other health-related information shared during appointment booking or consultations.',
      },
      {
        subtitle: 'Technical Information',
        body: 'We automatically collect certain technical data when you visit our website, including IP address, browser type, device information, pages visited, and time spent on the site. This helps us improve our website performance and user experience.',
      },
    ],
  },
  {
    id: 'how-we-use',
    icon: Eye,
    title: 'How We Use Your Information',
    color: 'text-purple-600 bg-purple-50 border-purple-100',
    content: [
      {
        subtitle: 'Appointment & Care Coordination',
        body: 'Your personal and medical details are used to confirm appointments, assign the appropriate specialist, prepare for your consultation, and coordinate your ongoing care within Lakshya Hospital.',
      },
      {
        subtitle: 'Communication',
        body: 'We use your contact information to send appointment confirmations, reminders, discharge summaries, health tips, and important updates about our services. You may opt out of non-essential communications at any time.',
      },
      {
        subtitle: 'Service Improvement',
        body: 'Anonymised, aggregated data helps us understand patient needs, improve our departments, enhance our website, and develop better healthcare programmes.',
      },
      {
        subtitle: 'Legal & Regulatory Compliance',
        body: 'We may process your data to comply with obligations under the Indian Medical Council Act, Clinical Establishments Act, DPDP Act 2023, and other applicable healthcare regulations.',
      },
    ],
  },
  {
    id: 'data-sharing',
    icon: Shield,
    title: 'Data Sharing & Disclosure',
    color: 'text-green-600 bg-green-50 border-green-100',
    content: [
      {
        subtitle: 'We Never Sell Your Data',
        body: 'Lakshya Hospital does not sell, rent, or trade your personal or medical information to any third party for commercial purposes. Period.',
      },
      {
        subtitle: 'Treating Medical Staff',
        body: 'Your medical information is shared only with doctors, nurses, and support staff at Lakshya Hospital who are directly involved in your treatment and care.',
      },
      {
        subtitle: 'Insurance & Government Schemes',
        body: 'If you avail cashless treatment under Ayushman Bharat (PM-JAY) or the DDUS scheme, we share necessary treatment information with the respective TPA or government authority for claim processing.',
      },
      {
        subtitle: 'Legal Requirements',
        body: 'We may disclose information if required by law, court order, or government authority, or to protect the vital interests of a patient in a medical emergency.',
      },
    ],
  },
  {
    id: 'data-security',
    icon: Lock,
    title: 'Data Security',
    color: 'text-orange-600 bg-orange-50 border-orange-100',
    content: [
      {
        subtitle: 'Technical Safeguards',
        body: 'Our website uses HTTPS encryption. Patient records and appointment data are stored on secure servers with restricted access controls, regular security audits, and encrypted storage.',
      },
      {
        subtitle: 'Staff Access Controls',
        body: 'Access to patient data is strictly limited to authorised staff on a need-to-know basis. All staff handling patient information are bound by confidentiality obligations.',
      },
      {
        subtitle: 'Limitation of Liability',
        body: 'While we implement industry-standard security measures, no online transmission or storage system is 100% secure. We encourage you to contact us immediately if you suspect any unauthorised use of your information.',
      },
    ],
  },
  {
    id: 'data-retention',
    icon: Clock,
    title: 'Data Retention',
    color: 'text-cyan-600 bg-cyan-50 border-cyan-100',
    content: [
      {
        subtitle: 'Medical Records',
        body: 'As per the Medical Council of India guidelines, patient medical records are retained for a minimum of 3 years from the date of treatment. For minor patients, records are retained until they reach 18 years of age plus 3 years.',
      },
      {
        subtitle: 'Website & Contact Data',
        body: 'Appointment enquiries and contact form data submitted via our website are retained for up to 12 months and then securely deleted unless further care coordination is required.',
      },
    ],
  },
  {
    id: 'your-rights',
    icon: FileText,
    title: 'Your Rights',
    color: 'text-rose-600 bg-rose-50 border-rose-100',
    content: [
      {
        subtitle: 'Access & Correction',
        body: 'You have the right to request access to your personal information held by us, and to request correction of any inaccurate data. Please contact our Patient Relations team at the details below.',
      },
      {
        subtitle: 'Withdrawal of Consent',
        body: 'You may withdraw consent for non-essential data processing (such as marketing communications) at any time by contacting us or by using the unsubscribe option in our emails.',
      },
      {
        subtitle: 'Data Erasure',
        body: 'Subject to our legal obligations under healthcare regulations, you may request deletion of your personal data by writing to us. Note that we may be required to retain medical records for the statutory minimum period.',
      },
      {
        subtitle: 'Grievance Redressal',
        body: 'If you have concerns about how your data is handled, please contact our Grievance Officer at lakshyahospitalsocial@gmail.com. We aim to resolve all complaints within 30 days.',
      },
    ],
  },
  {
    id: 'cookies',
    icon: AlertCircle,
    title: 'Cookies & Tracking',
    color: 'text-amber-600 bg-amber-50 border-amber-100',
    content: [
      {
        subtitle: 'What Are Cookies?',
        body: 'Cookies are small text files stored on your device that help us remember your preferences and improve your browsing experience. We use session cookies (which expire when you close the browser) and persistent cookies for analytics.',
      },
      {
        subtitle: 'How We Use Cookies',
        body: 'We use cookies to: understand how visitors use our website (via Google Analytics), remember your preferences (such as department selection in the booking form), and improve site performance.',
      },
      {
        subtitle: 'Managing Cookies',
        body: 'You can control cookies through your browser settings. Disabling cookies may affect the functionality of certain features on our website. For details, refer to your browser\'s help documentation.',
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  const lastUpdated = 'June 22, 2025';

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      {/* ── Hero Banner ── */}
      <section className="bg-primary pt-24 pb-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-5 text-sm font-semibold">
            <Shield size={14} />
            Last Updated: {lastUpdated}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-base leading-relaxed">
            Lakshya Hospital is committed to protecting your personal and medical information with the highest standards of confidentiality, security, and transparency.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-10 items-start">

          {/* ── Sticky Table of Contents ── */}
          {/* Sticky ToC — shown below content on mobile */}
          <aside className="order-last lg:order-first lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText size={14} className="text-primary" /> Contents
              </h2>
              <nav className="space-y-1">
                {SECTIONS.map((s) => (
                  <a key={s.id} href={`#${s.id}`}
                    className="flex items-center gap-2 text-xs text-gray-500 hover:text-primary font-medium py-1.5 px-2 rounded-lg hover:bg-primary/5 transition-all"
                  >
                    <s.icon size={11} />
                    {s.title}
                  </a>
                ))}
                <a href="#contact-dpo"
                  className="flex items-center gap-2 text-xs text-gray-500 hover:text-primary font-medium py-1.5 px-2 rounded-lg hover:bg-primary/5 transition-all"
                >
                  <Mail size={11} /> Contact Us
                </a>
              </nav>
            </div>

            {/* Quick notice */}
            <div className="mt-4 bg-green-50 border border-green-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={14} className="text-green-500" />
                <span className="text-xs font-bold text-green-700">Your Data is Safe</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                We never sell your data. Medical records are protected under strict confidentiality obligations.
              </p>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <div className="space-y-8">

            {/* Intro card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 sm:p-9">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Heart size={18} className="text-primary fill-primary/20" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Our Commitment to You</h2>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                <p>
                  This Privacy Policy describes how <strong className="text-gray-900">Lakshya Hospital</strong> ("we", "us", "our"), located at 128/1006, Y Block, Kidwai Nagar, Kanpur, Uttar Pradesh – 208011, collects, uses, discloses, and safeguards information you provide when you visit our website (<strong className="text-gray-900">lakshyahospital.com</strong>), use our online appointment booking system, or contact us.
                </p>
                <p>
                  This policy applies to all information collected through our website, booking forms, contact forms, and any related healthcare services. By using our website, you consent to the practices described in this policy.
                </p>
                <p>
                  This policy is compliant with the <strong className="text-gray-900">Digital Personal Data Protection (DPDP) Act, 2023</strong> (India), the Medical Council of India regulations, and applicable data protection standards.
                </p>
              </div>
            </div>

            {/* Dynamic Sections */}
            {SECTIONS.map((section) => (
              <div key={section.id} id={section.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 sm:p-9 scroll-mt-28"
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${section.color}`}>
                    <section.icon size={18} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>

                <div className="space-y-5">
                  {section.content.map((item, i) => (
                    <div key={i} className="pl-4 border-l-2 border-gray-100">
                      <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.subtitle}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Third-party links */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 sm:p-9">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600">
                  <AlertCircle size={18} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Third-Party Links</h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed pl-4 border-l-2 border-gray-100">
                Our website may contain links to external sites such as Google Maps, WhatsApp, or health information portals. We are not responsible for the privacy practices of these third-party websites. We encourage you to read the privacy policies of any external sites you visit.
              </p>
            </div>

            {/* Changes to this policy */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 sm:p-9">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <FileText size={18} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Changes to This Policy</h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed pl-4 border-l-2 border-gray-100">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. When we make significant changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this policy periodically. Continued use of our website after changes are posted constitutes your acceptance of the updated policy.
              </p>
            </div>

            {/* Contact / DPO */}
            <div id="contact-dpo" className="scroll-mt-28 rounded-3xl bg-gradient-to-br from-primary to-primary-hover text-white p-7 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-3">Questions or Concerns?</h2>
                <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-lg">
                  If you have any questions about this Privacy Policy, wish to access your data, or need to raise a concern about how your information is handled, please contact us:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Mail, label: 'Email', value: 'lakshyahospitalsocial@gmail.com', href: 'mailto:lakshyahospitalsocial@gmail.com' },
                    { icon: Phone, label: 'Phone', value: '+91 93356 05848', href: 'tel:+919335605848' },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <a key={label} href={href}
                      className="flex items-center gap-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-2xl p-4 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white/60 text-xs font-medium">{label}</p>
                        <p className="text-white font-semibold text-sm">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <p className="text-white/60 text-xs mt-6">
                  <strong className="text-white/80">Registered Address:</strong> 128/1006, in front of Telephone Exchange, Y Block, Ghari Purva, Kidwai Nagar, Kanpur, Uttar Pradesh – 208011
                </p>
              </div>
            </div>

            {/* Bottom nav */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p className="text-xs text-gray-400">
                This policy is effective as of <strong>{lastUpdated}</strong>.
              </p>
              <div className="flex gap-3">
                <Link href="/contact"
                  className="px-5 py-2.5 text-sm font-semibold rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
                >
                  Contact Us
                </Link>
                <Link href="/"
                  className="px-5 py-2.5 text-sm font-semibold rounded-full bg-primary text-white hover:bg-primary-hover shadow-md shadow-primary/25 transition-all"
                >
                  Back to Home
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
