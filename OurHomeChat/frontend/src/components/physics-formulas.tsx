import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, BookOpen, Zap, Waves, Atom } from "lucide-react";

interface PhysicsFormulasProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PhysicsFormulas({ isOpen, onClose }: PhysicsFormulasProps) {
  const [activeSection, setActiveSection] = useState("mechanics");

  // Prevent body scrolling when physics overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formulaSections = {
    mechanics: {
      title: "Classical Mechanics",
      icon: <Zap className="w-5 h-5" />,
      formulas: [
        { name: "Newton's Second Law", formula: "F = ma", description: "Force equals mass times acceleration" },
        { name: "Kinematic Equation", formula: "v² = u² + 2as", description: "Final velocity squared" },
        { name: "Work-Energy Theorem", formula: "W = ΔKE = ½mv² - ½mu²", description: "Work equals change in kinetic energy" },
        { name: "Momentum", formula: "p = mv", description: "Momentum equals mass times velocity" },
        { name: "Impulse", formula: "J = FΔt = Δp", description: "Impulse equals force times time" },
        { name: "Gravitational Force", formula: "F = G(m₁m₂)/r²", description: "Universal gravitation" },
        { name: "Centripetal Force", formula: "F = mv²/r", description: "Force toward center of circular motion" },
        { name: "Simple Harmonic Motion", formula: "x = A cos(ωt + φ)", description: "Position in SHM" },
      ]
    },
    thermodynamics: {
      title: "Thermodynamics",
      icon: <Waves className="w-5 h-5" />,
      formulas: [
        { name: "First Law", formula: "ΔU = Q - W", description: "Change in internal energy" },
        { name: "Ideal Gas Law", formula: "PV = nRT", description: "Pressure, volume, temperature relation" },
        { name: "Heat Transfer", formula: "Q = mcΔT", description: "Heat equals mass times specific heat times temperature change" },
        { name: "Efficiency", formula: "η = W/Qₕ = 1 - Qc/Qₕ", description: "Carnot engine efficiency" },
        { name: "Entropy Change", formula: "ΔS = ∫(dQ/T)", description: "Change in entropy" },
        { name: "Stefan-Boltzmann Law", formula: "j = σT⁴", description: "Blackbody radiation" },
      ]
    },
    electromagnetism: {
      title: "Electromagnetism",
      icon: <Zap className="w-5 h-5" />,
      formulas: [
        { name: "Coulomb's Law", formula: "F = kq₁q₂/r²", description: "Electric force between charges" },
        { name: "Electric Field", formula: "E = F/q = kQ/r²", description: "Electric field strength" },
        { name: "Ohm's Law", formula: "V = IR", description: "Voltage equals current times resistance" },
        { name: "Power", formula: "P = VI = I²R = V²/R", description: "Electrical power" },
        { name: "Magnetic Force", formula: "F = qvB sin θ", description: "Force on moving charge in magnetic field" },
        { name: "Faraday's Law", formula: "ε = -dΦ/dt", description: "Induced EMF" },
        { name: "Capacitance", formula: "C = Q/V", description: "Capacitor charge storage" },
        { name: "Maxwell's Equations", formula: "∇·E = ρ/ε₀", description: "Gauss's law for electricity" },
      ]
    },
    waves: {
      title: "Waves & Optics",
      icon: <Waves className="w-5 h-5" />,
      formulas: [
        { name: "Wave Equation", formula: "v = fλ", description: "Velocity equals frequency times wavelength" },
        { name: "Snell's Law", formula: "n₁ sin θ₁ = n₂ sin θ₂", description: "Refraction of light" },
        { name: "Mirror Equation", formula: "1/f = 1/do + 1/di", description: "Spherical mirror formula" },
        { name: "Lens Equation", formula: "1/f = 1/do + 1/di", description: "Thin lens formula" },
        { name: "Doppler Effect", formula: "f' = f(v ± vo)/(v ± vs)", description: "Frequency shift due to motion" },
        { name: "Interference", formula: "δ = d sin θ", description: "Path difference for interference" },
        { name: "Diffraction Grating", formula: "d sin θ = mλ", description: "Grating equation" },
      ]
    },
    modern: {
      title: "Modern Physics",
      icon: <Atom className="w-5 h-5" />,
      formulas: [
        { name: "Mass-Energy", formula: "E = mc²", description: "Einstein's mass-energy equivalence" },
        { name: "Planck's Equation", formula: "E = hf", description: "Energy of a photon" },
        { name: "De Broglie Wavelength", formula: "λ = h/p", description: "Matter wave wavelength" },
        { name: "Photoelectric Effect", formula: "hf = φ + KEmax", description: "Einstein's photoelectric equation" },
        { name: "Uncertainty Principle", formula: "Δx Δp ≥ ℏ/2", description: "Heisenberg uncertainty relation" },
        { name: "Schrödinger Equation", formula: "iℏ ∂ψ/∂t = Ĥψ", description: "Time-dependent Schrödinger equation" },
        { name: "Lorentz Factor", formula: "γ = 1/√(1 - v²/c²)", description: "Special relativity factor" },
      ]
    }
  };

  return (
    <div className="physics-overlay bg-background">
      <div className="h-full w-full flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border px-3 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-foreground">Physics Reference</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Essential formulas and equations</p>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-close-physics"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </header>

        {/* Mobile Categories Dropdown - Only on Mobile */}
        <div className="sm:hidden flex-shrink-0 bg-card border-b border-border px-3 py-2">
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value)}
            className="w-full p-2 border border-input rounded-md bg-background text-foreground text-sm"
          >
            {Object.entries(formulaSections).map(([key, section]) => (
              <option key={key} value={key}>
                {section.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Desktop Sidebar - Hidden on Mobile */}
          <div className="hidden sm:flex w-48 lg:w-64 border-r border-border p-4 flex-col flex-shrink-0">
            <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              Categories
            </h3>
            <div className="space-y-1">
              {Object.entries(formulaSections).map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === key
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  data-testid={`button-category-${key}`}
                >
                  {section.icon}
                  <span className="text-left">{section.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="p-3 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-4 flex items-center space-x-2">
                    <span className="sm:hidden">{formulaSections[activeSection as keyof typeof formulaSections].icon}</span>
                    <span>{formulaSections[activeSection as keyof typeof formulaSections].title}</span>
                  </h2>
                </div>

                <div className="grid gap-3 sm:gap-4">
                  {formulaSections[activeSection as keyof typeof formulaSections].formulas.map((formula, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-lg p-3 sm:p-4 border border-border"
                      data-testid={`formula-${activeSection}-${index}`}
                    >
                      <div>
                        <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">
                          {formula.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                          {formula.description}
                        </p>
                        <div className="bg-muted border border-border rounded p-2 sm:p-3 font-mono text-sm sm:text-lg text-center break-all">
                          <span className="text-primary font-semibold">
                            {formula.formula}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Add some bottom padding for mobile scrolling */}
                <div className="h-4 sm:h-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}