import { useEffect, useState, useRef } from "react";

const stages = ["CODE", "ANALYZE", "SANDBOX", "TEST", "DEPLOY", "LIVE"];

const analysisRows = [
  ["LANGUAGE", "Python 3.12", "99.8%"],
  ["FRAMEWORK", "FastAPI", "98.4%"],
  ["DATABASE", "PostgreSQL", "96.1%"],
  ["ENTRYPOINT", "app/main.py", "VERIFIED"],
];

const workflow = [
  { n: "01", title: "Understand", text: "We map runtime, dependencies, services, and intent directly from your codebase." },
  { n: "02", title: "Prove", text: "Every build runs in an isolated sandbox with generated checks and your own test suite." },
  { n: "03", title: "Operate", text: "Validated artifacts become live services, monitored and repaired continuously." },
];

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg className={down ? "icon down" : "icon"} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

function Mark() {
  return (
    <div className="mark" aria-label="Opryn home">
      <svg viewBox="0 0 28 28" aria-hidden="true" style={{ overflow: "visible" }}>
        <path 
          d="M 14 4 L 22.66 9 L 22.66 19 L 14 24 L 5.34 19 L 5.34 9 Z" 
          style={{ fill: "transparent", stroke: "rgba(255, 255, 255, 0.2)", strokeWidth: 1 }}
        />
        <path 
          d="M 14 14 L 14 24 M 14 14 L 5.34 9 M 14 14 L 22.66 9" 
          style={{ fill: "transparent", stroke: "#ffffff", strokeWidth: 1.5, filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.9))" }}
        />
      </svg>
      <span>OPRYN</span>
    </div>
  );
}

function StatusDot({ pulse = false }: { pulse?: boolean }) {
  return <span className={pulse ? "status-dot pulse" : "status-dot"} />;
}

function Pipeline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % stages.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="pipeline-shell">
      <div className="pipeline-topbar mono">
        <span>TRANSFORMATION / 04:32:18</span>
        <span className="run-state"><StatusDot pulse /> RUNNING</span>
      </div>
      <div className="pipeline-body">
        <div className="source-code mono">
          <span><i>01</i> from fastapi import FastAPI</span>
          <span><i>02</i> from ledger import Expense</span>
          <span><i>03</i></span>
          <span><i>04</i> app = FastAPI()</span>
          <span><i>05</i></span>
          <span className="hot"><i>06</i> @app.post("/expenses")</span>
          <span><i>07</i> async def create(expense):</span>
          <span><i>08</i> &nbsp;&nbsp;return await expense.save()</span>
        </div>
        <div className="pipeline-rail">
          {stages.map((stage, index) => (
            <button
              className={`pipeline-stage ${active === index ? "active" : ""} ${active > index ? "done" : ""}`}
              key={stage}
              onClick={() => setActive(index)}
            >
              <span className="stage-index mono">0{index + 1}</span>
              <span className="stage-name">{stage}</span>
              <span className="stage-detail mono">
                {active === index ? "PROCESSING" : active > index ? "COMPLETE" : "WAITING"}
              </span>
            </button>
          ))}
          <span className="rail-progress" style={{ height: `${(active / (stages.length - 1)) * 100}%` }} />
        </div>
      </div>
      <div className="pipeline-footer mono">
        <span>ARTIFACT SHA / 7DB4-A91C</span>
        <span>REGION / US-EAST</span>
      </div>
    </div>
  );
}

function RuntimeSculpture() {
  const [rotation, setRotation] = useState({ x: -11, y: 18 });

  function rotateScene(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setRotation({ x: -11 - y * 14, y: 18 + x * 24 });
  }

  return (
    <section className="sculpture-section" onPointerMove={rotateScene}>
      <div className="sculpture-copy">
        <span className="eyebrow">03.5 / COMPUTE AS MATERIAL</span>
        <h2>Infrastructure you can almost touch.</h2>
        <p>
          Opryn turns source code into a living runtime object: mapped, contained,
          observable, and ready to move.
        </p>
        <div className="sculpture-legend mono">
          <span><i className="legend-code" /> SOURCE SIGNAL</span>
          <span><i className="legend-runtime" /> RUNTIME CELL</span>
          <span><i className="legend-route" /> NETWORK ROUTE</span>
        </div>
      </div>

      <div className="scene-wrap">
        <div className="scene-noise" />
        <div
          className="scene"
          style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        >
          <div className="scene-floor">
            {Array.from({ length: 9 }).map((_, index) => <span key={index} />)}
          </div>
          <div className="runtime-cube">
            <div className="cube-face cube-front">
              <span className="mono">APP</span>
              <b>01</b>
            </div>
            <div className="cube-face cube-back"><span className="mono">DATA</span></div>
            <div className="cube-face cube-right"><span className="mono">EDGE</span></div>
            <div className="cube-face cube-left"><span className="mono">BUILD</span></div>
            <div className="cube-face cube-top"><span className="mono">LIVE</span></div>
            <div className="cube-face cube-bottom" />
          </div>
          <div className="orbit orbit-one"><span /><span /><span /></div>
          <div className="orbit orbit-two"><span /><span /></div>
          <div className="orbit orbit-three"><span /></div>
          <div className="satellite satellite-a"><i /><b className="mono">T_01</b></div>
          <div className="satellite satellite-b"><i /><b className="mono">T_02</b></div>
          <div className="satellite satellite-c"><i /><b className="mono">T_03</b></div>
          <div className="vertical-beam" />
        </div>
        <div className="scene-hud hud-top mono">
          <span>ARTIFACT / 7DB4</span>
          <b>DRAG SPACE</b>
        </div>
        <div className="scene-hud hud-bottom mono">
          <span>OBJECT STATE</span>
          <b><StatusDot pulse /> SELF-OPERATING</b>
        </div>
        <div className="scene-scale mono">
          {["100", "075", "050", "025", "000"].map((value) => <span key={value}>{value}</span>)}
        </div>
      </div>
      <div className="sculpture-stamp mono">NOT A CONTAINER<br />A COMPUTATIONAL OBJECT</div>
    </section>
  );
}

function AnalysisConsole() {
  return (
    <div className="analysis-console">
      <div className="console-header mono">
        <span>PROJECT INTELLIGENCE</span>
        <span>SCAN 0.84s</span>
      </div>
      <div className="analysis-orbit">
        <svg viewBox="0 0 360 250" aria-hidden="true">
          <path className="orbit-line" d="M180 20v50M180 180v50M40 125h75M245 125h75" />
          <path className="orbit-line faint" d="M180 70L90 125l90 55 90-55z" />
          <circle cx="180" cy="125" r="54" className="orbit-ring" />
          <circle cx="180" cy="125" r="30" className="orbit-ring inner" />
          <circle cx="180" cy="125" r="7" className="orbit-core" />
          <circle cx="180" cy="40" r="4" className="orbit-node" />
          <circle cx="70" cy="125" r="4" className="orbit-node" />
          <circle cx="290" cy="125" r="4" className="orbit-node" />
          <circle cx="180" cy="210" r="4" className="orbit-node" />
        </svg>
        <span className="orbit-label label-top mono">RUNTIME</span>
        <span className="orbit-label label-right mono">ROUTES</span>
        <span className="orbit-label label-bottom mono">DATA</span>
        <span className="orbit-label label-left mono">DEPS</span>
        <div className="orbit-center mono"><strong>47</strong><span>SIGNALS</span></div>
      </div>
      <div className="analysis-table">
        {analysisRows.map(([key, value, confidence]) => (
          <div className="analysis-row mono" key={key}>
            <span>{key}</span><strong>{value}</strong><em>{confidence}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestMatrix() {
  return (
    <div className="test-surface">
      <div className="test-head">
        <div><span className="eyebrow">ISOLATED EXECUTION</span><strong>expense-tracker / test</strong></div>
        <span className="mono ready"><StatusDot pulse /> SANDBOX READY</span>
      </div>
      <div className="test-columns">
        <div className="terminal mono">
          <div className="terminal-bar"><span>TEST OUTPUT</span><span>+ 0.00s</span></div>
          <p><i>$</i> opryn test --generated</p>
          <p className="dim">collecting project tests...</p>
          <p><b>PASS</b> tests/test_create.py</p>
          <p><b>PASS</b> tests/test_totals.py</p>
          <p><b>PASS</b> tests/test_auth.py</p>
          <p><b>PASS</b> tests/test_currency.py</p>
          <p className="dim">8 passed in 2.47s</p>
        </div>
        <div className="matrix">
          <div className="matrix-title mono"><span>EXECUTION MAP</span><span>8 / 8</span></div>
          <div className="matrix-grid">
            {Array.from({ length: 40 }).map((_, index) => (
              <span key={index} className={index === 13 || index === 27 ? "trace" : index < 35 ? "passed" : ""} />
            ))}
          </div>
          <div className="resource mono">
            <span>CPU <i><b style={{ width: "32%" }} /></i> 32%</span>
            <span>MEM <i><b style={{ width: "48%" }} /></i> 241MB</span>
            <span>I/O <i><b style={{ width: "19%" }} /></i> 19%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiagnosticFlow() {
  return (
    <div className="diagnostic">
      <div className="diag-event">
        <span className="mono">02:14:08.221</span>
        <strong>Runtime exception</strong>
        <code>ConnectionRefusedError: postgres:5432</code>
      </div>
      <div className="diag-connector"><span /><i>REASONING</i><span /></div>
      <div className="diag-reason">
        <span className="mono">ROOT CAUSE / 97% CONFIDENCE</span>
        <strong>Service initialized before database readiness check completed.</strong>
        <p>Dependency graph indicates a missing health condition in the startup sequence.</p>
      </div>
      <div className="diag-connector"><span /><i>PATCHING</i><span /></div>
      <div className="diag-patch mono">
        <div><span>−</span> depends_on: postgres</div>
        <div><b>+</b> condition: service_healthy</div>
        <div><b>+</b> retries: 5</div>
        <footer><StatusDot /> PATCH VERIFIED / 8 TESTS PASSED</footer>
      </div>
    </div>
  );
}

function DeploymentDashboard() {
  return (
    <div className="deploy-dashboard">
      <div className="deploy-sidebar">
        <Mark />
        <div className="deploy-nav mono">
          <span className="selected">OVERVIEW</span><span>DEPLOYS</span><span>RUNTIME</span><span>LOGS</span><span>SETTINGS</span>
        </div>
        <small className="mono">OPRYN / PROD<br />US-EAST-1</small>
      </div>
      <div className="deploy-main">
        <div className="deploy-heading">
          <div><span className="eyebrow">PROJECT</span><strong>Expense Tracker</strong></div>
          <span className="live-badge mono"><StatusDot pulse /> LIVE</span>
        </div>
        <div className="url-row mono"><span>PRODUCTION URL</span><strong>expense.project.dev</strong><button>COPY</button></div>
        <div className="deploy-stats">
          <div><span>RUNTIME DETECTED</span><strong>Python 3.12</strong></div>
          <div><span>DEPENDENCIES</span><strong>14</strong></div>
          <div><span>BUILD</span><strong>Complete</strong></div>
          <div><span>SANDBOX</span><strong>Running</strong></div>
          <div><span>TESTS</span><strong>8 / 8 passed</strong></div>
          <div className="accent-stat"><span>DEPLOYMENT</span><strong>LIVE</strong></div>
        </div>
        <div className="traffic-chart">
          <div className="chart-label mono"><span>REQUESTS / 24H</span><strong>18,492</strong><span>99.99% SUCCESS</span></div>
          <svg viewBox="0 0 800 180" preserveAspectRatio="none" aria-hidden="true">
            <path className="chart-grid" d="M0 45h800M0 90h800M0 135h800" />
            <path className="chart-line" d="M0 150L28 145 55 130 83 136 110 115 138 122 165 102 193 110 220 80 248 94 275 70 303 75 330 52 358 62 386 57 413 80 441 68 468 88 496 72 523 48 551 55 578 35 606 44 633 31 661 37 688 20 716 30 743 18 771 24 800 10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SecurityMark() {
  const [center, setCenter] = useState({ cx: 3, cy: 3 });
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const rect = gridRef.current.getBoundingClientRect();
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      
      // Un-rotate by -45 degrees
      const localX = (dx + dy) * 0.7071;
      const localY = (dy - dx) * 0.7071;
      
      const cellSize = 25; // 18px cell + 7px gap
      
      let gridX = Math.round(localX / cellSize);
      let gridY = Math.round(localY / cellSize);
      
      gridX = Math.max(-2, Math.min(2, gridX));
      gridY = Math.max(-2, Math.min(2, gridY));
      
      setCenter({ cx: 3 + gridX, cy: 3 + gridY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const isActive = (index: number) => {
    const x = index % 7;
    const y = Math.floor(index / 7);
    return Math.abs(x - center.cx) <= 1 && Math.abs(y - center.cy) <= 1;
  };

  return (
    <div className="security-mark">
      <div className="shield-grid" ref={gridRef}>
        {Array.from({ length: 49 }).map((_, index) => (
          <span
            key={index}
            className={isActive(index) ? "on" : ""}
          />
        ))}
      </div>
      <span className="mono">TRUST BOUNDARY / ACTIVE</span>
    </div>
  );
}

function InteractiveHeroLogo() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 50, y: 50 });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width: "360px",
        height: "360px",
        cursor: "default",
        margin: "0 auto"
      }}
    >
      <svg viewBox="0 0 28 28" aria-hidden="true" style={{ width: "100%", height: "100%", overflow: "visible" }}>
        <defs>
          <radialGradient id="cursorGlow" cx={`${mousePos.x}%`} cy={`${mousePos.y}%`} r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
          </radialGradient>
          <filter id="blurGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Faint Outer Hexagon */}
        <path 
          d="M 14 4 L 22.66 9 L 22.66 19 L 14 24 L 5.34 19 L 5.34 9 Z" 
          style={{ fill: "transparent", stroke: "rgba(255, 255, 255, 0.06)", strokeWidth: 0.2 }}
        />
        
        {/* Soft Glowing Y shape */}
        <path 
          d="M 14 14 L 14 24 M 14 14 L 5.34 9 M 14 14 L 22.66 9" 
          style={{ 
            fill: "transparent", 
            stroke: "url(#cursorGlow)", 
            strokeWidth: 0.8, 
            filter: "url(#blurGlow)",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }}
        />
        
        {/* Sharp inner core */}
        <path 
          d="M 14 14 L 14 24 M 14 14 L 5.34 9 M 14 14 L 22.66 9" 
          style={{ 
            fill: "transparent", 
            stroke: "url(#cursorGlow)", 
            strokeWidth: 0.2,
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }}
        />
      </svg>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="site-shell">
      <header className="nav">
        <a href="#top"><Mark /></a>
        <nav>
          <a href="#platform">Platform</a>
          <a href="#security">Security</a>
          <a href="#pricing">Pricing</a>
          <a href="#docs">Docs</a>
        </nav>
        <a className="nav-cta" href="#pricing">GET ACCESS <Arrow /></a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span>01</span> AI-NATIVE CLOUD INFRASTRUCTURE</div>
            <h1>Software shouldn’t need <em>infrastructure.</em></h1>
            <p>Build with AI. We understand, test, deploy and operate the software for you.</p>
            <div className="hero-actions">
              <a className="button primary" href="#pricing">Deploy now</a>
              <a className="button secondary" href="#platform">Talk to sales</a>
            </div>
          </div>
          
          <div style={{ display: "flex", justifyContent: "center" }}>
            <InteractiveHeroLogo />
          </div>

          <div style={{ 
            color: "#b9c0ba", 
            fontSize: "14px", 
            lineHeight: "2", 
            fontFamily: "Inter, sans-serif"
          }}>
            <p style={{ margin: "0 0 8px 0" }}>For coding agents</p>
            <p style={{ margin: "0 0 8px 0" }}>To ship apps and agents</p>
            <p style={{ margin: "0" }}>Automated by agents</p>
          </div>
          <div className="hero-coordinates mono">37.7749° N<br />122.4194° W</div>
        </section>

        <section style={{ padding: "0 4vw 80px 4vw", maxWidth: "1200px", margin: "0 auto" }}>
          <Pipeline />
        </section>

        <section className="problem section-dark">
          <div className="section-index mono">02 / THE PROBLEM</div>
          <div className="problem-statement">
            <span>YOU WRITE THE SOFTWARE.</span>
            <h2>The machinery around it still demands a second profession.</h2>
          </div>
          <div className="problem-list">
            {["CONFIGURATION", "CI / CD", "CONTAINERS", "OBSERVABILITY", "RECOVERY"].map((item, index) => (
              <div key={item}><span className="mono">0{index + 1}</span><strong>{item}</strong><i>MANUAL</i></div>
            ))}
            <div className="problem-answer"><span className="mono">06</span><strong>YOUR PRODUCT</strong><i>DELAYED</i></div>
          </div>
          <p className="problem-note">Infrastructure was designed for humans to configure. Opryn is designed for software to operate itself.</p>
        </section>

        <section className="workflow" id="platform">
          <div className="section-title-row">
            <div><span className="eyebrow">03 / OPERATING MODEL</span><h2>From intent to a live system.</h2></div>
            <p>One continuous reasoning loop replaces the fragmented cloud toolchain.</p>
          </div>
          <div className="workflow-rail">
            {workflow.map((step) => (
              <article key={step.n}>
                <span className="step-number mono">{step.n}</span>
                <div className="step-symbol"><span /><span /><span /></div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <div className="full-flow mono">
            {["CODE", "AI UNDERSTANDS", "BUILD", "SANDBOX", "TEST", "DIAGNOSE", "FIX", "DEPLOY", "LIVE"].map((item, index) => (
              <span key={item} className={item === "LIVE" ? "current" : ""}>{item}{index < 8 && <i>→</i>}</span>
            ))}
          </div>
        </section>

        <RuntimeSculpture />

        <section className="feature-section analysis-section">
          <div className="feature-copy">
            <span className="eyebrow">04 / PROJECT ANALYSIS</span>
            <h2>Your codebase is the configuration.</h2>
            <p>Opryn forms an operational model of every repository—what it is, what it needs, and how it should run. No YAML archaeology required.</p>
            <ul className="feature-list mono">
              <li><StatusDot /> FRAMEWORK INFERENCE</li>
              <li><StatusDot /> DEPENDENCY GRAPH</li>
              <li><StatusDot /> SERVICE DISCOVERY</li>
            </ul>
          </div>
          <AnalysisConsole />
        </section>

        <section className="feature-section testing-section">
          <div className="feature-copy">
            <span className="eyebrow">05 / SANDBOX + TEST</span>
            <h2>Nothing ships on confidence alone.</h2>
            <p>Every change executes inside a production-matched environment. Opryn generates critical-path tests, runs your suite, and inspects runtime behavior.</p>
          </div>
          <TestMatrix />
        </section>

        <section className="feature-section diagnose-section">
          <DiagnosticFlow />
          <div className="feature-copy">
            <span className="eyebrow">06 / AUTOMATIC DIAGNOSIS</span>
            <h2>Failures become inputs, not incidents.</h2>
            <p>When a system breaks, Opryn correlates traces, logs, code, and infrastructure state to isolate the root cause—then proposes and verifies the smallest safe repair.</p>
            <a href="#pricing" className="text-link">EXPLORE SELF-HEALING <Arrow /></a>
          </div>
        </section>

        <section className="deployment-section">
          <div className="section-title-row">
            <div><span className="eyebrow">07 / DEPLOYMENT</span><h2>A complete production surface.</h2></div>
            <p>Builds, runtime health, traffic, and releases—unified around the application, not the infrastructure underneath it.</p>
          </div>
          <DeploymentDashboard />
        </section>

        <section className="security-section" id="security">
          <SecurityMark />
          <div className="security-copy">
            <span className="eyebrow">08 / SECURITY BY ARCHITECTURE</span>
            <h2>Isolation is not an option you enable.</h2>
            <p>Every build and runtime executes inside an ephemeral, policy-controlled boundary. Your source and secrets stay segmented at every layer.</p>
            <div className="security-list mono">
              <span>SOC 2 TYPE II <b>READY</b></span>
              <span>ENCRYPTION <b>AES-256</b></span>
              <span>BUILD ISOLATION <b>EPHEMERAL</b></span>
              <span>SECRET ACCESS <b>JUST-IN-TIME</b></span>
            </div>
          </div>
        </section>

        <section className="pricing-section" id="pricing">
          <div className="pricing-heading">
            <span className="eyebrow">09 / PRICING</span>
            <h2>Pay for software in motion.</h2>
            <p>Start free. Scale on actual compute. No seat tax for your agents.</p>
          </div>
          <div className="pricing-grid">
            <div className="price-tier">
              <span className="mono">DEVELOP</span>
              <h3>$0 <small>/ MONTH</small></h3>
              <p>For prototypes, experiments, and finding product-market fit.</p>
              <ul><li>3 active projects</li><li>100 build minutes</li><li>Shared runtime</li><li>Community support</li></ul>
              <a className="price-button" href="#top">START BUILDING <Arrow /></a>
            </div>
            <div className="price-tier featured">
              <div className="tier-tag mono">MOST DEPLOYED</div>
              <span className="mono">OPERATE</span>
              <h3>$49 <small>/ MONTH + USAGE</small></h3>
              <p>For production teams shipping continuously with AI.</p>
              <ul><li>Unlimited projects</li><li>5,000 build minutes</li><li>Dedicated runtime</li><li>Automatic diagnosis</li></ul>
              <a className="price-button inverse" href="#top">START BUILDING <Arrow /></a>
            </div>
            <div className="price-tier">
              <span className="mono">SCALE</span>
              <h3>Custom</h3>
              <p>For organizations with critical systems and advanced controls.</p>
              <ul><li>Private regions</li><li>Custom policies</li><li>Volume compute</li><li>24/7 response</li></ul>
              <a className="price-button" href="mailto:hello@opryn.dev">CONTACT US <Arrow /></a>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="cta-signal" aria-hidden="true">
            {Array.from({ length: 28 }).map((_, index) => <span key={index} />)}
          </div>
          <div>
            <span className="eyebrow">10 / READY WHEN YOU ARE</span>
            <h2>Write the code.<br /><em>Opryn the rest.</em></h2>
            <a className="button primary" href="#pricing">Start building <Arrow /></a>
          </div>
          <p className="mono">CODE → LIVE<br />WITHOUT THE MIDDLEWARE</p>
        </section>
      </main>

      <footer>
        <Mark />
        <div className="footer-links">
          <a href="#platform">Platform</a><a href="#security">Security</a><a href="#pricing">Pricing</a><a id="docs" href="#top">Documentation</a>
        </div>
        <span className="mono">© 2025 OPRYN SYSTEMS, INC.</span>
      </footer>
    </div>
  );
}
