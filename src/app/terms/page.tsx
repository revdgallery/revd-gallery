import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gallery-light">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-gallery-mid hover:text-gallery-charcoal transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="font-display text-3xl font-semibold text-gallery-charcoal mb-8">
          Terms & Conditions / Legal Disclaimer
        </h1>

        <div className="prose prose-gray max-w-none space-y-8 text-gallery-dark text-sm leading-relaxed">
          
          <section>
            <h2 className="text-lg font-semibold text-gallery-charcoal mb-3">1. Platform Status</h2>
            <p>This website operates solely as an online exhibition and presentation platform for artworks submitted by independent artists.</p>
            <p>The platform does not act as a publisher, producer, seller, or licensor of the artworks displayed.</p>
            <p>All content is presented for informational and exhibition purposes only.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gallery-charcoal mb-3">2. Ownership and Intellectual Property</h2>
            <p>All artworks, images, texts, videos, and other materials displayed on this platform are the exclusive intellectual property of their respective artists, unless explicitly stated otherwise.</p>
            <p>The platform does not claim ownership, authorship, or copyright over any submitted content.</p>
            <p>No transfer of copyright, license, or usage rights is implied by the display of artworks on this website.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gallery-charcoal mb-3">3. License Disclaimer</h2>
            <p>By submitting content to the platform, artists confirm that:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>They are the original creator or authorized rights holder of the submitted work</li>
              <li>They retain full ownership and copyright of their work</li>
              <li>The platform is granted only a non-exclusive, revocable right to display the work on the website for exhibition purposes</li>
            </ul>
            <p className="mt-2">The platform does not acquire any commercial, derivative, reproduction, or distribution rights.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gallery-charcoal mb-3">4. Artist Responsibility</h2>
            <p>Artists are solely responsible for:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>The originality and legality of their submitted content</li>
              <li>Ensuring their work does not infringe upon copyrights, trademarks, moral rights, privacy rights, or any third-party rights</li>
              <li>Obtaining any necessary permissions, releases, or licenses</li>
            </ul>
            <p className="mt-2">The platform does not verify or guarantee the authenticity, originality, or legal status of submitted works.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gallery-charcoal mb-3">5. Third-Party Claims and Liability</h2>
            <p>In the event of any claim, dispute, or legal action related to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Copyright infringement</li>
              <li>Intellectual property violations</li>
              <li>Defamation, privacy, or moral rights</li>
              <li>Any unlawful or unauthorized content</li>
            </ul>
            <p className="mt-2">Full responsibility lies solely with the artist who submitted the content.</p>
            <p>The platform, its owners, administrators, and affiliates shall not be held liable for any damages, losses, or claims arising from displayed content.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gallery-charcoal mb-3">6. Content Removal Policy</h2>
            <p>The platform reserves the right to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Remove, restrict, or disable access to any content</li>
              <li>Do so without prior notice</li>
              <li>At its sole discretion</li>
            </ul>
            <p className="mt-2">This may occur if content is deemed to violate legal standards, third-party rights, ethical guidelines, or platform policies.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gallery-charcoal mb-3">7. No Commercial Representation</h2>
            <p>The platform does not act as a sales agent, broker, or representative for artists unless explicitly stated.</p>
            <p>Any communication, transaction, or agreement between artists and third parties occurs independently of the platform, and the platform assumes no responsibility for such interactions.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gallery-charcoal mb-3">8. No Warranty</h2>
            <p>All content is provided as is without warranties of any kind.</p>
            <p>The platform makes no guarantees regarding:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Accuracy</li>
              <li>Completeness</li>
              <li>Legal compliance</li>
              <li>Availability or continuity of displayed content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gallery-charcoal mb-3">9. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, the platform shall not be liable for:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Direct or indirect damages</li>
              <li>Loss of data, income, or reputation</li>
              <li>Legal disputes arising from user-submitted content</li>
            </ul>
            <p className="mt-2">Use of the platform is at the users own risk.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gallery-charcoal mb-3">10. External Links</h2>
            <p>The platform may contain links to external websites or third-party content.</p>
            <p>The platform is not responsible for the content, policies, or practices of any third-party sites.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gallery-charcoal mb-3">11. Changes to These Terms</h2>
            <p>The platform reserves the right to modify or update these terms at any time without prior notice.</p>
            <p>Continued use of the website constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gallery-charcoal mb-3">12. Governing Law</h2>
            <p>These terms shall be governed and interpreted in accordance with applicable laws.</p>
            <p>Jurisdiction shall be determined based on the platforms legal registration location.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gallery-charcoal mb-3">13. Contact</h2>
            <p>For legal notices or copyright concerns, please contact the platform through the provided communication channels.</p>
            <p className="mt-2"><strong>Email:</strong> revdgallery@gmail.com</p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gallery-gray text-center text-xs text-gallery-mid">
          <p>© {new Date().getFullYear()} REVD Gallery. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}