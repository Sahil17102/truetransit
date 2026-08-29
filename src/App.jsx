import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BadgePercent,
  Bell,
  Braces,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  CircleCheck,
  Home,
  MapPinCheck,
  Menu,
  Package,
  PackageOpen,
  Radar,
  Route,
  ScanSearch,
  Settings2,
  Shield,
  ShieldCheck,
  Sparkles,
  Tag,
  TrendingDown,
  Truck,
  WandSparkles,
  X,
} from 'lucide-react';

const businessInfo = {
  name: 'TrueTransit Mobility Pvt Ltd',
  shortName: 'TrueTransit',
  email: 'Hello@truetransitmobility.com',
  support: 'Keep it Blank | will update after coming India.',
  address: '6th floor, The District, Financial District, Hyderabad, Nanakramguda, Telangana 500032',
};

const pageTitle = 'TrueTransit Mobility Pvt Ltd - Transit You Can Trust';

function normalizePath(pathname = window.location.pathname) {
  const path = pathname.replace(/\/$/, '');
  return path || '/';
}

function BrandMark({ small = false }) {
  return (
    <span className={`brand-mark${small ? ' small' : ''}`}>
      <span />
      <span />
      <span />
    </span>
  );
}

function BrandName({ compact = false }) {
  return (
    <span className={`brand-name${compact ? ' compact' : ''}`}>
      <span>True</span><span>Transit</span>
      {!compact && <small>Mobility Pvt Ltd</small>}
    </span>
  );
}

function BrandLogo({ compact = false, small = false }) {
  return (
    <>
      <BrandMark small={small} />
      <BrandName compact={compact} />
    </>
  );
}

function AppLink({ href, className, children, onNavigate, ...props }) {
  function handleClick(event) {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!href?.startsWith('/')) return;

    event.preventDefault();
    const targetUrl = new URL(href, window.location.origin);
    const nextPath = normalizePath(targetUrl.pathname);
    window.history.pushState({}, '', `${nextPath}${targetUrl.hash}`);
    onNavigate(nextPath, targetUrl.hash);
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

function Header({ path, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  const nav = (nextPath, hash) => {
    onNavigate(nextPath, hash);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="announcement">
        <span>{businessInfo.shortName} mobility operations are now live.</span>
        <AppLink href="/tracking" onNavigate={nav}>
          Track a shipment <ArrowUpRight />
        </AppLink>
      </div>

      <header className={`site-header${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`} id="top">
        <AppLink className="brand" href="/" aria-label="TrueTransit home" onNavigate={nav}>
          <BrandLogo compact />
        </AppLink>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className="main-nav" aria-label="Main navigation">
          <AppLink className={path === '/tracking' ? 'active' : undefined} href="/tracking" onNavigate={nav}>Tracking</AppLink>
          <AppLink className={path === '/rate-calculator' ? 'active' : undefined} href="/rate-calculator" onNavigate={nav}>Rate calculator</AppLink>
          <AppLink className={path === '/weight-calculator' ? 'active' : undefined} href="/weight-calculator" onNavigate={nav}>Weight calculator</AppLink>
          <AppLink className={path === '/contact' ? 'active' : undefined} href="/contact" onNavigate={nav}>Contact</AppLink>
        </nav>

        <div className="header-actions">
          <AppLink className="text-link" href="/rate-calculator" onNavigate={nav}>Estimate rate</AppLink>
          <AppLink className="button button-small button-dark" href="/tracking" onNavigate={nav}>
            Track <ArrowUpRight />
          </AppLink>
        </div>
      </header>
    </>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual reveal" aria-label="Animated shipment dashboard illustration">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="parcel">
        <div className="parcel-top" />
        <div className="parcel-side" />
        <div className="parcel-front">
          <span className="mini-brand">TT</span>
          <div className="barcode" />
          <small>NYC - SFO</small>
        </div>
      </div>
      <div className="float-card status-card">
        <span className="status-dot" />
        <div><small>Package status</small><strong>Out for delivery</strong></div>
        <Check />
      </div>
      <div className="float-card rate-card">
        <TrendingDown />
        <div><small>Average savings</small><strong>31.8%</strong></div>
      </div>
      <div className="route-dot route-a" />
      <div className="route-dot route-b" />
    </div>
  );
}

function CourierConsole() {
  const carriers = [
    ['TT Express', '$8.42', '2 days', CircleCheck, true],
    ['Regional Plus', '$9.18', '2-3 days', Truck, false],
    ['Priority Ground', '$10.04', '3 days', Route, false],
    ['Economy', '$7.95', '5 days', ShieldCheck, false],
  ];

  return (
    <div className="courier-console reveal" aria-label="Courier operations dashboard">
      <div className="console-topbar">
        <div><span /><span /><span /></div>
        <strong>Courier decision console</strong>
        <small>Live</small>
      </div>
      <div className="console-metrics">
        <article><small>Best rate</small><strong>$8.42</strong><span className="positive">-18%</span></article>
        <article><small>On-time SLA</small><strong>97.8%</strong><span className="positive">+4.2%</span></article>
        <article><small>Exceptions</small><strong>23</strong><span className="warning">Review</span></article>
      </div>
      <div className="console-body">
        <div className="carrier-table">
          {carriers.map(([name, price, eta, Icon, active]) => (
            <div className={`carrier-row${active ? ' active' : ''}`} key={name}>
              <span>{name}</span><b>{price}</b><small>{eta}</small><Icon />
            </div>
          ))}
        </div>
        <div className="shipment-timeline">
          <div className="timeline-map">
            <span className="hub hub-a">NYC</span>
            <span className="hub hub-b">SFO</span>
            <div className="route-line" />
            <div className="route-progress" />
          </div>
          <div className="timeline-events">
            <p><span /> Label generated</p>
            <p><span /> Carrier pickup confirmed</p>
            <p><span /> Tracking page live</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShipmentFlow() {
  return (
    <section className="shipment-systems-section">
      <div className="container">
        <div className="systems-copy reveal">
          <p className="eyebrow light-eye"><span /> Shipment orchestration</p>
          <h2>Connect every courier workflow into one moving system.</h2>
          <p>Orders, warehouses, carrier services, customer updates, and returns stay in sync as parcels move through the network.</p>
        </div>
        <figure className="shipment-flow-figure reveal">
          <figcaption className="sr-only">Animated logistics diagram showing TrueTransit connecting order systems, warehouses, courier APIs, tracking updates, customer notifications, and returns.</figcaption>
          <div className="flow-toolbar">
            <div>
              <strong>Transit command map</strong>
              <span>Hyderabad network live</span>
            </div>
            <div>
              <small>12 carrier links</small>
              <small>97.8% SLA</small>
              <small>23 exceptions</small>
            </div>
          </div>
          <div className="flow-node flow-system flow-oms"><Tag /><span>Order system</span></div>
          <div className="flow-node flow-system flow-wms"><Package /><span>Warehouse</span></div>
          <div className="flow-node flow-system flow-store"><Home /><span>Storefront</span></div>
          <div className="flow-node flow-action flow-api">Shipping API</div>
          <div className="flow-node flow-action flow-rate">Rate engine</div>
          <div className="flow-node flow-action flow-track">Tracking sync</div>
          <div className="flow-node flow-action flow-return">Returns portal</div>
          <div className="flow-node flow-core">
            <BrandLogo compact small />
          </div>
          <div className="flow-node flow-system flow-carrier"><Truck /><span>Carrier APIs</span></div>
          <div className="flow-node flow-system flow-customer"><Radar /><span>Customer alerts</span></div>
          <div className="flow-node flow-system flow-risk"><ShieldCheck /><span>Protection</span></div>
          <svg className="flow-lines" viewBox="0 0 1000 520" aria-hidden="true">
            <path className="flow-path muted" d="M90 130 H360 C400 130 410 190 450 190 H500" />
            <path className="flow-path muted" d="M90 260 H360 C400 260 410 240 450 240 H500" />
            <path className="flow-path muted" d="M90 390 H360 C400 390 410 290 450 290 H500" />
            <path className="flow-path hot flow-a" d="M500 190 H640 C690 190 695 130 740 130 H910" />
            <path className="flow-path hot flow-b" d="M500 240 H650 C690 240 700 260 740 260 H910" />
            <path className="flow-path hot flow-c" d="M500 290 H640 C690 290 695 390 740 390 H910" />
            <path className="flow-path vertical" d="M500 190 V330" />
          </svg>
          <span className="flow-packet packet-one" />
          <span className="flow-packet packet-two" />
          <span className="flow-packet packet-three" />
          <div className="flow-status">
            <span>Live shipment</span>
            <strong>TT-4928</strong>
            <small>Label created - tracking live</small>
          </div>
          <div className="flow-footer">
            <span><CircleCheck /> API connected</span>
            <span><Truck /> Carrier sync active</span>
            <span><Radar /> Customer alerts queued</span>
          </div>
        </figure>
      </div>
    </section>
  );
}

function AiSection({ showToast }) {
  const [simulated, setSimulated] = useState(false);

  return (
    <section className="ai-section" id="insights">
      <div className="container">
        <div className="section-heading light reveal">
          <p className="eyebrow"><span /> Meet Transit AI</p>
          <h2>Insights are easy.<br /><em>Decisions win.</em></h2>
          <p>Ask plain-language questions and get practical recommendations that reduce cost, improve delivery speed, and protect customer trust.</p>
        </div>

        <div className="ai-shell reveal">
          <aside className="ai-sidebar">
            <div className="ai-logo"><BrandMark small /> transit<span>ai</span></div>
            <button className="active"><Sparkles /> Assistant</button>
            <button><ChartNoAxesCombined /> Performance</button>
            <button><Truck /> Carriers</button>
            <button><Settings2 /> Settings</button>
            <div className="ai-user"><span>AM</span><small>Alex Morgan<br />Operations lead</small></div>
          </aside>
          <div className="ai-workspace">
            <div className="ai-topbar"><span>Network overview</span><div><Bell /><span className="live-pill">Live</span></div></div>
            <div className="metric-grid">
              <article><small>Shipping spend</small><strong>$248.4K</strong><span className="down"><ArrowDown /> 12.4%</span><div className="sparkline line-one" /></article>
              <article><small>On-time delivery</small><strong>96.8%</strong><span className="up"><ArrowUp /> 4.1%</span><div className="sparkline line-two" /></article>
              <article><small>Avg. transit time</small><strong>2.4 days</strong><span className="down"><ArrowDown /> 0.3d</span><div className="sparkline line-three" /></article>
            </div>
            <div className="ai-content-grid">
              <div className="chart-card">
                <div className="card-title"><span>Cost by carrier</span><small>Last 30 days <ChevronDown /></small></div>
                <div className="bars" aria-label="Carrier cost chart">
                  {['52%', '78%', '43%', '92%', '61%', '35%'].map((height, index) => (
                    <div style={{ '--height': height }} key={height}><span>{['$42k', '$68k', '$35k', '$82k', '$49k', '$26k'][index]}</span><b>{String.fromCharCode(65 + index)}</b></div>
                  ))}
                </div>
              </div>
              <div className="recommend-card">
                <div className="ai-badge"><Sparkles /> AI recommendation</div>
                <h3>You can save an estimated <em>$18,420</em> this quarter.</h3>
                <p>Move 22% of Zone 5 shipments to regional carriers while keeping your current delivery promise.</p>
                <button
                  type="button"
                  className={simulated ? 'active' : ''}
                  onClick={() => {
                    setSimulated((value) => !value);
                    showToast('Simulation updated with projected savings.');
                  }}
                >
                  Simulate change <ArrowRight />
                </button>
                <div className={`simulation${simulated ? ' show' : ''}`}><span>Estimated savings</span><strong>$18,420</strong><small>+ 1.2% on-time delivery</small></div>
              </div>
            </div>
            <div className="ask-bar"><Sparkles /><span>Ask: "Where did we overspend last week?"</span><button type="button" aria-label="Submit question"><ArrowUp /></button></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SuiteSection({ onNavigate }) {
  return (
    <section className="suite-section" id="suite">
      <div className="container">
        <div className="suite-intro reveal">
          <div>
            <p className="eyebrow"><span /> One unified platform</p>
            <h2>Modern shipping,<br />from API to <em>arrival.</em></h2>
          </div>
          <p>Start with the tools you need today. Add more as you grow, all on one reliable platform with clear pricing and human support.</p>
        </div>

        <div className="suite-grid">
          <article className="suite-card card-yellow reveal">
            <div className="suite-icon"><Braces /></div>
            <span className="card-number">01</span>
            <div className="code-window">
              <div className="code-dots"><span /><span /><span /><small>API request</small></div>
              <code><b>POST</b> /v1/shipments</code>
              <div className="api-lines">
                <p><span>carrier</span><strong>BlueDart</strong></p>
                <p><span>service</span><strong>Express</strong></p>
                <p><span>status</span><strong>Label ready</strong></p>
              </div>
            </div>
            <h3>Shipping API</h3>
            <p>Create labels, compare rates, and manage shipments across every major carrier with one clean integration.</p>
            <AppLink href="/developers" onNavigate={onNavigate}>Explore the API <ArrowUpRight /></AppLink>
          </article>

          <article className="suite-card card-cream reveal">
            <div className="suite-icon"><Route /></div>
            <span className="card-number">02</span>
            <div className="map-visual">
              <div className="track-head"><span>TT-4928</span><strong>Out for delivery</strong></div>
              <span className="map-pin pin-one"><Package /></span>
              <span className="map-pin pin-two"><Truck /></span>
              <svg viewBox="0 0 400 180" aria-hidden="true"><path d="M42,121 C104,20 179,165 236,77 S336,35 365,92" /></svg>
              <div className="map-status"><small>ETA window</small><strong>2:15-4:15 PM</strong></div>
            </div>
            <h3>Predictive tracking</h3>
            <p>Give customers accurate delivery windows and keep your team ahead of exceptions before support tickets arrive.</p>
            <AppLink href="/products#tracking" onNavigate={onNavigate}>See tracking <ArrowUpRight /></AppLink>
          </article>

          <article className="suite-card card-blue reveal">
            <div className="suite-icon"><ShieldCheck /></div>
            <span className="card-number">03</span>
            <div className="shield-visual">
              <ShieldCheck />
              <div className="coverage-card">
                <span>Coverage active</span>
                <strong>$250.00</strong>
                <small>Claim SLA under 48 hours</small>
                <p><Check /> Auto-approved for eligible packages</p>
              </div>
            </div>
            <h3>Embedded protection</h3>
            <p>Protect every package with automated coverage and a claims experience your customers will actually enjoy.</p>
            <AppLink href="/products#protection" onNavigate={onNavigate}>Explore protection <ArrowUpRight /></AppLink>
          </article>
        </div>
      </div>
    </section>
  );
}

function Stories() {
  const stories = [
    ['story-dark', 'TIDELINE', '31%', 'lower shipping cost', "We switched the entire network in weeks and immediately found savings we couldn't see before.", 'MP', 'Maya Patel', 'VP Operations'],
    ['story-lime', 'morrow', '4.2x', 'more daily volume', 'Peak season used to mean firefighting. Now every exception lands with the right team automatically.', 'JL', 'Jonas Lee', 'Head of Logistics'],
    ['story-coral', 'PAPER & CO.', '1,640', 'hours saved yearly', 'The developer experience is fantastic, but the operations visibility is what changed our business.', 'SK', 'Samira Khan', 'COO'],
    ['story-cream', 'ARCADIA', '99.4%', 'tracking coverage', 'Customers know exactly where orders are, and our support volume has never been lower.', 'EA', 'Eli Adams', 'Customer Experience'],
  ];
  const [storyIndex, setStoryIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const firstCardRef = useRef(null);
  const cardWidth = firstCardRef.current?.getBoundingClientRect().width || 0;
  const maxIndex = Math.max(0, stories.length - visible);

  useEffect(() => {
    const update = () => setVisible(window.innerWidth < 700 ? 1 : window.innerWidth < 1050 ? 2 : 3);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    setStoryIndex((value) => Math.min(value, maxIndex));
  }, [maxIndex]);

  return (
    <section className="stories" id="stories">
      <div className="container">
        <div className="stories-head reveal">
          <div><p className="eyebrow"><span /> Customer stories</p><h2>Built for the<br /><em>real world.</em></h2></div>
          <div className="slider-controls">
            <button type="button" aria-label="Previous story" onClick={() => setStoryIndex((value) => (value <= 0 ? maxIndex : value - 1))}><ArrowLeft /></button>
            <button type="button" aria-label="Next story" onClick={() => setStoryIndex((value) => (value >= maxIndex ? 0 : value + 1))}><ArrowRight /></button>
          </div>
        </div>
        <div className="story-viewport reveal">
          <div className="story-track" style={{ transform: `translateX(-${storyIndex * (cardWidth + 18)}px)` }}>
            {stories.map(([variant, brand, stat, title, quote, initials, name, role], index) => (
              <article className={`story-card ${variant}`} key={brand} ref={index === 0 ? firstCardRef : null}>
                <span className="story-brand">{brand}</span>
                <strong>{stat}</strong>
                <h3>{title}</h3>
                <p>"{quote}"</p>
                <div className="story-person"><span>{initials}</span><div><b>{name}</b><small>{role}</small></div></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureGrid({ onNavigate }) {
  const features = [
    ['/pricing', BadgePercent, 'Discounted rates', 'Competitive pre-negotiated rates with no volume minimums.'],
    ['/products#shipping-api', Tag, 'Label creation', 'Generate production-ready labels with a single API call.'],
    ['/products#shipping-api', MapPinCheck, 'Address verification', 'Stop bad addresses before a shipment leaves your warehouse.'],
    ['/products#tracking', ScanSearch, 'Smart tracking', 'Normalize tracking events from every carrier in real time.'],
    ['/products#protection', Shield, 'Package protection', 'Affordable coverage with a remarkably simple claims flow.'],
    ['/products#loom-ai', WandSparkles, 'AI insights', 'Turn millions of shipment events into the next best action.'],
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="features-heading reveal"><p className="eyebrow"><span /> Everything you need</p><h2>Complex shipping,<br /><em>made simple.</em></h2></div>
        <div className="feature-grid">
          {features.map(([href, Icon, title, copy]) => (
            <AppLink href={href} className="feature-item reveal" onNavigate={onNavigate} key={title}>
              <span><Icon /></span>
              <div><h3>{title}</h3><p>{copy}</p></div>
              <ArrowUpRight />
            </AppLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogisticsIndustries() {
  const industries = [
    {
      title: 'Ecommerce deliveries',
      copy: 'Manage prepaid, COD, same-day and regional shipments with cleaner tracking visibility for every customer.',
      icon: Package,
      visual: 'commerce',
      status: 'COD ready',
      metric: '2.4k',
      label: 'orders today',
      route: 'HYD -> BLR',
      progress: '82%',
    },
    {
      title: 'Courier partner network',
      copy: 'Coordinate multiple carrier partners, compare service levels and keep dispatch teams aligned from pickup to doorstep.',
      icon: Truck,
      visual: 'courier',
      status: 'Live rates',
      metric: '14',
      label: 'active partners',
      route: 'Delhivery + DTDC',
      progress: '68%',
    },
    {
      title: 'Warehouse operations',
      copy: 'Move labels, packing, handover scans and route decisions into one dependable shipping workflow.',
      icon: Home,
      visual: 'warehouse',
      status: 'Scan sync',
      metric: '96%',
      label: 'handover done',
      route: 'Dock A -> Hub 03',
      progress: '74%',
    },
    {
      title: 'Returns and RTO',
      copy: 'Keep return pickups, reverse movement and failed delivery handling visible without adding extra manual follow-up.',
      icon: Route,
      visual: 'returns',
      status: 'RTO watch',
      metric: '31',
      label: 'returns queued',
      route: 'Customer -> WH',
      progress: '56%',
    },
    {
      title: 'Bulk shipment planning',
      copy: 'Estimate chargeable weight, group shipments by lane and prepare high-volume dispatches with better cost control.',
      icon: BadgePercent,
      visual: 'bulk',
      status: 'Rate lock',
      metric: '18%',
      label: 'cost saved',
      route: 'North lane',
      progress: '88%',
    },
    {
      title: 'Customer updates',
      copy: 'Give customers calm, consistent order updates across tracking status, delays and final delivery milestones.',
      icon: Radar,
      visual: 'updates',
      status: 'Alerts sent',
      metric: '99.1%',
      label: 'SMS delivered',
      route: 'Pickup -> Doorstep',
      progress: '91%',
    },
  ];

  return (
    <section className="industries-section">
      <div className="container">
        <div className="industries-heading reveal">
          <p className="eyebrow"><span /> Shipment use cases</p>
          <h2>TrueTransit supports every logistics workflow.</h2>
        </div>
        <div className="industries-grid">
          {industries.map(({ title, copy, icon: Icon, visual, status, metric, label, route, progress }) => (
            <article className="industry-card reveal" key={title}>
              <div className={`industry-visual ${visual}`} aria-hidden="true">
                <div className="industry-widget">
                  <div className="widget-top">
                    <span className="widget-icon"><Icon /></span>
                    <span className="widget-status"><Check /> {status}</span>
                  </div>
                  <strong>{metric}</strong>
                  <small>{label}</small>
                  <div className="widget-route">
                    <span>{route}</span>
                    <b>{progress}</b>
                  </div>
                  <div className="widget-bar"><span style={{ width: progress }} /></div>
                </div>
              </div>
              <div className="industry-copy">
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogisticsAds() {
  const cards = [
    {
      type: 'Operations guide',
      title: 'Cut delivery exceptions before they become support tickets',
      variant: 'route-visual',
    },
    {
      type: 'Rate playbook',
      title: 'Find the right courier price for every shipment lane',
      variant: 'rate-visual',
    },
    {
      type: 'Packaging tool',
      title: 'Use chargeable weight to avoid billing surprises',
      variant: 'weight-visual',
    },
    {
      type: 'Transit support',
      title: 'Keep customers updated from pickup to doorstep',
      variant: 'support-visual',
    },
  ];

  return (
    <section className="logistics-ads">
      <div className="container">
        <div className="ads-heading reveal">
          <p className="eyebrow"><span /> Logistics resources</p>
          <h2>Make every shipment<br />feel easier to manage.</h2>
        </div>
        <div className="ads-grid">
          {cards.map((card) => (
            <article className="ad-card reveal" key={card.title}>
              <div className={`ad-visual ${card.variant}`} aria-hidden="true">
                <span /><span /><span /><span />
                {card.variant === 'route-visual' && <Route />}
                {card.variant === 'rate-visual' && <BadgePercent />}
                {card.variant === 'weight-visual' && <Package />}
                {card.variant === 'support-visual' && <Radar />}
              </div>
              <small>{card.type}</small>
              <h3>{card.title}</h3>
              <p>Built for shipment teams that need clear operations, cleaner handoffs and reliable customer updates.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm({ showToast, pricing = false }) {
  function submit(event) {
    event.preventDefault();
    showToast("Thanks - we'll be in touch shortly.");
    event.currentTarget.reset();
  }

  return (
    <form className={`contact-form reveal${pricing ? ' pricing-form' : ''}`} onSubmit={submit}>
      <label><span>Work email</span><input type="email" name="email" placeholder="you@company.com" required /></label>
      <label>
        <span>Monthly shipments</span>
        <select name="volume" required defaultValue="">
          <option value="">Select volume</option>
          <option>Under 1,000</option>
          <option>1,000-10,000</option>
          <option>10,000-100,000</option>
          <option>100,000+</option>
        </select>
      </label>
      <button className="button button-light" type="submit">Start the conversation <ArrowUpRight /></button>
      {!pricing && <small>By submitting, you agree to our privacy policy.</small>}
    </form>
  );
}

function BusinessDetails() {
  return (
    <div className="business-details reveal">
      <div>
        <small>Business Name</small>
        <strong>{businessInfo.name}</strong>
      </div>
      <div>
        <small>Office Address</small>
        <p>{businessInfo.address}</p>
      </div>
      <div>
        <small>Support Number</small>
        <p>{businessInfo.support}</p>
      </div>
      <div>
        <small>Email</small>
        <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a>
      </div>
    </div>
  );
}

function TrackingPage() {
  const [trackingId, setTrackingId] = useState('TT-4928');
  const cleanId = trackingId.trim() || 'TT-4928';

  return (
    <>
      <section className="page-hero tracking-page">
        <div className="container page-hero-inner">
          <div className="reveal">
            <p className="eyebrow"><span /> Tracking</p>
            <h1>Track every shipment with confidence.</h1>
            <p>Enter a TrueTransit tracking ID to view delivery status, checkpoints, and expected movement in one clean page.</p>
          </div>
          <div className="tracking-card reveal">
            <label>
              <span>Tracking number</span>
              <input value={trackingId} onChange={(event) => setTrackingId(event.target.value)} placeholder="TT-4928" />
            </label>
            <button className="button button-dark" type="button">Track shipment <ArrowUpRight /></button>
            <div className="tracking-result">
              <small>Current status</small>
              <strong>Out for delivery</strong>
              <p>{cleanId} is moving through the Hyderabad delivery network and is expected today.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="tool-section">
        <div className="container tool-grid">
          <article className="tool-panel">
            <small>Shipment timeline</small>
            <div className="track-steps">
              {['Label generated', 'Carrier pickup confirmed', 'In transit', 'Out for delivery'].map((step, index) => (
                <p className={index < 4 ? 'done' : ''} key={step}><span />{step}<b>{index === 3 ? 'Today' : `${index + 1}:20 PM`}</b></p>
              ))}
            </div>
          </article>
          <article className="tool-panel accent">
            <small>Delivery promise</small>
            <strong>Today, 2:15-4:15 PM</strong>
            <p>Live updates stay consistent across customer support, operations, and customer-facing tracking pages.</p>
          </article>
        </div>
      </section>
    </>
  );
}

function RateCalculatorPage() {
  const [weight, setWeight] = useState(2.5);
  const [distance, setDistance] = useState(850);
  const [speed, setSpeed] = useState('standard');
  const multiplier = speed === 'express' ? 1.55 : speed === 'priority' ? 1.25 : 1;
  const estimate = Math.max(99, Math.round((85 + Number(weight || 0) * 32 + Number(distance || 0) * 0.18) * multiplier));

  return (
    <>
      <section className="page-hero rate-page">
        <div className="container page-hero-inner">
          <div className="reveal">
            <p className="eyebrow"><span /> Rate calculator</p>
            <h1>Calculate courier rates before you book.</h1>
            <p>Estimate delivery cost with weight, service speed, and distance. The layout matches the TrueTransit landing page so the experience feels connected.</p>
          </div>
          <div className="calculator-card reveal">
            <label><span>Chargeable weight (kg)</span><input type="number" min="0" step="0.1" value={weight} onChange={(event) => setWeight(event.target.value)} /></label>
            <label><span>Approx distance (km)</span><input type="number" min="0" step="10" value={distance} onChange={(event) => setDistance(event.target.value)} /></label>
            <label><span>Service type</span><select value={speed} onChange={(event) => setSpeed(event.target.value)}><option value="standard">Standard</option><option value="priority">Priority</option><option value="express">Express</option></select></label>
            <div className="estimate-box"><small>Estimated rate</small><strong>Rs. {estimate}</strong><span>Includes handling and network estimate</span></div>
          </div>
        </div>
      </section>
      <section className="tool-section">
        <div className="container page-grid compact">
          <div className="page-card"><span><BadgePercent /></span><small>Transparent estimate</small><h2>No surprise math.</h2><p>Rates are calculated with chargeable weight, distance, and service level so operators can compare options quickly.</p></div>
          <div className="page-card accent-blue"><span><Truck /></span><small>Network ready</small><h2>Built for Indian routes.</h2><p>Use this as a polished customer-facing calculator page inside the same TrueTransit experience.</p></div>
        </div>
      </section>
    </>
  );
}

function WeightCalculatorPage() {
  const [length, setLength] = useState(30);
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(15);
  const [actual, setActual] = useState(2);
  const volumetric = Math.round(((Number(length || 0) * Number(width || 0) * Number(height || 0)) / 5000) * 10) / 10;
  const chargeable = Math.max(Number(actual || 0), volumetric);

  return (
    <>
      <section className="page-hero weight-page">
        <div className="container page-hero-inner">
          <div className="reveal">
            <p className="eyebrow"><span /> Weight calculator</p>
            <h1>Find chargeable weight in seconds.</h1>
            <p>Calculate volumetric weight and compare it with actual package weight before booking a shipment.</p>
          </div>
          <div className="calculator-card reveal">
            <div className="dimension-grid">
              <label><span>Length (cm)</span><input type="number" min="0" value={length} onChange={(event) => setLength(event.target.value)} /></label>
              <label><span>Width (cm)</span><input type="number" min="0" value={width} onChange={(event) => setWidth(event.target.value)} /></label>
              <label><span>Height (cm)</span><input type="number" min="0" value={height} onChange={(event) => setHeight(event.target.value)} /></label>
            </div>
            <label><span>Actual weight (kg)</span><input type="number" min="0" step="0.1" value={actual} onChange={(event) => setActual(event.target.value)} /></label>
            <div className="estimate-box"><small>Chargeable weight</small><strong>{chargeable.toFixed(1)} kg</strong><span>Volumetric: {volumetric.toFixed(1)} kg</span></div>
          </div>
        </div>
      </section>
      <section className="tool-section">
        <div className="container tool-grid">
          <article className="tool-panel">
            <small>Formula</small>
            <strong>L x W x H / 5000</strong>
            <p>Final billing usually uses the higher value between actual and volumetric weight.</p>
          </article>
          <article className="tool-panel accent">
            <small>Packaging tip</small>
            <strong>Compact packaging saves cost.</strong>
            <p>Reducing empty space can lower volumetric weight and improve route efficiency.</p>
          </article>
        </div>
      </section>
    </>
  );
}

function ContactPage({ showToast }) {
  return (
    <section className="contact-section standalone-contact">
      <div className="container contact-inner">
        <div>
          <div className="contact-copy reveal"><p className="eyebrow light-eye"><span /> Contact</p><h2>{businessInfo.shortName}<br /><em>official details.</em></h2><p>Business information, office address, support placeholder, and email are shown clearly for customers.</p></div>
          <BusinessDetails />
        </div>
        <ContactForm showToast={showToast} />
      </div>
    </section>
  );
}

function HomePage({ onNavigate, showToast }) {
  return (
    <>
      <section className="hero">
        <div className="hero-grid" />
        <div className="container hero-inner">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span /> Transit You Can Trust</p>
            <h1>TrueTransit<br /><em>Mobility Pvt Ltd.</em></h1>
            <p className="hero-lede">Professional mobility and shipping intelligence for labels, tracking, insurance, and smarter carrier decisions - from first shipment to global scale.</p>
            <div className="hero-actions">
              <AppLink href="/tracking" className="button button-dark" onNavigate={onNavigate}>Track shipment <ArrowUpRight /></AppLink>
              <AppLink href="/rate-calculator" className="button button-outline" onNavigate={onNavigate}>Calculate rate</AppLink>
            </div>
            <div className="hero-note"><CircleCheck /> Transit You Can Trust <span /> Hyderabad based mobility team</div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="trust-strip" aria-label="Customer logos">
        <div className="container">
          <p>Trusted to keep great brands moving</p>
          <div className="logo-row">
            <span>NORTHSTAR</span><span>Form & Field</span><span>Arcadia</span><span>MONUMENT</span><span>kinfolk</span><span>VANTAGE</span>
          </div>
        </div>
      </section>

      <section className="courier-section">
        <div className="container courier-inner">
          <CourierConsole />
          <div className="courier-copy reveal">
            <p className="eyebrow"><span /> Courier network</p>
            <h2>Still switching between courier dashboards?</h2>
            <p>Compare rates, route parcels, track every handoff, and resolve shipment exceptions from one clean operations layer.</p>
            <div className="courier-actions">
              <AppLink className="button button-dark" href="/rate-calculator" onNavigate={onNavigate}>Calculate rate <ArrowUpRight /></AppLink>
              <AppLink className="button button-outline" href="/weight-calculator" onNavigate={onNavigate}>Weight calculator</AppLink>
            </div>
          </div>
        </div>
      </section>

      <ShipmentFlow />
      <LogisticsIndustries />
      <SuiteSection onNavigate={onNavigate} />

      <section className="readiness" id="solutions">
        <div className="container readiness-inner reveal">
          <div className="readiness-copy">
            <p className="eyebrow light-eye"><span /> Network readiness</p>
            <h2>Can your operation<br />handle the <em>rush?</em></h2>
            <p>Take a two-minute assessment and get a custom checklist for peak season resilience.</p>
            <AppLink className="button button-light" href="/weight-calculator" onNavigate={onNavigate}>Check chargeable weight <ArrowUpRight /></AppLink>
          </div>
          <div className="gauge-wrap">
            <div className="gauge">
              <svg viewBox="0 0 240 140"><path className="gauge-bg" d="M30 120 A90 90 0 0 1 210 120" /><path className="gauge-fill" d="M30 120 A90 90 0 0 1 210 120" /></svg>
              <div className="gauge-value"><strong>92</strong><span>/100</span><small>Peak ready</small></div>
            </div>
            <div className="gauge-note"><CircleCheck /><div><strong>Your network looks strong</strong><span>2 opportunities identified</span></div></div>
          </div>
        </div>
      </section>

      <Stories />
      <FeatureGrid onNavigate={onNavigate} />
      <LogisticsAds />

      <section className="developer-section" id="developers">
        <div className="container developer-inner">
          <div className="developer-copy reveal">
            <p className="eyebrow"><span /> Built for developers</p>
            <h2>First label in<br /><em>under an hour.</em></h2>
            <p>Clear docs, helpful SDKs, predictable APIs, and a sandbox that behaves like production.</p>
            <div className="dev-links"><AppLink href="/developers" onNavigate={onNavigate}>Read API docs <ArrowUpRight /></AppLink><AppLink href="/developers#sdks" onNavigate={onNavigate}>Explore SDKs <ArrowUpRight /></AppLink></div>
          </div>
          <DeveloperTerminal />
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container contact-inner">
          <div>
            <div className="contact-copy reveal"><p className="eyebrow light-eye"><span /> Contact</p><h2>Ready to move with<br /><em>{businessInfo.shortName}?</em></h2><p>Start building free, or talk with a transit expert about your network.</p></div>
            <BusinessDetails />
          </div>
          <ContactForm showToast={showToast} />
        </div>
      </section>
    </>
  );
}

function DeveloperTerminal({ compact = false }) {
  const code = compact
    ? `const label = await truetransit.labels.create({
  carrier: 'best_rate',
  service: 'two_day',
  parcel: shipment.parcel
});

console.log(label.tracking_code);`
    : `import { TrueTransit } from 'truetransit';

const client = new TrueTransit({
  apiKey: process.env.TRUETRANSIT_KEY
});

const shipment = await client.shipments.create({
  from: 'warehouse_nyc',
  to: customer.address,
  parcel: { weight: 2.4, unit: 'lb' }
});

console.log(shipment.tracking_code);`;

  return (
    <div className="terminal reveal" id={compact ? 'api-reference' : undefined}>
      <div className="terminal-top"><span /><span /><span /><small>{compact ? 'quickstart.js' : 'create-shipment.js'}</small></div>
      <pre><code>{code}</code></pre>
      <div className="terminal-result"><CircleCheck /><span>{compact ? 'Sandbox ready' : 'Label created'}</span><code>{compact ? '200 OK' : 'sl_83hk29xp'}</code><small>{compact ? '91ms' : '184ms'}</small></div>
    </div>
  );
}

function ProductCards() {
  const cards = [
    ['shipping-api', '', PackageOpen, 'Product 01', 'Shipping API', 'Create labels, verify addresses, compare carrier rates, and manage returns from one API built for high-volume teams.', ['100+ carriers and services', 'Label creation in milliseconds', 'Address validation and customs data']],
    ['loom-ai', ' accent-lime', Sparkles, 'Product 02', 'Transit AI', 'Turn shipping events into practical decisions: route changes, cost alerts, exception summaries, and demand forecasts.', ['Plain-language operations insights', 'Carrier performance recommendations', 'Peak season risk detection']],
    ['tracking', ' accent-blue', Radar, 'Product 03', 'Predictive tracking', 'Normalize carrier events into a single customer-ready timeline with reliable delivery windows and proactive alerts.', ['Real-time tracking webhooks', 'Branded tracking pages', 'Delay and exception automation']],
    ['protection', ' accent-coral', ShieldCheck, 'Product 04', 'Package protection', 'Add affordable coverage and automated claim workflows that protect revenue without slowing down support teams.', ['Embedded insurance rules', 'Fast claim resolution', 'Fraud-aware approvals']],
  ];

  return (
    <>
      {cards.map(([id, accent, Icon, label, title, copy, bullets]) => (
        <div className={`page-card${accent}`} id={id} key={id}>
          <span><Icon /></span>
          <small>{label}</small>
          <h2>{title}</h2>
          <p>{copy}</p>
          <ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        </div>
      ))}
    </>
  );
}

function ProductsPage({ onNavigate }) {
  return (
    <>
      <section className="page-hero product-page">
        <div className="container page-hero-inner">
          <div className="reveal">
            <p className="eyebrow"><span /> Products</p>
            <h1>Everything your shipping stack needs.</h1>
            <p>{businessInfo.shortName} brings labels, tracking, AI decisions, and protection into one connected workflow for growing brands.</p>
            <div className="hero-actions"><AppLink className="button button-dark" href="/pricing" onNavigate={onNavigate}>Start free <ArrowUpRight /></AppLink><AppLink className="button button-outline" href="/developers" onNavigate={onNavigate}>View docs</AppLink></div>
          </div>
          <div className="route-panel reveal">
            <div><Package /><span>Order placed</span></div>
            <div><Route /><span>Carrier selected</span></div>
            <div><Radar /><span>Tracking live</span></div>
            <div><Home /><span>Delivered</span></div>
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="container page-grid"><ProductCards /></div>
      </section>
    </>
  );
}

function SolutionsPage({ onNavigate }) {
  const items = [
    [Truck, 'Ecommerce operations', 'Reduce label cost, automate routing rules, and keep support teams ahead of delivery questions.'],
    [Package, 'Fulfillment networks', 'Unify warehouse shipping decisions while preserving local carrier preferences and service levels.'],
    [ChartNoAxesCombined, 'Finance and leadership', 'Track spend, forecast peak season pressure, and prove the impact of every carrier decision.'],
  ];

  return (
    <>
      <section className="page-hero solutions-page">
        <div className="container page-hero-inner">
          <div className="reveal">
            <p className="eyebrow"><span /> Solutions</p>
            <h1>Built for teams that cannot miss delivery promises.</h1>
            <p>Use {businessInfo.shortName} for ecommerce, marketplaces, fulfillment networks, and global operations where every parcel matters.</p>
            <div className="hero-actions"><AppLink className="button button-dark" href="/pricing" onNavigate={onNavigate}>Compare plans <ArrowUpRight /></AppLink><AppLink className="button button-outline" href="/customers" onNavigate={onNavigate}>See customers</AppLink></div>
          </div>
          <div className="score-panel reveal"><strong>92</strong><span>/100</span><small>Peak readiness</small></div>
        </div>
      </section>
      <section className="page-section" id="teams">
        <div className="container solution-list">
          {items.map(([Icon, title, copy]) => <article key={title}><Icon /><div><h2>{title}</h2><p>{copy}</p></div></article>)}
        </div>
      </section>
    </>
  );
}

function DevelopersPage({ onNavigate }) {
  return (
    <>
      <section className="page-hero developer-page">
        <div className="container developer-inner">
          <div className="developer-copy reveal">
            <p className="eyebrow"><span /> Developers</p>
            <h1>Clean APIs for production shipping.</h1>
            <p>Start in the sandbox, create labels, subscribe to webhooks, and ship your first integration without wrestling carrier edge cases.</p>
            <div className="dev-links"><a href="#api-reference">API reference <ArrowUpRight /></a><a href="#sdks">SDKs <ArrowUpRight /></a></div>
          </div>
          <DeveloperTerminal compact />
        </div>
      </section>
      <section className="page-section" id="sdks">
        <div className="container page-grid compact">
          <div className="page-card"><span><Braces /></span><small>SDKs</small><h2>Node, Python, Ruby</h2><p>Typed helpers, webhook verification, retries, and examples for common shipping workflows.</p></div>
          <div className="page-card accent-blue" id="status"><span><ShieldCheck /></span><small>Status</small><h2>99.99% API uptime</h2><p>Regional redundancy, clear rate limits, and operational alerts your team can trust.</p></div>
        </div>
      </section>
    </>
  );
}

function CustomersPage({ onNavigate }) {
  return (
    <>
      <section className="page-hero customers-page">
        <div className="container page-hero-inner">
          <div className="reveal">
            <p className="eyebrow"><span /> Customers</p>
            <h1>Real teams, better delivery math.</h1>
            <p>Brands use {businessInfo.shortName} to lower spend, expand fulfillment capacity, and make tracking feel calmer for their customers.</p>
            <div className="hero-actions"><AppLink className="button button-dark" href="/solutions" onNavigate={onNavigate}>Explore solutions <ArrowUpRight /></AppLink><AppLink className="button button-outline" href="/pricing" onNavigate={onNavigate}>Start free</AppLink></div>
          </div>
        </div>
      </section>
      <div className="page-stories"><Stories /></div>
    </>
  );
}

function PricingPage({ onNavigate, showToast }) {
  const plans = [
    ['Launch', '$0', '10,000 free labels, tracking webhooks, and sandbox access.', '/developers', 'Build now'],
    ['Growth', 'Custom', 'Discounted rates, AI recommendations, branded tracking, and shared support.', '/solutions', 'Talk to sales', true],
    ['Enterprise', 'Scale', 'Dedicated limits, security reviews, network planning, and premium support.', '/customers', 'See results'],
  ];

  return (
    <>
      <section className="page-hero pricing-page">
        <div className="container page-hero-inner">
          <div className="reveal">
            <p className="eyebrow"><span /> Pricing</p>
            <h1>Start small. Scale every shipment.</h1>
            <p>Transparent usage-based plans with the same shipping intelligence available from day one.</p>
          </div>
          <ContactForm pricing showToast={showToast} />
        </div>
      </section>
      <section className="page-section">
        <div className="container pricing-grid">
          {plans.map(([name, price, copy, href, label, featured]) => (
            <article className={featured ? 'featured' : ''} key={name}>
              <small>{name}</small><strong>{price}</strong><p>{copy}</p>
              <AppLink href={href} onNavigate={onNavigate}>{label} <ArrowUpRight /></AppLink>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Footer({ onNavigate, showToast }) {
  function newsletter(event) {
    event.preventDefault();
    showToast("You're on the list. Welcome aboard.");
    event.currentTarget.reset();
  }

  return (
    <footer className="site-footer" id="pricing">
      <div className="container">
        <div className="footer-top">
          <AppLink className="brand footer-brand" href="/" onNavigate={onNavigate}><BrandLogo /></AppLink>
          <p>Transit You Can Trust.</p>
        </div>
        <div className="footer-grid">
          <div><h4>Tools</h4><AppLink href="/tracking" onNavigate={onNavigate}>Tracking</AppLink><AppLink href="/rate-calculator" onNavigate={onNavigate}>Rate calculator</AppLink><AppLink href="/weight-calculator" onNavigate={onNavigate}>Weight calculator</AppLink><AppLink href="/contact" onNavigate={onNavigate}>Contact</AppLink></div>
          <div><h4>Services</h4><AppLink href="/products#shipping-api" onNavigate={onNavigate}>Shipping API</AppLink><AppLink href="/products#loom-ai" onNavigate={onNavigate}>Transit AI</AppLink><AppLink href="/products#tracking" onNavigate={onNavigate}>Live tracking</AppLink><AppLink href="/products#protection" onNavigate={onNavigate}>Protection</AppLink></div>
          <div><h4>Company</h4><AppLink href="/contact" onNavigate={onNavigate}>Office address</AppLink><a href={`mailto:${businessInfo.email}`}>Email support</a><AppLink href="/tracking" onNavigate={onNavigate}>Track shipment</AppLink><AppLink href="/rate-calculator" onNavigate={onNavigate}>Estimate rate</AppLink></div>
          <div><h4>Official Info</h4><p>{businessInfo.name}</p><p>{businessInfo.address}</p><p>Support: {businessInfo.support}</p><a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a><form className="newsletter" onSubmit={newsletter}><input type="email" aria-label="Email address" placeholder="Email address" required /><button aria-label="Subscribe"><ArrowRight /></button></form></div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 {businessInfo.name}.</span>
          <div><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Security</a></div>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top <ArrowUp /></button>
        </div>
      </div>
    </footer>
  );
}

function Toast({ message, visible }) {
  return (
    <div className={`toast${visible ? ' show' : ''}`} role="status">
      <CircleCheck />
      <span>{message}</span>
    </div>
  );
}

export default function App() {
  const [path, setPath] = useState(normalizePath());
  const [toast, setToast] = useState({ message: "Thanks - we'll be in touch shortly.", visible: false });

  const isSubpage = path !== '/';
  const titles = useMemo(() => ({
    '/tracking': `Tracking | ${pageTitle}`,
    '/rate-calculator': `Rate Calculator | ${pageTitle}`,
    '/weight-calculator': `Weight Calculator | ${pageTitle}`,
    '/contact': `Contact | ${pageTitle}`,
    '/products': `Products | ${pageTitle}`,
    '/solutions': `Solutions | ${pageTitle}`,
    '/developers': `Developers | ${pageTitle}`,
    '/customers': `Customers | ${pageTitle}`,
    '/pricing': `Pricing | ${pageTitle}`,
  }), []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  function navigate(nextPath, hash = '') {
    setPath(nextPath);
    if (!hash) {
      window.scrollTo(0, 0);
    }
    window.setTimeout(() => {
      if (hash) document.querySelector(hash)?.scrollIntoView();
      else window.scrollTo(0, 0);
    }, 40);
  }

  function showToast(message) {
    setToast({ message, visible: true });
    window.setTimeout(() => setToast((value) => ({ ...value, visible: false })), 3200);
  }

  useEffect(() => {
    const onPopState = () => setPath(normalizePath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    document.title = titles[path] || pageTitle;
    document.body.classList.toggle('subpage', isSubpage);
  }, [isSubpage, path, titles]);

  useEffect(() => {
    const elements = [...document.querySelectorAll('.reveal')];
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [path]);

  let page = <HomePage onNavigate={navigate} showToast={showToast} />;
  if (path === '/tracking') page = <TrackingPage />;
  if (path === '/rate-calculator') page = <RateCalculatorPage />;
  if (path === '/weight-calculator') page = <WeightCalculatorPage />;
  if (path === '/contact') page = <ContactPage showToast={showToast} />;
  if (path === '/products') page = <ProductsPage onNavigate={navigate} />;
  if (path === '/solutions') page = <SolutionsPage onNavigate={navigate} />;
  if (path === '/developers') page = <DevelopersPage onNavigate={navigate} />;
  if (path === '/customers') page = <CustomersPage onNavigate={navigate} />;
  if (path === '/pricing') page = <PricingPage onNavigate={navigate} showToast={showToast} />;

  return (
    <>
      <Header path={path} onNavigate={navigate} />
      <main>{page}</main>
      <Footer onNavigate={navigate} showToast={showToast} />
      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}
