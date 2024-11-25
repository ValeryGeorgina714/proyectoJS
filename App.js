import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Agregar estado para la contraseña
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Credenciales predefinidas almacenadas directamente
  const credentials = [
    { username: 'Josue Ayala', password: '123456' },
    { username: 'Valery Pinto', password: '123456' }
  ];

  // Estados para el formulario de contacto
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const topics = [
    {
      title: 'Aprendizaje Automático',
      description: 'Descubre cómo las máquinas aprenden a partir de datos.',
      details: 'El aprendizaje automático utiliza algoritmos para predecir y analizar.',
      images: ['/imagenes/img15.jpg', '/imagenes/img14.jpg', '/imagenes/img17.jpg'],
    },
    {
      title: 'Procesamiento de Lenguaje Natural',
      description: 'Explora cómo las máquinas entienden lenguaje humano.',
      details: 'El PLN habilita tareas como análisis de sentimientos y traducción automática.',
      images: ['/imagenes/img13.jpg', '/imagenes/img8.jpg'],
    },
    {
      title: 'Visión por Computadora',
      description: 'Aprende cómo las máquinas analizan imágenes y videos para reconocer objetos, rostros y más.',
      details: 'La visión por computadora permite a las máquinas analizar contenido visual para identificar patrones, objetos y realizar tareas como detección de rostros y análisis de imágenes médicas.',
      images: ['/imagenes/img10.jpg', '/imagenes/img9.jpg', '/imagenes/img2.jpg'],
    },
    {
      title: 'Redes Neuronales',
      description: 'Conoce los fundamentos de las redes neuronales y su impacto en el avance de la inteligencia artificial.',
      details: 'Las redes neuronales son modelos inspirados en el cerebro humano, compuestos por capas que procesan información para resolver problemas complejos.',
      images: ['/imagenes/img7.jpg', '/imagenes/img2.jpg'],
    },
  ];

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObject = {
        text: newComment,
        likes: 0,
        isNew: true,
      };

      setComments((prevComments) => [...prevComments, newCommentObject]);

      setTimeout(() => {
        setComments((prevComments) =>
          prevComments.map((comment, index) =>
            index === prevComments.length - 1 ? { ...comment, isNew: false } : comment
          )
        );
      }, 500);

      setNewComment('');
    }
  };

  const handleLike = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].likes += 1; // contador
    setComments(updatedComments);
  };

  const handleEdit = (index) => {
    const updatedComment = prompt("Edita tu comentario:", comments[index].text);
    if (updatedComment !== null) {
      const updatedComments = [...comments];
      updatedComments[index].text = updatedComment;
      setComments(updatedComments);
    }
  };

  const handleDelete = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    // Comprobamos si las credenciales coinciden
    const user = credentials.find(
      (cred) => cred.username === username && cred.password === password
    );

    if (user) {
      setIsLoggedIn(true);
      setUsername(user.username); // Establece el nombre de usuario después del login exitoso
    } else {
      setErrorMessage('Credenciales incorrectas. Intenta nuevamente.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword(''); // Limpiar la contraseña al cerrar sesión
  };

  const openSlider = (topic) => {
    setSelectedTopic(topic);
    setCurrentImageIndex(0);
    setIsSliderOpen(true);
  };

  const closeSlider = () => setIsSliderOpen(false);

  const showNextImage = () => {
    if (selectedTopic) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % selectedTopic.images.length
      );
    }
  };

  const showPrevImage = () => {
    if (selectedTopic) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex - 1 + selectedTopic.images.length) % selectedTopic.images.length
      );
    }
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage('Por favor, completa todos los campos.');
      setSuccessMessage('');
    } else {
      setSuccessMessage('Mensaje enviado exitosamente.');
      setErrorMessage('');
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-form">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Asegurarse de que el valor sea controlado
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={password} // Asegurarse de que el valor sea controlado
                onChange={(e) => setPassword(e.target.value)} // Asegurarse de que el valor sea controlado
                required
              />
            </div>
            <button type="submit">Ingresar</button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">IA Explorer</div>
        <div className="navbar-user">
          <span>Bienvenido, {username}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* Header */}
      <header className="header">
        <h1>Explora Temas de Inteligencia Artificial</h1>
      </header>

      {/* Galería de Imágenes */}
      <div className="gallery-section" id="galeria">
        <h2>Galería de Imágenes</h2>
        <div className="gallery-grid">
          <img src="/imagenes/img1.jpg" alt="Imagen 1" />
          <img src="/imagenes/img2.jpg" alt="Imagen 2" />
          <img src="/imagenes/img3.jpg" alt="Imagen 3" />
          <img src="/imagenes/img5.jpg" alt="Imagen 4" />
        </div>
      </div>

      {/* Sección de Temas de IA */}
      <div className="topics-section" id="temas">
        <h2>Temas de Inteligencia Artificial</h2>
        <div className="topics-grid">
          {topics.map((topic, index) => (
            <div className="topic-card" key={index}>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <button onClick={() => openSlider(topic)}>Leer Más</button>
            </div>
          ))}
        </div>
      </div>

      {isSliderOpen && selectedTopic && (
        <div className="slider">
          <div className="slider-content">
            <h2>{selectedTopic.title}</h2>
            <p>{selectedTopic.details}</p>
            <div className="carousel">
              <button onClick={showPrevImage}>&lt;</button>
              <img
                src={selectedTopic.images[currentImageIndex]}
                alt={`Slide ${currentImageIndex + 1}`}
                className="carousel-image"
              />
              <button onClick={showNextImage}>&gt;</button>
            </div>
            <button onClick={closeSlider}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Foro con Comentarios */}
      <div className="forum-section" id="foro">
        <h2>Foro de Discusión</h2>
        <div className="comments-container">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment-card">
                <div className="comment-header">
                  <span>Comentario #{index + 1}</span>
                  <div className="comment-actions">
                    <button onClick={() => handleLike(index)}>👍 {comment.likes}</button>
                    <button onClick={() => handleEdit(index)}>✏️ Editar</button>
                    <button onClick={() => handleDelete(index)}>🗑️ Eliminar</button>
                  </div>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))
          ) : (
            <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
          )}
        </div>
        <div className="comment-form">
          <input
            type="text"
            placeholder="Escribe un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Enviar</button>
        </div>
      </div>

      {/* Formulario de Contacto */}
      <div className="contact-form-section" id="contacto">
        <h2>Formulario de Contacto</h2>
        <form onSubmit={handleContactSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí"
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Valery Pinto & Josue Ayala</p>
      </footer>
    </div>
  );
}

export default App;
