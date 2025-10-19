import { useState } from "react";
import "./App.css";
import { RegisterExoplanetModal } from "./components/register-exoplanet-modal";
import { Navigation } from "./components/navigation";
import { HomePage } from "./components/pages/home-page";
import { CatalogPage } from "./components/pages/catalog-page";
import { ForumPage } from "./components/pages/forum-page";
import { ProfilePage } from "./components/pages/profile-page";

interface Exoplanet {
  id: number;
  name: string;
  type: string;
  star: string;
  distance: string;
  habitability: string;
  image: string;
  description: string;
}

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  replies: number;
  lastActivity: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "home" | "catalog" | "forum" | "profile"
  >("home");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const rockyPlanetImage = "/rocky-exoplanet.jpg";
  const gasGiantImage = "/gas-giant-exoplanet.jpg";

  const exoplanets: Exoplanet[] = [
    {
      id: 1,
      name: "Kepler-442b",
      type: "Super Terra",
      star: "Kepler-442",
      distance: "1,206 anos-luz",
      habitability: "Zona Habitável",
      image: rockyPlanetImage,
      description:
        "Um exoplaneta rochoso localizado na zona habitável de sua estrela.",
    },
    {
      id: 2,
      name: "HD 209458b",
      type: "Gigante Gasoso",
      star: "HD 209458",
      distance: "159 anos-luz",
      habitability: "Não Habitável",
      image: gasGiantImage,
      description: "Um dos primeiros exoplanetas descobertos em trânsito.",
    },
    {
      id: 3,
      name: "TRAPPIST-1e",
      type: "Terrestre",
      star: "TRAPPIST-1",
      distance: "40 anos-luz",
      habitability: "Potencialmente Habitável",
      image: rockyPlanetImage,
      description:
        "Parte do famoso sistema TRAPPIST-1 com sete planetas terrestres.",
    },
  ];

  const forumTopics: ForumTopic[] = [
    {
      id: 1,
      title: "Descoberta de água em Kepler-442b",
      author: "Dr. Silva",
      replies: 23,
      lastActivity: "2 horas atrás",
    },
    {
      id: 2,
      title: "Métodos de detecção de exoplanetas",
      author: "AstroFan2024",
      replies: 15,
      lastActivity: "5 horas atrás",
    },
    {
      id: 3,
      title: "Sistema TRAPPIST-1: Análise completa",
      author: "ExoPlanetHunter",
      replies: 42,
      lastActivity: "1 dia atrás",
    },
  ];

  return (
    <div className="min-h-screen space-bg text-white">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRegister={() => setShowRegisterModal(true)}
      />

      {activeTab === "home" && (
        <HomePage
          exoplanets={exoplanets}
          onRegister={() => setShowRegisterModal(true)}
        />
      )}
      {activeTab === "catalog" && <CatalogPage exoplanets={exoplanets} />}
      {activeTab === "forum" && <ForumPage topics={forumTopics} />}
      {activeTab === "profile" && <ProfilePage exoplanets={exoplanets} />}

      <RegisterExoplanetModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
    </div>
  );
}
