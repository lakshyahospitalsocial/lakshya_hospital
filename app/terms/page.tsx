import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import {
  FileText, AlertCircle, CheckCircle2, Heart,
  Phone, Mail, Shield, Scale, Stethoscope,
  Clock, CreditCard, Ban, Globe,
} from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | Lakshya Hospital Kanpur',
  description: 'Read the Terms & Conditions governing the use of Lakshya Hospital\'s website, online appointment booking system, and healthcare services.',
};

const SECTIONS = [
  {
    id: 'acceptance',
    icon: CheckCircle2,
    title: 'Acceptance of Terms',
    color: 'text-blue-600 bg-blue-50 border-blue-100',
    content: [
      {
        subtitle: 'Agreement to Terms',
        body: 'By accessing or using the Lakshya Hospital website (lakshyahospital.com), mobile-friendly interface, or any online service we provide — including the appointment booking system — you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree with any part of these terms, please do not use our website or services.',
      },
      {
        subtitle: 'Eligibility',
        body: 'By using this website, you confirm that you are at least 18 years of age, or are using the website under the supervision of a parent or legal guardian. Users acting on behalf of a patient (e.g., booking an appointment for a family member) confirm they have the authority to do so.',
      },
    ],
  },
  {
    id: 'medical-disclaimer',
    icon: Stethoscope,
    title: 'Medical Disclaimer',
    color: 'text-red-600 bg-red-50 border-red-100',
    content: [
      {
        subtitle: 'Not a Substitute for Professional Medical Advice',
        body: 'The health information, articles, and content published on this website are provided for general educational purposes only. They do not constitute medical advice, diagnosis, or treatment. Always consult a qualified doctor or specialist before making any health decisions.',
      },
      {
        subtitle: 'Emergency Situations',
        body: 'If you or someone you know is experiencing a medical emergency, please call emergency services (112) or our hospital emergency line (+91 93356 05848) immediately. Do not rely on this website for emergency medical guidance.',
      },
      {
        subtitle: 'Specialist Consultation Required',
        body: 'Booking an appointment through our online system does not constitute a doctor-patient relationship. This relationship is established only upon an in-person consultation or a confirmed teleconsultation with one of our doctors.',
      },
    ],
  },
  {
    id: 'appointment-booking',
    icon: Clock,
    title: 'Appointment Booking',
    color: 'text-purple-600 bg-purple-50 border-purple-100',
    content: [
      {
        subtitle: 'Online Booking Requests',
        body: 'Appointment booking through our website is a request system. Submitting a form does not guarantee an appointment. Our team will confirm your appointment via call within 2 hours during business hours (8:00 AM – 8:00 PM, Monday to Saturday).',
      },
      {
        subtitle: 'Accuracy of Information',
        body: 'You are responsible for providing accurate personal details, contact information, and health-related information when booking an appointment. Lakshya Hospital is not liable for any issues arising from inaccurate or false information provided by the user.',
      },
      {
        subtitle: 'Cancellation & Rescheduling',
        body: 'If you need to cancel or reschedule an appointment, please notify us at least 2 hours in advance by calling +91 93356 05848. Walk-in appointments are subject to availability and doctor schedule.',
      },
      {
        subtitle: 'Doctor Availability',
        body: 'Doctor schedules and availability are subject to change due to emergencies, medical conferences, or hospital operations. We will make best efforts to notify you in advance of any changes to your confirmed appointment.',
      },
    ],
  },
  {
    id: 'payment',
    icon: CreditCard,
    title: 'Fees, Payment & Insurance',
    color: 'text-green-600 bg-green-50 border-green-100',
    content: [
      {
        subtitle: 'Consultation & Treatment Fees',
        body: 'Consultation fees, procedure charges, and admission costs are communicated at the time of appointment confirmation or at the hospital reception. All fees are subject to change without prior notice on the website.',
      },
      {
        subtitle: 'Ayushman Bharat / DDUS Scheme',
        body: 'Cashless services under Ayushman Bharat (PM-JAY) and the DDUS Scheme are subject to scheme-specific eligibility criteria and pre-authorisation requirements. We do not guarantee coverage for all procedures under these schemes.',
      },
      {
        subtitle: 'Online Payments',
        body: 'Currently, Lakshya Hospital does not collect payment through the website. All payments are processed at the hospital\'s billing counter. Any third-party payment links you encounter claiming to be from Lakshya Hospital should be reported to us immediately.',
      },
    ],
  },
  {
    id: 'website-use',
    icon: Globe,
    title: 'Website Use & Restrictions',
    color: 'text-cyan-600 bg-cyan-50 border-cyan-100',
    content: [
      {
        subtitle: 'Permitted Use',
        body: 'You may use this website for personal, non-commercial purposes — to seek information about our services, doctors, departments, and to book appointments. Any commercial use of this website\'s content without written permission is prohibited.',
      },
      {
        subtitle: 'Prohibited Activities',
        body: 'You must not: (a) attempt to gain unauthorised access to our systems; (b) transmit harmful, abusive, or fraudulent content; (c) use our website to impersonate any person or entity; (d) engage in data scraping, crawling, or automated access without permission; or (e) use our branding, logos, or doctor profiles without written consent.',
      },
      {
        subtitle: 'Intellectual Property',
        body: 'All content on this website — including text, images, logos, design elements, and department information — is the property of Lakshya Hospital. Reproduction, distribution, or modification without prior written permission is strictly prohibited.',
      },
    ],
  },
  {
    id: 'liability',
    icon: Scale,
    title: 'Limitation of Liability',
    color: 'text-orange-600 bg-orange-50 border-orange-100',
    content: [
      {
        subtitle: 'Website Accuracy',
        body: 'We strive to keep our website content accurate and up to date. However, Lakshya Hospital does not warrant the completeness, reliability, or accuracy of any information on this website. Content is provided "as is" without warranties of any kind.',
      },
      {
        subtitle: 'Third-Party Links',
        body: 'Our website may contain links to external websites (e.g., Google Maps, WhatsApp). We are not responsible for the content, accuracy, privacy practices, or availability of those external sites.',
      },
      {
        subtitle: 'Technical Issues',
        body: 'Lakshya Hospital is not liable for any loss or damage arising from website downtime, technical errors, data transmission failures, or any interruption in service. Online appointment submissions that fail to reach us due to technical issues should be followed up with a phone call.',
      },
      {
        subtitle: 'Limitation of Damages',
        body: 'To the fullest extent permitted by Indian law, Lakshya Hospital shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our website or services.',
      },
    ],
  },
  {
    id: 'prohibited',
    icon: Ban,
    title: 'Prohibited Content & Reviews',
    color: 'text-rose-600 bg-rose-50 border-rose-100',
    content: [
      {
        subtitle: 'False or Defamatory Content',
        body: 'Any submission of false, misleading, or defamatory information about Lakshya Hospital, its doctors, or staff — through any online platform — may be subject to legal action under applicable Indian laws.',
      },
      {
        subtitle: 'Patient Testimonials',
        body: 'Patient testimonials and reviews displayed on our website are genuine and shared with patient consent. We do not manufacture or alter reviews. If you believe any review is false, please contact us.',
      },
    ],
  },
  {
    id: 'governing-law',
    icon: Shield,
    title: 'Governing Law & Jurisdiction',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    content: [
      {
        subtitle: 'Applicable Law',
        body: 'These Terms & Conditions are governed by and construed in accordance with the laws of India, including the Information Technology Act 2000, Consumer Protection Act 2019, and the Digital Personal Data Protection Act 2023.',
      },
      {
        subtitle: 'Jurisdiction',
        body: 'Any dispute arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts located in Kanpur, Uttar Pradesh, India.',
      },
      {
        subtitle: 'Changes to Terms',
        body: 'Lakshya Hospital reserves the right to modify these Terms & Conditions at any time. Changes will be posted on this page with an updated effective date. Continued use of the website after changes are posted constitutes your acceptance of the revised Terms.',
      },
    ],
  },
];

export default function TermsPage() {
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
            <FileText size={14} />
            Last Updated: {lastUpdated}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-base leading-relaxed">
            Please read these terms carefully before using our website or booking an appointment. These terms govern your relationship with Lakshya Hospital.
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
                <a href="#contact-us"
                  className="flex items-center gap-2 text-xs text-gray-500 hover:text-primary font-medium py-1.5 px-2 rounded-lg hover:bg-primary/5 transition-all"
                >
                  <Mail size={11} /> Contact Us
                </a>
              </nav>
            </div>

            {/* Quick notice */}
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={14} className="text-blue-500" />
                <span className="text-xs font-bold text-blue-700">Medical Disclaimer</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Website content is for general information only. Always consult a qualified doctor for medical advice.
              </p>
            </div>

            {/* Related link */}
            <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-xs text-gray-500 mb-2 font-medium">See also</p>
              <Link href="/privacy-policy" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
                → Privacy Policy
              </Link>
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
                <h2 className="text-xl font-bold text-gray-900">About These Terms</h2>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                <p>
                  These Terms & Conditions ("Terms") govern your use of the website and online services operated by <strong className="text-gray-900">Lakshya Hospital</strong>, located at 128/1006, Y Block, Ghari Purva, Kidwai Nagar, Kanpur, Uttar Pradesh – 208011.
                </p>
                <p>
                  These Terms apply to all visitors, users, and patients who access our website at <strong className="text-gray-900">lakshyahospital.com</strong> — whether for browsing information, booking appointments, or reading our health articles.
                </p>
                <p>
                  For information about how we handle your personal and medical data, please refer to our <Link href="/privacy-policy" className="text-primary font-semibold hover:underline">Privacy Policy</Link>.
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

            {/* Contact / Questions */}
            <div id="contact-us" className="scroll-mt-28 rounded-3xl bg-gradient-to-br from-primary to-primary-hover text-white p-7 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-3">Questions About These Terms?</h2>
                <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-lg">
                  If you have any questions about these Terms & Conditions, please reach out to us directly. Our team is available to help.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Mail, label: 'Email', value: 'info@lakshyahospital.com', href: 'mailto:info@lakshyahospital.com' },
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
                These terms are effective as of <strong>{lastUpdated}</strong>.
              </p>
              <div className="flex gap-3">
                <Link href="/privacy-policy"
                  className="px-5 py-2.5 text-sm font-semibold rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
                >
                  Privacy Policy
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
