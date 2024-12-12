"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./components/theme-toggle";
import { ValidateClientProtectedRoute } from "@/lib/validate-client-protected-route";

export default function LandingPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const { session } = ValidateClientProtectedRoute();
  return (
    <div
      className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted"
      ref={targetRef}
    >
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-4 lg:px-6 h-16 flex items-center justify-center fixed w-full bg-background/80 backdrop-blur-sm z-50 "
      >
        <div className="container flex gap-4 items-center justify-between">
          <Link className="flex items-center justify-center" href="#">
            <div className="flex items-center p-4 justify-center">
              <Image
                width={100}
                height={80}
                src="/our-company.png"
                alt="Logo"
                className="transition-all duration-300 ease-in-out"
              />
            </div>
          </Link>
          {/* <nav className="ml-auto flex items-center justify-center gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              href="#features"
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              href="#benefits"
            >
              Benefits
            </Link>
            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              href="#testimonials"
            >
              Testimonials
            </Link>
          </nav> */}
          <div className="flex gap-4">
            <ModeToggle />
            <Button variant={"outline"}>
              <Link href={"/auth/signin"}> Login</Link>
            </Button>
            <Button>
              {" "}
              <Link href={"/auth/signup"}> Sign Up</Link>
            </Button>
          </div>
        </div>
      </motion.header>
      <main className="flex flex-col items-center justify-center pt-16  ">
        <section className=" containerw-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <motion.div
            style={{ opacity, scale }}
            className="container px-4 md:px-6 relative z-10"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl sm:text-center md:text-left xl:text-5xl/none">
                    Streamlining Apply World&apos;s Visa and Migration Process
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-center md:text-left ">
                    Our CRM system simplifies visa applications, client
                    management, and migration tracking. Join us to enhance your
                    efficiency and success rates.
                  </p>
                </div>
                {session ? (
                  <Button size="lg" className="w-fit">
                    {" "}
                    <Link href={"/dashboard"}> Go to Dashboard</Link>
                  </Button>
                ) : (
                  <div className="flex w-full sm:justify-center md:justify-start  flex-col gap-2 min-[400px]:flex-row">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Link href={"/auth/signup"}> Sign Up</Link>
                    </Button>
                    <Button size="lg" variant="outline">
                      {" "}
                      <Link href={"/auth/signin"}> Login</Link>
                    </Button>
                  </div>
                )}
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-center justify-center relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-foreground/20 rounded-full filter blur-3xl"></div>
                <Image
                  src="/landing.png"
                  alt="CRM Dashboard"
                  width={400}
                  height={400}
                  className="rounded-2xl shadow-2xl border-2 border-muted"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>
        <section
          id="features"
          className=" flex items-center justify-center w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
            >
              Key Features
            </motion.h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <FeatureCard
                icon={<ClipboardIcon className="h-10 w-10 text-primary" />}
                title="Application Tracking"
                description="Monitor visa applications in real-time, from submission to approval. Stay updated on every step of the process."
              />
              <FeatureCard
                icon={<UsersIcon className="h-10 w-10 text-primary" />}
                title="Client Management"
                description="Efficiently manage client information, documents, and communication. Keep all client data organized and easily accessible."
              />
              <FeatureCard
                icon={<BarChartIcon className="h-10 w-10 text-primary" />}
                title="Analytics & Reporting"
                description="Generate insightful reports to optimize your migration services. Make data-driven decisions to improve your business."
              />
            </div>
          </div>
        </section>
        {/* <section
          id="benefits"
          className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
            >
              Benefits of VisaMigrate CRM
            </motion.h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <BenefitCard
                title="Increased Efficiency"
                description="Streamline your workflow and save time with automated processes and centralized information management."
              />
              <BenefitCard
                title="Enhanced Client Satisfaction"
                description="Provide better service with quick access to client information and timely updates on application status."
              />
              <BenefitCard
                title="Improved Accuracy"
                description="Reduce errors with standardized forms and automated data validation, ensuring compliance with visa regulations."
              />
              <BenefitCard
                title="Better Decision Making"
                description="Leverage comprehensive analytics to make informed decisions and optimize your migration services."
              />
            </div>
          </div>
        </section>
        <section
          id="testimonials"
          className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
            >
              What Our Clients Say
            </motion.h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <TestimonialCard
                quote="VisaMigrate CRM has revolutionized our visa application process. We've seen a 30% increase in efficiency since implementing it."
                author="Jane Doe, Migration Agency Owner"
              />
              <TestimonialCard
                quote="The client management features are outstanding. It's so much easier to keep track of all our cases now."
                author="John Smith, Visa Consultant"
              />
            </div>
          </div>
        </section>
        <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Streamline Your Migration Services?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of satisfied users and transform your visa and
                migration process today.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Your Free Trial
              </Button>
            </motion.div>
          </div>
        </section> */}
      </main>
      <footer className="flex items-center justify-center">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-muted-foreground w-full text-center">
            © 2024 Apply World Group. All rights reserved.
          </p>
          {/* <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Contact Us
            </Link>
          </nav> */}
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-card shadow-lg"
    >
      <div className="p-3 rounded-full bg-primary/10">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground text-center">{description}</p>
    </motion.div>
  );
}

// function BenefitCard({ title, description }) {
//   return (
//     <motion.div
//       initial={{ y: 50, opacity: 0 }}
//       whileInView={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="flex flex-col space-y-2 p-6 rounded-lg bg-card shadow-lg"
//     >
//       <h3 className="text-xl font-bold">{title}</h3>
//       <p className="text-muted-foreground">{description}</p>
//     </motion.div>
//   );
// }

// function TestimonialCard({ quote, author }) {
//   return (
//     <motion.div
//       initial={{ y: 50, opacity: 0 }}
//       whileInView={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="flex flex-col space-y-4 p-6 rounded-lg bg-card shadow-lg"
//     >
//       <QuoteIcon className="h-8 w-8 text-muted-foreground" />
//       <p className="text-lg italic">{quote}</p>
//       <p className="text-sm font-bold">{author}</p>
//     </motion.div>
//   );
// }

function ClipboardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

// function QuoteIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
//       <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
//     </svg>
//   );
// }
