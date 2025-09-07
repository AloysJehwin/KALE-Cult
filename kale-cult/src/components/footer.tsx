export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-300">
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-lime-400 to-yellow-300 text-neutral-900 flex items-center justify-center font-bold">KC</div>
            <span className="text-lg font-semibold tracking-tight text-white">KALE-CULT</span>
          </div>
          <p className="mt-4 text-sm text-neutral-400 max-w-xs">
            Cultivating not just farms, but impact — stake, work, and harvest for a meaningful purpose.
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <a className="hover:text-white" href="#github">GitHub</a>
            <a className="hover:text-white" href="#twitter">Twitter</a>
            <a className="hover:text-white" href="#linkedin">LinkedIn</a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white">Product</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="hover:text-white" href="#features">Features</a></li>
            <li><a className="hover:text-white" href="#security">Security</a></li>
            <li><a className="hover:text-white" href="#api">API</a></li>
            <li><a className="hover:text-white" href="#status">Status</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Company</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="hover:text-white" href="#about">About</a></li>
            <li><a className="hover:text-white" href="#blog">Blog</a></li>
            <li><a className="hover:text-white" href="#careers">Careers</a></li>
            <li><a className="hover:text-white" href="#partners">Partners</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="hover:text-white" href="#privacy">Privacy</a></li>
            <li><a className="hover:text-white" href="#terms">Terms</a></li>
            <li><a className="hover:text-white" href="#cookies">Cookie Policy</a></li>
            <li><a className="hover:text-white" href="#licenses">Licenses</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-neutral-400 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© 2024 KALE-CULT. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-white" href="#privacy">Privacy Policy</a>
            <a className="hover:text-white" href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
