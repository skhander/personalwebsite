import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { motion } from "framer-motion";

const palette = {
  ink: "#101014",
  acid: "#D7FF38",
  pink: "#FF4EB8",
  blue: "#4B6CFF",
  orange: "#FF8A2A",
};

function Badge({ children }) {
  return (
    <span className="inline-flex rounded-full border border-black/20 bg-white/80 px-5 py-2 text-xs font-black uppercase tracking-[0.18em] shadow-sm backdrop-blur">
      {children}
    </span>
  );
}

export default function App() {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
      Body,
    } = Matter;

    const container = sceneRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const engine = Engine.create({ gravity: { x: 0, y: 0.9 } });
    engineRef.current = engine;

    const render = Render.create({
      element: container,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio || 1,
      },
    });

    const wallOptions = { isStatic: true, render: { visible: false } };

    const floor = Bodies.rectangle(
      width / 2,
      height - 30,
      width,
      60,
      wallOptions
    );
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height, wallOptions);
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height, wallOptions);

    const shapes = [
      Bodies.circle(width * 0.14, 80, 42, {
        restitution: 0.95,
        friction: 0.01,
        render: { fillStyle: palette.acid, strokeStyle: palette.ink, lineWidth: 4 },
      }),
      Bodies.rectangle(width * 0.32, 60, 130, 76, {
        chamfer: { radius: 18 },
        restitution: 0.9,
        angle: 0.12,
        render: { fillStyle: palette.pink, strokeStyle: palette.ink, lineWidth: 4 },
      }),
      Bodies.polygon(width * 0.5, 70, 5, 58, {
        restitution: 0.95,
        render: { fillStyle: palette.blue, strokeStyle: palette.ink, lineWidth: 4 },
      }),
      Bodies.rectangle(width * 0.68, 70, 150, 48, {
        angle: -0.08,
        restitution: 1,
        render: { fillStyle: palette.orange, strokeStyle: palette.ink, lineWidth: 4 },
      }),
      Bodies.circle(width * 0.84, 100, 28, {
        restitution: 1,
        render: { fillStyle: "#fff", strokeStyle: palette.ink, lineWidth: 4 },
      }),
    ];

    Composite.add(engine.world, [floor, leftWall, rightWall, ...shapes]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });

    Composite.add(engine.world, mouseConstraint);

    Events.on(engine, "beforeUpdate", () => {
      shapes.forEach((shape, i) => {
        Body.applyForce(shape, shape.position, {
          x: Math.sin(Date.now() / 700 + i) * 0.00008,
          y: Math.cos(Date.now() / 900 + i) * 0.00004,
        });
      });
    });

    const runner = Runner.create();
    Render.run(render);
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  const shakeWorld = () => {
    const engine = engineRef.current;
    if (!engine) return;

    Matter.Composite.allBodies(engine.world).forEach((body) => {
      if (!body.isStatic) {
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 45,
          y: -Math.random() * 45,
        });

        Matter.Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * 0.35,
          y: -Math.random() * 0.35,
        });
      }
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F0DA] text-[#101014]">
      <section className="relative min-h-screen border border-black/10">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: "radial-gradient(#101014 1.4px, transparent 1.4px)",
            backgroundSize: "24px 24px",
          }}
        />

<nav className="relative z-10 mx-auto flex max-w-7xl flex-col items-start gap-4 border-b border-black/10 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div className="text-lg font-black uppercase tracking-[0.18em] md:text-xl">
            Sharin Khander
          </div>

          <div className="flex gap-3">
            <a href="https://www.linkedin.com/in/sharin-khander" target="_blank" rel="noreferrer">
              <Badge>Work</Badge>
            </a>
            <a href="https://sharinkhander.medium.com/">
              <Badge>Blog</Badge>
            </a>
            <a href="mailto:skhander415@gmail.com">
              <Badge>Contact</Badge>
            </a>
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] items-start max-w-7xl grid-cols-1 gap-10 px-6 pt-2 pb-8 md:grid-cols-[1.1fr_.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
<div className="hidden md:block">
  <Badge>New Yorker Based in San Francisco</Badge>
</div>

            <h1 className="mt-8 text-[19vw] font-black uppercase leading-[0.82] tracking-[-0.06em] md:text-[8vw]">
              PM
              <br />
              ENGINEER
              <br />
              DESIGNER
            </h1>

            <p className="mt-8 max-w-md text-2xl font-bold leading-tight md:text-3xl">
            building habit-forming products.
              <br />
            </p>
          </motion.div>

          <div className="flex flex-col gap-8 md:justify-center">
            <motion.img
              src="/profile.jpeg"
              alt="Sharin Khander"
              initial={{ opacity: 0, y: 24, rotate: 1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
className="mt-2 md:mt-12 aspect-[4/3.5] w-full max-w-sm rounded-[1.5rem] border-2 border-black object-cover object-top shadow-sm md:ml-auto"
            />

            <div className="ml-auto max-w-sm rounded-[1.5rem] bg-[#101014] p-8 text-white shadow-xl">
              <div className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#D7FF38]">
                Currently orbiting
              </div>

              <p className="text-xl font-medium leading-snug text-white/85">
                marketplaces, personalization, fashion, consumer psychology, and delightful interfaces.
              </p>
            </div>
            <div className="flex justify-center md:justify-end md:pr-10 mt-4">
              <button
                onClick={shakeWorld}
                className="w-fit rounded-full border border-black/10 bg-[#D7FF38] px-8 py-3 text-sm font-black uppercase tracking-[0.2em] shadow-lg transition-transform hover:scale-[1.03]"
              >
                Shake Things Up
              </button>
            </div>
          </div>
        </div>

        <div
          ref={sceneRef}
          className="absolute left-[2%] right-[18%] top-[58%] bottom-[5rem] z-[2]"
        />
      </section>
    </main>
  );
}
