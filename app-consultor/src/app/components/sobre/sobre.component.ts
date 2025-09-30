import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sobre-container">
      <div class="hero-section">
        <h1>Sobre o Sistema de Consultores</h1>
        <p class="hero-subtitle">
          Uma plataforma completa para gerenciamento de consultores especializados
        </p>
      </div>

      <div class="content-section">
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">👥</div>
            <h3>Gerenciamento Completo</h3>
            <p>Sistema CRUD completo para cadastrar, visualizar, editar e excluir consultores com facilidade.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔐</div>
            <h3>Controle de Acesso</h3>
            <p>Sistema de autenticação com diferentes níveis de permissão para administradores e usuários comuns.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3>Filtros Avançados</h3>
            <p>Busque consultores por área de atuação, disponibilidade, nome ou email de forma intuitiva.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>Interface Responsiva</h3>
            <p>Design moderno e responsivo que funciona perfeitamente em desktop, tablet e mobile.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Performance</h3>
            <p>Aplicação Angular otimizada com carregamento rápido e experiência fluida para o usuário.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🛡️</div>
            <h3>Segurança</h3>
            <p>Guards de rota e controle de permissões garantem que apenas usuários autorizados acessem funcionalidades específicas.</p>
          </div>
        </div>

        <div class="tech-section">
          <h2>Tecnologias Utilizadas</h2>
          <div class="tech-grid">
            <div class="tech-item">
              <strong>Angular 18</strong>
              <span>Framework principal com Standalone Components</span>
            </div>
            <div class="tech-item">
              <strong>TypeScript</strong>
              <span>Linguagem de programação tipada</span>
            </div>
            <div class="tech-item">
              <strong>Reactive Forms</strong>
              <span>Formulários reativos para validação robusta</span>
            </div>
            <div class="tech-item">
              <strong>RxJS</strong>
              <span>Programação reativa e gerenciamento de estado</span>
            </div>
            <div class="tech-item">
              <strong>CSS Grid & Flexbox</strong>
              <span>Layout moderno e responsivo</span>
            </div>
            <div class="tech-item">
              <strong>Guards de Rota</strong>
              <span>Proteção e controle de acesso às rotas</span>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h2>Funcionalidades do Sistema</h2>
          
          <div class="role-info">
            <h3>👨‍💼 Administrador</h3>
            <ul>
              <li>Visualizar lista completa de consultores</li>
              <li>Adicionar novos consultores</li>
              <li>Editar informações de consultores existentes</li>
              <li>Excluir consultores do sistema</li>
              <li>Acesso completo a todas as funcionalidades</li>
            </ul>
            <div class="credentials">
              <strong>Credenciais:</strong> admin&#64;empresa.com / admin123
            </div>
          </div>

          <div class="role-info">
            <h3>👤 Usuário Comum</h3>
            <ul>
              <li>Visualizar lista de consultores</li>
              <li>Filtrar consultores por área e disponibilidade</li>
              <li>Buscar consultores por nome ou email</li>
              <li>Visualizar detalhes completos dos consultores</li>
            </ul>
            <div class="credentials">
              <strong>Credenciais:</strong> user&#64;empresa.com / user123
            </div>
          </div>
        </div>

        <div class="architecture-section">
          <h2>Arquitetura Angular</h2>
          <div class="architecture-grid">
            <div class="arch-item">
              <h4>Services</h4>
              <p>AuthService e ConsultorService para gerenciamento de dados e autenticação</p>
            </div>
            <div class="arch-item">
              <h4>Components</h4>
              <p>Comunicação pai-filho com &#64;Input() e &#64;Output() + EventEmitter</p>
            </div>
            <div class="arch-item">
              <h4>Guards</h4>
              <p>AuthGuard e AdminGuard para proteção de rotas</p>
            </div>
            <div class="arch-item">
              <h4>Forms</h4>
              <p>Reactive Forms com validação robusta e feedback visual</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sobre-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .hero-section {
      text-align: center;
      padding: 60px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
      margin-bottom: 40px;
    }

    .hero-section h1 {
      font-size: 3rem;
      margin-bottom: 20px;
      font-weight: 700;
    }

    .hero-subtitle {
      font-size: 1.3rem;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }

    .content-section {
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-bottom: 50px;
    }

    .feature-card {
      text-align: center;
      padding: 30px 20px;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 20px;
    }

    .feature-card h3 {
      color: #333;
      margin-bottom: 15px;
      font-size: 1.3rem;
    }

    .feature-card p {
      color: #666;
      line-height: 1.6;
    }

    .tech-section {
      margin-bottom: 50px;
    }

    .tech-section h2 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
      font-size: 2rem;
    }

    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .tech-item {
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }

    .tech-item strong {
      display: block;
      color: #333;
      font-size: 1.1rem;
      margin-bottom: 5px;
    }

    .tech-item span {
      color: #666;
      font-size: 0.9rem;
    }

    .info-section {
      margin-bottom: 50px;
    }

    .info-section h2 {
      text-align: center;
      color: #333;
      margin-bottom: 40px;
      font-size: 2rem;
    }

    .role-info {
      background: #f8f9fa;
      padding: 30px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .role-info h3 {
      color: #333;
      margin-bottom: 20px;
      font-size: 1.4rem;
    }

    .role-info ul {
      margin-bottom: 20px;
      padding-left: 20px;
    }

    .role-info li {
      margin-bottom: 10px;
      color: #555;
      line-height: 1.5;
    }

    .credentials {
      background: #e9ecef;
      padding: 15px;
      border-radius: 6px;
      font-family: 'Courier New', monospace;
      color: #495057;
    }

    .architecture-section h2 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
      font-size: 2rem;
    }

    .architecture-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
    }

    .arch-item {
      background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
      padding: 25px;
      border-radius: 8px;
      border: 1px solid #e9ecef;
    }

    .arch-item h4 {
      color: #333;
      margin-bottom: 15px;
      font-size: 1.2rem;
    }

    .arch-item p {
      color: #666;
      line-height: 1.6;
      margin: 0;
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }

      .content-section {
        padding: 20px;
      }

      .feature-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class SobreComponent {}