import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Download, Sparkles, Film, Wand2 } from "lucide-react";

const TextToVideoAgent = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("cinematic");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [scenes, setScenes] = useState([]);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const styles = [
    {
      id: "cinematic",
      name: "Cinematic",
      desc: "Movie-like visuals with dramatic lighting",
    },
    {
      id: "animation",
      name: "Animation",
      desc: "Cartoon-style vibrant animations",
    },
    { id: "realistic", name: "Realistic", desc: "Photo-realistic rendering" },
    {
      id: "abstract",
      name: "Abstract",
      desc: "Artistic and conceptual visuals",
    },
    { id: "retro", name: "Retro", desc: "Vintage film aesthetic" },
  ];

  const enhancePrompt = async (userPrompt, selectedStyle) => {
    // Mock enhancement for demo purposes
    const styleEnhancements = {
      cinematic:
        "with dramatic lighting, deep shadows, and cinematic composition. Golden hour ambiance with lens flares and atmospheric depth.",
      animation:
        "in vibrant cartoon style with bold colors, exaggerated movements, and playful energy. Bright and cheerful aesthetic.",
      realistic:
        "with photo-realistic details, natural lighting, and authentic textures. Subtle color grading and realistic physics.",
      abstract:
        "with geometric patterns, bold shapes, and conceptual visuals. Dynamic composition with striking color contrasts.",
      retro:
        "with vintage film grain, muted colors, and nostalgic VHS aesthetic. Scan lines and classic camera effects.",
    };

    return `${userPrompt} ${styleEnhancements[selectedStyle]}`;
  };

  const segmentScenes = async (enhanced) => {
    // Mock scene segmentation based on style
    const sceneTemplates = {
      cinematic: [
        {
          description: "Opening shot with dramatic reveal",
          elements: ["Main subject", "Background", "Lighting"],
          colors: ["#1a1a2e", "#e94560", "#f4a261"],
          motion: "slow zoom",
        },
        {
          description: "Mid-scene with dynamic action",
          elements: ["Movement", "Atmosphere", "Details"],
          colors: ["#16213e", "#e76f51", "#f4a261"],
          motion: "pan left",
        },
        {
          description: "Closing scene with emotional impact",
          elements: ["Resolution", "Mood", "Final view"],
          colors: ["#0f3460", "#e94560", "#2a9d8f"],
          motion: "static hold",
        },
      ],
      animation: [
        {
          description: "Vibrant opening with bouncy energy",
          elements: ["Characters", "Background", "Props"],
          colors: ["#ff006e", "#8338ec", "#3a86ff"],
          motion: "bounce",
        },
        {
          description: "Playful interaction scene",
          elements: ["Action", "Effects", "Movement"],
          colors: ["#fb5607", "#ffbe0b", "#8338ec"],
          motion: "dynamic",
        },
        {
          description: "Cheerful conclusion",
          elements: ["Finale", "Celebration", "Joy"],
          colors: ["#3a86ff", "#ff006e", "#ffbe0b"],
          motion: "spin",
        },
      ],
      realistic: [
        {
          description: "Natural opening establishing shot",
          elements: ["Environment", "Subject", "Lighting"],
          colors: ["#2d3748", "#4a5568", "#718096"],
          motion: "slow pan",
        },
        {
          description: "Detailed mid-scene focus",
          elements: ["Details", "Texture", "Depth"],
          colors: ["#1a202c", "#2d3748", "#4a5568"],
          motion: "zoom in",
        },
        {
          description: "Contemplative closing shot",
          elements: ["Atmosphere", "Emotion", "Context"],
          colors: ["#2d3748", "#4a5568", "#718096"],
          motion: "static",
        },
      ],
      abstract: [
        {
          description: "Bold geometric opening",
          elements: ["Shapes", "Patterns", "Forms"],
          colors: ["#7209b7", "#f72585", "#4361ee"],
          motion: "rotation",
        },
        {
          description: "Complex pattern evolution",
          elements: ["Transformation", "Flow", "Energy"],
          colors: ["#3a0ca3", "#f72585", "#4cc9f0"],
          motion: "morph",
        },
        {
          description: "Striking final composition",
          elements: ["Balance", "Contrast", "Unity"],
          colors: ["#560bad", "#b5179e", "#4361ee"],
          motion: "pulse",
        },
      ],
      retro: [
        {
          description: "Nostalgic VHS-style opening",
          elements: ["Vintage look", "Grain", "Tracking"],
          colors: ["#8b0000", "#2f4f4f", "#d4af37"],
          motion: "tracking shift",
        },
        {
          description: "Classic mid-scene with artifacts",
          elements: ["Distortion", "Color bleed", "Scan lines"],
          colors: ["#800020", "#1c1c1c", "#d4af37"],
          motion: "static pan",
        },
        {
          description: "Retro ending with fade",
          elements: ["Vignette", "Fade out", "Credits feel"],
          colors: ["#4b0082", "#2f4f4f", "#cd853f"],
          motion: "slow fade",
        },
      ],
    };

    return sceneTemplates[style] || sceneTemplates.cinematic;
  };

  const generateVideo = async () => {
    if (!prompt.trim()) return;

    setIsProcessing(true);
    setVideoGenerated(false);
    setCurrentScene(0);

    try {
      setCurrentStep("Enhancing your prompt...");
      const enhanced = await enhancePrompt(prompt, style);
      setEnhancedPrompt(enhanced);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setCurrentStep("Segmenting into scenes...");
      const sceneData = await segmentScenes(enhanced);
      setScenes(sceneData);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setCurrentStep("Rendering video...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setVideoGenerated(true);
      setCurrentStep("");
      setIsPlaying(true);
      playVideo();
    } catch (error) {
      console.error("Error generating video:", error);
      setCurrentStep("Error generating video. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const drawScene = (ctx, scene, progress) => {
    const canvas = canvasRef.current;
    const w = canvas.width;
    const h = canvas.height;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    const colors = scene.colors || ["#1a1a2e", "#16213e", "#0f3460"];
    colors.forEach((color, i) => {
      gradient.addColorStop(i / (colors.length - 1), color);
    });
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Apply style-specific effects
    switch (style) {
      case "cinematic":
        drawCinematicScene(ctx, scene, progress, w, h);
        break;
      case "animation":
        drawAnimationScene(ctx, scene, progress, w, h);
        break;
      case "realistic":
        drawRealisticScene(ctx, scene, progress, w, h);
        break;
      case "abstract":
        drawAbstractScene(ctx, scene, progress, w, h);
        break;
      case "retro":
        drawRetroScene(ctx, scene, progress, w, h);
        break;
    }

    // Scene description overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, h - 80, w, 80);
    ctx.fillStyle = "#ffffff";
    ctx.font = "16px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(scene.description, w / 2, h - 40);
  };

  const drawCinematicScene = (ctx, scene, progress, w, h) => {
    // Cinematic bars
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.fillRect(0, 0, w, h * 0.1);
    ctx.fillRect(0, h * 0.9, w, h * 0.1);

    // Lens flare effect
    const flareX = w * (0.3 + Math.sin(progress * Math.PI) * 0.4);
    const flareY = h * 0.3;
    const flareGrad = ctx.createRadialGradient(
      flareX,
      flareY,
      0,
      flareX,
      flareY,
      200
    );
    flareGrad.addColorStop(0, "rgba(255, 255, 200, 0.3)");
    flareGrad.addColorStop(1, "rgba(255, 255, 200, 0)");
    ctx.fillStyle = flareGrad;
    ctx.fillRect(0, 0, w, h);

    // Dynamic elements
    scene.elements.forEach((element, i) => {
      const x = w * (0.2 + i * 0.2) + Math.sin(progress * Math.PI * 2 + i) * 30;
      const y = h * (0.3 + i * 0.15) + Math.cos(progress * Math.PI + i) * 20;
      ctx.fillStyle = scene.colors[i % scene.colors.length] + "80";
      ctx.beginPath();
      ctx.arc(x, y, 40 + Math.sin(progress * 4 + i) * 10, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const drawAnimationScene = (ctx, scene, progress, w, h) => {
    // Bouncy animated elements
    scene.elements.forEach((element, i) => {
      const bounceHeight =
        Math.abs(Math.sin(progress * Math.PI * 4 + i * 0.5)) * 100;
      const x = w * (0.15 + i * 0.2);
      const y = h * 0.5 - bounceHeight;
      const size = 60 + Math.sin(progress * 6 + i) * 15;

      ctx.fillStyle = scene.colors[i % scene.colors.length];
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 4;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Squash and stretch effect
      ctx.save();
      ctx.translate(x, y + size + 5);
      ctx.scale(1 + bounceHeight / 200, 0.4);
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.8, size * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  };

  const drawRealisticScene = (ctx, scene, progress, w, h) => {
    // Depth of field blur simulation
    for (let layer = 0; layer < 3; layer++) {
      const blur = layer === 1 ? 0 : (2 - layer) * 3;
      const scale = 0.7 + layer * 0.15;
      const offsetY = (layer - 1) * 50;

      scene.elements.forEach((element, i) => {
        const x =
          w * (0.2 + i * 0.25) + Math.sin(progress * Math.PI + layer) * 20;
        const y = h * 0.5 + offsetY + Math.cos(progress * Math.PI * 0.5) * 15;

        ctx.save();
        ctx.filter = `blur(${blur}px)`;
        ctx.globalAlpha = layer === 1 ? 1 : 0.6;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, 80 * scale);
        grad.addColorStop(0, scene.colors[i % scene.colors.length]);
        grad.addColorStop(
          1,
          scene.colors[(i + 1) % scene.colors.length] + "40"
        );

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 80 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }
  };

  const drawAbstractScene = (ctx, scene, progress, w, h) => {
    // Geometric abstract shapes
    const shapes = ["triangle", "square", "circle", "hexagon"];

    scene.elements.forEach((element, i) => {
      const x =
        w * (0.15 + i * 0.22) + Math.sin(progress * Math.PI * 3 + i) * 60;
      const y =
        h * (0.3 + (i % 2) * 0.3) + Math.cos(progress * Math.PI * 2 + i) * 50;
      const size = 70 + Math.sin(progress * 5 + i) * 20;
      const rotation = progress * Math.PI * 2 + i;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = scene.colors[i % scene.colors.length] + "CC";
      ctx.strokeStyle = scene.colors[(i + 1) % scene.colors.length];
      ctx.lineWidth = 3;

      const shape = shapes[i % shapes.length];
      ctx.beginPath();

      if (shape === "circle") {
        ctx.arc(0, 0, size, 0, Math.PI * 2);
      } else if (shape === "square") {
        ctx.rect(-size, -size, size * 2, size * 2);
      } else if (shape === "triangle") {
        ctx.moveTo(0, -size);
        ctx.lineTo(size, size);
        ctx.lineTo(-size, size);
        ctx.closePath();
      } else if (shape === "hexagon") {
        for (let j = 0; j < 6; j++) {
          const angle = (Math.PI / 3) * j;
          const hx = Math.cos(angle) * size;
          const hy = Math.sin(angle) * size;
          if (j === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
      }

      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });
  };

  const drawRetroScene = (ctx, scene, progress, w, h) => {
    // Scan lines
    for (let y = 0; y < h; y += 4) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, y, w, 2);
    }

    // VHS-style color separation
    const offset = Math.sin(progress * Math.PI * 8) * 3;

    scene.elements.forEach((element, i) => {
      const x = w * (0.2 + i * 0.2) + Math.sin(progress * Math.PI + i) * 40;
      const y = h * 0.5 + Math.cos(progress * Math.PI * 2 + i) * 30;
      const size = 50;

      // Red channel
      ctx.fillStyle = "#ff000060";
      ctx.fillRect(x - size + offset, y - size, size * 2, size * 2);

      // Green channel
      ctx.fillStyle = "#00ff0060";
      ctx.fillRect(x - size, y - size, size * 2, size * 2);

      // Blue channel
      ctx.fillStyle = "#0000ff60";
      ctx.fillRect(x - size - offset, y - size, size * 2, size * 2);
    });

    // Vignette
    const vignette = ctx.createRadialGradient(
      w / 2,
      h / 2,
      0,
      w / 2,
      h / 2,
      w * 0.7
    );
    vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
    vignette.addColorStop(1, "rgba(0, 0, 0, 0.7)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);

    // Film grain
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() > 0.95) {
        const noise = Math.random() * 50;
        data[i] += noise;
        data[i + 1] += noise;
        data[i + 2] += noise;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  };

  const playVideo = () => {
    if (!scenes.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const sceneDuration = 3000; // 3 seconds per scene
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const totalDuration = scenes.length * sceneDuration;

      if (elapsed >= totalDuration) {
        setIsPlaying(false);
        setCurrentScene(0);
        return;
      }

      const sceneIndex = Math.floor(elapsed / sceneDuration);
      const sceneProgress = (elapsed % sceneDuration) / sceneDuration;

      setCurrentScene(sceneIndex);
      drawScene(ctx, scenes[sceneIndex], sceneProgress);

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 800;
      canvas.height = 450;

      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#666";
      ctx.font = "24px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "Your video will appear here",
        canvas.width / 2,
        canvas.height / 2
      );
    }
  }, []);

  useEffect(() => {
    if (isPlaying && videoGenerated && scenes.length) {
      playVideo();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, videoGenerated, scenes]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">
              AI Text-to-Video Generator
            </h1>
          </div>
          <p className="text-purple-200">
            Transform your ideas into stunning videos with AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Input */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-purple-400" />
                Your Prompt
              </h2>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the video you want to create... (e.g., 'A serene sunset over mountains with birds flying')"
                className="w-full h-32 bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              />

              <div className="mt-4">
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Style
                </label>
                <div className="space-y-2">
                  {styles.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        style === s.id
                          ? "bg-purple-500 text-white"
                          : "bg-white/5 text-purple-200 hover:bg-white/10"
                      }`}
                    >
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs opacity-80">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateVideo}
                disabled={isProcessing || !prompt.trim()}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                {isProcessing ? "Generating..." : "Generate Video"}
              </button>

              {currentStep && (
                <div className="mt-4 text-purple-200 text-sm text-center">
                  {currentStep}
                </div>
              )}
            </div>

            {enhancedPrompt && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-sm font-semibold text-purple-300 mb-2">
                  Enhanced Prompt
                </h3>
                <p className="text-sm text-purple-100">{enhancedPrompt}</p>
              </div>
            )}
          </div>

          {/* Right Panel - Video */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <canvas
                ref={canvasRef}
                className="w-full rounded-xl shadow-2xl"
                style={{ maxWidth: "100%", height: "auto" }}
              />

              {videoGenerated && (
                <div className="mt-4 flex items-center justify-center gap-4">
                  <button
                    onClick={togglePlayback}
                    className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600 transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>

                  <div className="text-purple-200 text-sm">
                    Scene {currentScene + 1} of {scenes.length}
                  </div>
                </div>
              )}
            </div>

            {scenes.length > 0 && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Scene Breakdown
                </h3>
                <div className="space-y-3">
                  {scenes.map((scene, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-lg transition-all ${
                        currentScene === i
                          ? "bg-purple-500/30 border-2 border-purple-400"
                          : "bg-white/5 border border-white/10"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium mb-2">
                            {scene.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {scene.elements.map((el, j) => (
                              <span
                                key={j}
                                className="text-xs bg-white/10 text-purple-200 px-2 py-1 rounded"
                              >
                                {el}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            {scene.colors.map((color, j) => (
                              <div
                                key={j}
                                className="w-6 h-6 rounded border-2 border-white/30"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToVideoAgent;
