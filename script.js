document.addEventListener('DOMContentLoaded', () => {
  const STORAGE = 'siged_saas_v6';
  const defaultData = () => ({
    currentSchoolId: null,
    currentUserId: null,
    schools: [],
    classes: [],
    teachers: [],
    students: [],
    guardians: [],
    mockUsers: [],
    teacherAssignments: [],
    calendars: [],
    activities: [],
    certificates: [],
    occurrences: [],
    users: [],
    jobs: [],
    candidates: [],
    employees: [],
    payrollRuns: [],
    substitutes: [],
    benefits: [],
    leaves: [],
    terminations: [],
    trainings: [],
    evaluations: [],
    careerPlans: [],
    climateSurveys: [],
    wellbeing: [],
    safety: [],
    unions: [],
    lgpd: [],
    ethicsCases: [],
    interns: [],
    announcements: [],
    notifications: [],
    serviceRequests: [],
    appointments: [],
    queueTickets: [],
    academicPeriods: [],
    enrollmentRequests: [],
    spaces: [],
    assets: [],
    library: [],
    transportRoutes: [],
    transportVehicles: [],
    transportDrivers: [],
    meals: [],
    mealStock: [],
    healthRecords: [],
    aeeRecords: [],
    financeRecords: [],
    publicFunds: [],
    publicExpenses: [],
    documentIssuances: [],
    studentDocuments: [],
    contactLogs: [],
    lessonPlans: [],
    lessonRecords: [],
    grades: [],
    trackingRecords: [],
    classCouncils: [],
    schoolCouncil: [],
    inventory: [],
    auditLog: [],
    diesInspections: [],
    diesIrregularities: [],
    diesDocuments: [],
    diesComplaints: [],
    diesNotifications: [],
    diesConfig: null,
    matrizes: [],
    eduConfig: null,
    eduNotifications: [],
    userAccess: {},
    permissions: {}
  });

  const load = () => {
    try { return { ...defaultData(), ...JSON.parse(localStorage.getItem(STORAGE) || '{}') }; }
    catch { return defaultData(); }
  };
  const state = load();
  const save = () => {
    try { localStorage.setItem(STORAGE, JSON.stringify(state)); }
    catch (err) {
      console.error('Falha ao salvar no localStorage', err);
      showToast('Não foi possível salvar: o armazenamento do navegador está cheio. Tente remover algum anexo grande e salvar novamente.');
    }
  };

  const roles = {
    direcao: {
      name: 'Direção / Administrador', sector: 'Direção Escolar', icon: 'fa-user-tie',
      description: 'Gestão institucional, indicadores, pessoas, estrutura, financeiro, decisões, relatórios, permissões e configurações.',
      menu: [
        ['VISÃO GERAL','dashboard','fa-chart-pie','Visão geral'],
        ['APROVAÇÕES','jobs','fa-bullhorn','Aprovação de vagas'],
        ['APROVAÇÕES','employees','fa-sack-dollar','Confirmação financeira e acessos'],
        ['ACOMPANHAMENTO PEDAGÓGICO','atRisk','fa-heart-circle-exclamation','Alunos em acompanhamento'],
        ['ACOMPANHAMENTO PEDAGÓGICO','classCouncils','fa-users-rectangle','Conselho de classe'],
        ['ESCOLA E ESTRUTURA','schools','fa-school','Dados da escola'],
        ['ESCOLA E ESTRUTURA','spaces','fa-building','Estrutura física'],
        ['GESTÃO DO SISTEMA','users','fa-user-shield','Usuários e perfis'],
        ['GESTÃO DO SISTEMA','permissions','fa-lock','Permissões por perfil'],
        ['GESTÃO DO SISTEMA','auditLog','fa-magnifying-glass-chart','Auditoria'],
        ['GESTÃO DO SISTEMA','settings','fa-gear','Configurações'],
        ['FINANCEIRO','financeRecords','fa-sack-dollar','Financeiro'],
        ['SERVIÇOS ESCOLARES','library','fa-book','Biblioteca'],
        ['SERVIÇOS ESCOLARES','transportRoutes','fa-bus','Transporte'],
        ['SERVIÇOS ESCOLARES','meals','fa-utensils','Alimentação escolar'],
        ['SERVIÇOS ESCOLARES','healthRecords','fa-notes-medical','Saúde e apoio escolar'],
        ['SERVIÇOS ESCOLARES','assets','fa-boxes-stacked','Estoque e patrimônio'],
        ['COMUNICAÇÃO','announcements','fa-bullhorn','Comunicados institucionais'],
        ['CALENDÁRIO','calendar','fa-calendar-days','Calendário institucional'],
        ['CONSULTAS','reports','fa-chart-line','Indicadores e relatórios']
      ]
    },
    secretaria: {
      name: 'Secretaria Escolar', sector: 'Secretaria — Gestão e Atendimento', icon: 'fa-building-columns',
      description: 'Perfil único da secretaria: matrículas, turmas, notas, frequência, documentos, atendimento, protocolos e comunicação com famílias.',
      menu: [
        ['INÍCIO','dashboard','fa-house','Painel da secretaria'],
        ['ANO LETIVO','academicPeriods','fa-calendar-check','Ano letivo e períodos'],
        ['ESTRUTURA ESCOLAR','schools','fa-school','Dados da escola'],
        ['ESTRUTURA ESCOLAR','classes','fa-people-roof','Turmas e séries'],
        ['ESTRUTURA ESCOLAR','curriculum','fa-book-open','Matrizes curriculares'],
        ['ESTRUTURA ESCOLAR','schedule','fa-clock','Grade de horários'],
        ['ATENDIMENTO','serviceRequests','fa-ticket','Solicitações e protocolos'],
        ['ATENDIMENTO','appointments','fa-calendar-check','Agendamentos'],
        ['ATENDIMENTO','queueTickets','fa-list-ol','Fila de atendimento'],
        ['ATENDIMENTO','contactLogs','fa-phone-volume','Central de atendimento'],
        ['VIDA ACADÊMICA','enrollmentRequests','fa-user-pen','Matrículas e transferências'],
        ['VIDA ACADÊMICA','diaryBook','fa-book-journal-whills','Diário de classe'],
        ['VIDA ACADÊMICA','attendance','fa-clipboard-check','Frequência'],
        ['VIDA ACADÊMICA','gradebook','fa-marker','Notas'],
        ['VIDA ACADÊMICA','reportCard','fa-file-lines','Boletim'],
        ['VIDA ACADÊMICA','documents','fa-folder-open','Documentação acadêmica'],
        ['DOCUMENTOS','documentIssuances','fa-file-export','Emissão rápida de documentos'],
        ['DOCUMENTOS','studentDocuments','fa-folder-open','Gestão documental'],
        ['DOCUMENTOS','certificates','fa-file-medical','Atestados'],
        ['DOCUMENTOS','occurrences','fa-clipboard-list','Ocorrências'],
        ['PEDAGÓGICO','atRisk','fa-heart-circle-exclamation','Alunos em acompanhamento'],
        ['PEDAGÓGICO','classCouncils','fa-users-rectangle','Conselho de classe'],
        ['PESSOAS','teachers','fa-chalkboard-user','Professores'],
        ['PESSOAS','assignments','fa-diagram-project','Distribuição de professores'],
        ['PESSOAS','students','fa-user-graduate','Alunos'],
        ['PESSOAS','guardians','fa-people-roof','Responsáveis'],
        ['COMUNICAÇÃO','announcements','fa-bullhorn','Comunicação com famílias'],
        ['CALENDÁRIO','calendar','fa-calendar-days','Calendários escolares'],
        ['CONSULTAS','reports','fa-file-lines','Relatórios']
      ]
    },
    professor: {
      name: 'Portal do Professor', sector: 'Professor', icon: 'fa-chalkboard-user',
      description: 'Diário, frequência, notas, planejamento, conteúdos, comunicação, ocorrências e calendário das suas turmas.',
      menu: [
        ['INÍCIO','dashboard','fa-house','Painel do professor'],
        ['MINHAS TURMAS','classes','fa-people-roof','Turmas'],
        ['MINHAS TURMAS','schedule','fa-clock','Horários'],
        ['VIDA ACADÊMICA','diaryBook','fa-book-journal-whills','Diário de classe'],
        ['VIDA ACADÊMICA','attendance','fa-clipboard-check','Frequência'],
        ['VIDA ACADÊMICA','gradebook','fa-marker','Notas'],
        ['VIDA ACADÊMICA','lessonPlans','fa-list-check','Planejamento de aulas'],
        ['COMUNICAÇÃO','occurrences','fa-clipboard-list','Ocorrências'],
        ['COMUNICAÇÃO','announcements','fa-bullhorn','Comunicados'],
        ['CALENDÁRIO','calendar','fa-calendar-days','Calendário escolar']
      ]
    },
    aluno: {
      name: 'Portal do Aluno', sector: 'Aluno', icon: 'fa-user-graduate',
      description: 'Boletim, notas, frequência, horários, calendário, documentos, solicitações e comunicados.',
      menu: [
        ['INÍCIO','dashboard','fa-house','Painel do aluno'],
        ['MINHA VIDA ESCOLAR','reportCard','fa-file-lines','Boletim'],
        ['MINHA VIDA ESCOLAR','attendance','fa-clipboard-check','Frequência'],
        ['MINHA VIDA ESCOLAR','schedule','fa-clock','Horários'],
        ['MINHA VIDA ESCOLAR','calendar','fa-calendar-days','Calendário'],
        ['SERVIÇOS','serviceRequests','fa-ticket','Minhas solicitações'],
        ['SERVIÇOS','studentDocuments','fa-folder-open','Meus documentos'],
        ['COMUNICAÇÃO','announcements','fa-bullhorn','Comunicados']
      ]
    },
    responsavel: {
      name: 'Portal do Responsável', sector: 'Responsável', icon: 'fa-house-user',
      description: 'Filhos vinculados, boletim, frequência, ocorrências, agenda, comunicados, documentos, solicitações e financeiro.',
      menu: [
        ['INÍCIO','dashboard','fa-house','Painel do responsável'],
        ['MEUS FILHOS','reportCard','fa-file-lines','Boletim'],
        ['MEUS FILHOS','attendance','fa-clipboard-check','Frequência'],
        ['ACOMPANHAMENTO','occurrences','fa-clipboard-list','Ocorrências'],
        ['ACOMPANHAMENTO','calendar','fa-calendar-days','Calendário'],
        ['SERVIÇOS','serviceRequests','fa-ticket','Solicitações'],
        ['SERVIÇOS','financeRecords','fa-sack-dollar','Financeiro'],
        ['COMUNICAÇÃO','announcements','fa-bullhorn','Comunicados']
      ]
    },
    educacao: {
      name: 'Departamento de Educação', sector: 'Operador de Educação', icon: 'fa-landmark',
      description: 'Acompanha toda a rede: escolas, usuários, indicadores pedagógicos, calendários, relatórios, pendências e auditoria.',
      menu: [
        ['INÍCIO','dashboard','fa-house','Painel geral'],
        ['GESTÃO DA REDE','eduSchools','fa-school','Gestão de escolas'],
        ['GESTÃO DA REDE','eduMatrizes','fa-sitemap','Matrizes'],
        ['GESTÃO DA REDE','eduUsers','fa-users-gear','Usuários e acessos'],
        ['ACOMPANHAMENTO','eduPedagogy','fa-chart-column','Acompanhamento pedagógico'],
        ['ACOMPANHAMENTO','eduCalendar','fa-calendar-days','Calendário escolar'],
        ['ACOMPANHAMENTO','eduReports','fa-file-lines','Relatórios e estatísticas'],
        ['ACOMPANHAMENTO','eduPending','fa-bell','Pendências e notificações'],
        ['SEGURANÇA','eduAudit','fa-shield-halved','Histórico de atividades']
      ]
    },
    dies: {
      name: 'DIES — Inspeção Escolar', sector: 'Departamento de Inspeção Escolar', icon: 'fa-clipboard-user',
      description: 'Acompanha, fiscaliza e verifica a regularidade das escolas: inspeções, documentos, irregularidades, denúncias e relatórios.',
      menu: [
        ['INÍCIO','dashboard','fa-house','Painel do DIES'],
        ['REDE ESCOLAR','diesSchools','fa-school','Escolas'],
        ['INSPEÇÃO','dies','fa-clipboard-user','Inspeções'],
        ['INSPEÇÃO','diesIrreg','fa-triangle-exclamation','Irregularidades'],
        ['INSPEÇÃO','diesComplaints','fa-bullhorn','Denúncias e apurações'],
        ['DOCUMENTAÇÃO','diesDocs','fa-folder-open','Documentos escolares'],
        ['DOCUMENTAÇÃO','diesConsist','fa-scale-balanced','Consistência dos registros'],
        ['ACOMPANHAMENTO','diesNotif','fa-bell','Notificações e prazos'],
        ['ACOMPANHAMENTO','diesReports','fa-file-lines','Relatórios'],
        ['ACOMPANHAMENTO','auditLog','fa-magnifying-glass-chart','Histórico de operações'],
        ['CONFIGURAÇÃO','diesConfig','fa-sliders','Checklist e prazos']
      ]
    },
    rh: {
      name: 'Recursos Humanos', sector: 'RH — Pessoas', icon: 'fa-people-arrows',
      description: 'Conduz todo o ciclo de RH: recrutamento, departamento pessoal, desenvolvimento, clima, compliance e ética.',
      menu: [
        ['INÍCIO','dashboard','fa-house','Painel de RH'],
        ['RECRUTAMENTO','jobs','fa-bullhorn','Vagas abertas'],
        ['RECRUTAMENTO','candidates','fa-user-check','Candidatos'],
        ['RECRUTAMENTO','substitutes','fa-user-clock','Banco de substitutos'],
        ['DEPARTAMENTO PESSOAL','employees','fa-id-card','Funcionários'],
        ['DEPARTAMENTO PESSOAL','hrProfile','fa-address-card','Ficha funcional e contratos'],
        ['DEPARTAMENTO PESSOAL','payroll','fa-sack-dollar','Folha de pagamento'],
        ['DEPARTAMENTO PESSOAL','benefits','fa-hand-holding-heart','Benefícios e bolsas'],
        ['DEPARTAMENTO PESSOAL','leaves','fa-bed-pulse','Afastamentos e licenças'],
        ['DEPARTAMENTO PESSOAL','terminations','fa-file-signature','Rescisões e homologações'],
        ['DESENVOLVIMENTO','trainings','fa-chalkboard','Treinamentos e formação'],
        ['DESENVOLVIMENTO','evaluations','fa-star-half-stroke','Avaliação de desempenho'],
        ['DESENVOLVIMENTO','careerPlans','fa-stairs','Plano de carreira (PCCS)'],
        ['CLIMA E BEM-ESTAR','climateSurveys','fa-face-smile','Pesquisa de clima'],
        ['CLIMA E BEM-ESTAR','wellbeing','fa-heart-pulse','Bem-estar e endomarketing'],
        ['SERVIÇOS ESCOLARES','aeeRecords','fa-hands-holding-child','Educação Especial (AEE)'],
        ['SERVIÇOS ESCOLARES','healthRecords','fa-briefcase-medical','Saúde e apoio escolar'],
        ['SERVIÇOS ESCOLARES','inventory','fa-boxes-stacked','Estoque'],
        ['SERVIÇOS ESCOLARES','transportVehicles','fa-bus','Transporte — veículos'],
        ['SERVIÇOS ESCOLARES','transportDrivers','fa-id-badge','Transporte — motoristas'],
        ['FINANCEIRO PÚBLICO','publicFunds','fa-hand-holding-dollar','Recursos'],
        ['FINANCEIRO PÚBLICO','publicExpenses','fa-file-invoice-dollar','Despesas'],
        ['GESTÃO DO SISTEMA','census','fa-clipboard-check','Censo Escolar'],
        ['COMPLIANCE','safety','fa-briefcase-medical','Segurança e medicina (SST)'],
        ['COMPLIANCE','unions','fa-scale-balanced','Sindicatos e CCT'],
        ['COMPLIANCE','lgpd','fa-shield-halved','Adequação à LGPD'],
        ['ÉTICA','ethicsCases','fa-user-secret','Ouvidoria e ética'],
        ['ÉTICA','interns','fa-user-graduate','Estagiários'],
        ['CONSULTAS','reports','fa-file-lines','Relatórios de RH']
      ]
    }
  };

  // ===== Sistema de permissões (simulado no front-end) =====
  const PERMISSION_MODULES = ['alunos','responsaveis','professores','funcionarios','turmas','matriculas','diario','frequencia','notas','boletim','coordenacao','ocorrencias','documentos','protocolos','biblioteca','transporte','alimentacao','estoque','patrimonio','saude','aee','rh','vagas','financeiro','comunicados','calendario','relatorios','censo','auditoria','permissoes','estrutura','dies','educacao'];
  const PAGE_MODULE_MAP = {
    schools:'estrutura', dies:'dies', eduMatrizes:'educacao', eduSchools:'educacao', eduUsers:'educacao', eduPedagogy:'educacao', eduCalendar:'educacao', eduReports:'educacao', eduPending:'educacao', eduAudit:'educacao', hrProfile:'rh', diesSchools:'dies', diesIrreg:'dies', diesComplaints:'dies', diesDocs:'dies', diesConsist:'dies', diesNotif:'dies', diesReports:'dies', diesConfig:'dies', spaces:'patrimonio', assets:'patrimonio',
    teachers:'professores', students:'alunos', users:'permissoes', permissions:'permissoes',
    classes:'turmas', curriculum:'turmas', schedule:'turmas',
    calendar:'calendario', academicPeriods:'calendario',
    reports:'relatorios', documents:'documentos', studentDocuments:'documentos', documentIssuances:'documentos',
    certificates:'documentos', occurrences:'ocorrencias', grades:'boletim', content:'diario', lessonPlans:'diario',
    jobs:'vagas', candidates:'rh', employees:'rh', payroll:'rh', substitutes:'rh', benefits:'rh', leaves:'rh', terminations:'rh',
    trainings:'rh', evaluations:'rh', careerPlans:'rh', climateSurveys:'rh', wellbeing:'rh', safety:'rh', unions:'rh', lgpd:'rh', ethicsCases:'rh', interns:'rh',
    announcements:'comunicados', serviceRequests:'protocolos', appointments:'protocolos', queueTickets:'protocolos', contactLogs:'protocolos',
    enrollmentRequests:'matriculas', library:'biblioteca', transportRoutes:'transporte', meals:'alimentacao',
    healthRecords:'saude', aeeRecords:'aee', financeRecords:'financeiro', publicFunds:'financeiro', publicExpenses:'financeiro', auditLog:'auditoria', inventory:'estoque',
    transportVehicles:'transporte', transportDrivers:'transporte', classCouncils:'coordenacao', atRisk:'coordenacao', census:'censo', globalSearch:'relatorios',
    guardians:'responsaveis', assignments:'professores', diaryBook:'diario', attendance:'frequencia', gradebook:'notas', reportCard:'boletim'
  };
  const FULL_ACCESS={view:true,create:true,edit:true,delete:true,approve:true,export:true};
  const VIEW_ONLY={view:true,create:false,edit:false,delete:false,approve:false,export:false};
  const NO_ACCESS={view:false,create:false,edit:false,delete:false,approve:false,export:false};
  function seedDefaultPermissions(){
    const matrix={};
    const allFull=()=>Object.fromEntries(PERMISSION_MODULES.map(m=>[m,{...FULL_ACCESS}]));
    matrix.direcao=allFull();
    matrix.secretaria_gestao=Object.fromEntries(PERMISSION_MODULES.map(m=>[m,{...NO_ACCESS}]));
    Object.assign(matrix.secretaria_gestao,{alunos:{...FULL_ACCESS,delete:false},responsaveis:{...FULL_ACCESS,delete:false},professores:{...FULL_ACCESS,delete:false},turmas:{...FULL_ACCESS,delete:false},matriculas:{...FULL_ACCESS,delete:false},documentos:{...FULL_ACCESS,delete:false},boletim:{...VIEW_ONLY,export:true},diario:VIEW_ONLY,frequencia:{...VIEW_ONLY,export:true},notas:{...VIEW_ONLY,export:true},ocorrencias:VIEW_ONLY,calendario:{...FULL_ACCESS,delete:false},relatorios:{...VIEW_ONLY,export:true},comunicados:{view:true,create:true,edit:true,delete:false,approve:false,export:false},estrutura:VIEW_ONLY,coordenacao:{...FULL_ACCESS,delete:false},censo:{...VIEW_ONLY,export:true}});
    matrix.secretaria_atendimento=Object.fromEntries(PERMISSION_MODULES.map(m=>[m,{...NO_ACCESS}]));
    Object.assign(matrix.secretaria_atendimento,{alunos:VIEW_ONLY,responsaveis:VIEW_ONLY,protocolos:{...FULL_ACCESS,delete:false},documentos:{...FULL_ACCESS,delete:false},comunicados:{view:true,create:true,edit:false,delete:false,approve:false,export:false},calendario:VIEW_ONLY,matriculas:VIEW_ONLY,relatorios:VIEW_ONLY});
    {const a1=matrix.secretaria_gestao,b1=matrix.secretaria_atendimento;
     matrix.secretaria=Object.fromEntries(PERMISSION_MODULES.map(m=>[m,Object.fromEntries(['view','create','edit','delete','approve','export'].map(k=>[k,!!(a1[m][k]||b1[m][k])]))]));
     delete matrix.secretaria_gestao;delete matrix.secretaria_atendimento;}
    matrix.rh=Object.fromEntries(PERMISSION_MODULES.map(m=>[m,{...NO_ACCESS}]));
    Object.assign(matrix.rh,{rh:{...FULL_ACCESS,delete:false},vagas:{view:true,create:true,edit:true,delete:false,approve:false,export:true},funcionarios:VIEW_ONLY,relatorios:{...VIEW_ONLY,export:true}});
    matrix.professor=Object.fromEntries(PERMISSION_MODULES.map(m=>[m,{...NO_ACCESS}]));
    Object.assign(matrix.professor,{turmas:VIEW_ONLY,alunos:VIEW_ONLY,diario:{view:true,create:true,edit:true,delete:false,approve:false,export:false},frequencia:{view:true,create:true,edit:true,delete:false,approve:false,export:false},notas:{view:true,create:true,edit:true,delete:false,approve:false,export:false},boletim:VIEW_ONLY,ocorrencias:{view:true,create:true,edit:true,delete:false,approve:false,export:false},calendario:VIEW_ONLY,comunicados:VIEW_ONLY});
    matrix.aluno=Object.fromEntries(PERMISSION_MODULES.map(m=>[m,{...NO_ACCESS}]));
    Object.assign(matrix.aluno,{boletim:VIEW_ONLY,frequencia:VIEW_ONLY,calendario:VIEW_ONLY,documentos:VIEW_ONLY,protocolos:{view:true,create:true,edit:false,delete:false,approve:false,export:false},comunicados:VIEW_ONLY});
    matrix.responsavel=Object.fromEntries(PERMISSION_MODULES.map(m=>[m,{...NO_ACCESS}]));
    Object.assign(matrix.responsavel,{boletim:VIEW_ONLY,frequencia:VIEW_ONLY,ocorrencias:VIEW_ONLY,calendario:VIEW_ONLY,documentos:VIEW_ONLY,financeiro:VIEW_ONLY,protocolos:{view:true,create:true,edit:false,delete:false,approve:false,export:false},comunicados:VIEW_ONLY});
    matrix.dies=Object.fromEntries(PERMISSION_MODULES.map(m=>[m,{...NO_ACCESS}]));
    Object.assign(matrix.dies,{dies:{...FULL_ACCESS,delete:false},auditoria:{...VIEW_ONLY},relatorios:{...VIEW_ONLY,export:true}});
    matrix.educacao=Object.fromEntries(PERMISSION_MODULES.map(m=>[m,{...NO_ACCESS}]));
    Object.assign(matrix.educacao,{educacao:{...FULL_ACCESS,delete:false},estrutura:{...FULL_ACCESS,delete:false},auditoria:{...VIEW_ONLY},relatorios:{...VIEW_ONLY,export:true}});
    return matrix;
  }
  function can(module,action){
    if(!module)return true;
    const blocked=state.userAccess?.[state.currentUserId]?.blocked;
    if(blocked&&blocked.includes(module))return false;
    const roleMatrix=state.permissions?.[state.role];
    if(!roleMatrix)return state.role==='direcao';
    const modulePerms=roleMatrix[module];
    if(!modulePerms)return false;
    return !!modulePerms[action];
  }
  function denyToast(action){
    const labels={view:'visualizar',create:'criar',edit:'editar',delete:'excluir',approve:'aprovar',export:'exportar'};
    showToast(`Seu perfil não tem permissão para ${labels[action]||'realizar'} esta ação.`);
  }
  function currentUser(){ return (state.mockUsers||[]).find(u=>u.id===state.currentUserId) || null; }

  const curriculumTemplates = {
    '1º ano do Ensino Fundamental': [
      ['Língua Portuguesa',200,5],['Matemática',200,5],['Ciências',80,2],['História',80,2],['Geografia',80,2],['Arte',40,1],['Educação Física',80,2]
    ],
    '5º ano do Ensino Fundamental': [
      ['Língua Portuguesa',200,5],['Matemática',200,5],['Ciências',80,2],['História',80,2],['Geografia',80,2],['Arte',40,1],['Educação Física',80,2],['Ensino Religioso',40,1]
    ],
    '1º ano do Ensino Médio': [
      ['Língua Portuguesa',120,3],['Matemática',120,3],['Biologia',80,2],['Física',80,2],['Química',80,2],['História',80,2],['Geografia',80,2],['Filosofia',40,1],['Sociologia',40,1],['Língua Inglesa',80,2],['Educação Física',40,1]
    ],
    '2º ano do Ensino Médio': [
      ['Língua Portuguesa',120,3],['Matemática',120,3],['Biologia',80,2],['Física',80,2],['Química',80,2],['História',80,2],['Geografia',80,2],['Filosofia',40,1],['Sociologia',40,1],['Língua Inglesa',80,2],['Educação Física',40,1]
    ],
    '3º ano do Ensino Médio': [
      ['Língua Portuguesa',120,3],['Matemática',120,3],['Biologia',80,2],['Física',80,2],['Química',80,2],['História',80,2],['Geografia',80,2],['Filosofia',40,1],['Sociologia',40,1],['Língua Inglesa',80,2],['Educação Física',40,1]
    ]
  };

  const timeSlots = [
    ['1º','07:00','07:50'],['2º','07:50','08:40'],['3º','08:40','09:30'],['4º','09:50','10:40'],['5º','10:40','11:30'],['6º','11:30','12:20']
  ];
  const weekdays = ['Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira'];

  const loginForm = document.getElementById('loginForm');
  const loginScreen = document.getElementById('loginScreen');
  const app = document.getElementById('app');
  const sideMenu = document.getElementById('sideMenu');
  const content = document.getElementById('content');

  const ROLE_ICON={direcao:'fa-user-tie',secretaria:'fa-building-columns',educacao:'fa-landmark',rh:'fa-people-arrows',professor:'fa-chalkboard-user',aluno:'fa-user-graduate',responsavel:'fa-house-user',dies:'fa-clipboard-user'};
  const ROLE_LOGIN_LABEL={direcao:'Diretor(a)',secretaria:'Secretário(a) Escolar',educacao:'Operador(a) de Educação',rh:'Recursos Humanos',professor:'Professor(a)',aluno:'Aluno(a)',responsavel:'Responsável',dies:'Inspetor(a) do DIES'};
  function renderAccountCards(){
    const container=document.getElementById('roleCards');
    if(!container)return;
    const accounts=(state.mockUsers||[]);
    const tone={secretaria:'green',responsavel:'green',rh:'purple'};
    container.innerHTML=accounts.map(acc=>`<button type="button" class="lg-account lg-tone-${tone[acc.role]||'blue'}" data-account="${acc.id}"><span class="lg-acc-icon"><i class="fa-solid ${ROLE_ICON[acc.role]||'fa-user'}"></i></span><span class="lg-acc-body"><strong>${escapeHtml(ROLE_LOGIN_LABEL[acc.role]||roles[acc.role]?.name||acc.role)}</strong><em>${escapeHtml(acc.vinculoLabel||roles[acc.role]?.name||'')}</em><small>${escapeHtml(acc.email)}</small><small>senha: ${escapeHtml(acc.password)}</small></span><i class="fa-solid fa-chevron-right lg-acc-go"></i></button>`).join('');
    container.querySelectorAll('.lg-account').forEach(card=>card.addEventListener('click',()=>{
      container.querySelectorAll('.lg-account').forEach(x=>x.classList.remove('selected'));
      card.classList.add('selected');
      const acc=accounts.find(a=>a.id===card.dataset.account);
      if(acc){ document.getElementById('loginUser').value=acc.email; document.getElementById('loginPassword').value=acc.password; document.getElementById('loginAccountId').value=acc.id; hideLoginError(); }
    }));
  }
  document.getElementById('togglePassword')?.addEventListener('click',()=>{
    const inp=document.getElementById('loginPassword'),btn=document.getElementById('togglePassword');
    const show=inp.type==='password';inp.type=show?'text':'password';
    btn.setAttribute('aria-label',show?'Ocultar senha':'Mostrar senha');
    const ic=btn.querySelector('i');if(ic)ic.className=show?'fa-solid fa-eye-slash':'fa-solid fa-eye';
  });
  function hideLoginError(){ document.getElementById('loginError')?.classList.add('hidden'); }
  function showLoginError(msg){ const el=document.getElementById('loginError'); if(el){ el.querySelector('span').textContent=msg; el.classList.remove('hidden'); } }

  if (!roles[state.role]) {
    state.role = null;
    state.user = null;
    state.currentUserId = null;
    save();
  }

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('loginUser').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const account = (state.mockUsers||[]).find(u=>u.email.toLowerCase()===email && u.password===password);
    if(!account){ showLoginError('E-mail ou senha inválidos. Confira os dados ou escolha uma das contas de demonstração abaixo.'); return; }
    if(account.status!=='Ativo'){ showLoginError(`Esta conta está com status "${account.status}" e não pode acessar o sistema.`); return; }
    const accSchool=(state.schools||[]).find(x=>x.id===account.schoolId);
    if(accSchool&&!['educacao','dies'].includes(account.role)&&(accSchool.networkStatus||'Ativa')!=='Ativa'){ showLoginError(`A escola "${accSchool.name}" está ${accSchool.networkStatus.toLowerCase()} na rede e o acesso está indisponível. Procure o Departamento de Educação.`); return; }
    hideLoginError();
    state.user = account.name; state.role = account.role; state.currentUserId = account.id; state.currentSchoolId = account.schoolId;
    logAudit('Login','Acesso',`${account.name} entrou no sistema (${roles[account.role]?.name||account.role}).`);
    save();
    loginScreen.classList.add('hidden'); app.classList.remove('hidden');
    updateUser(); buildMenu(); navigate('dashboard'); wireTopbar(); updateNotifBadge();
  });

  document.getElementById('publicSchoolButton')?.addEventListener('click', () => openPublicSchoolRegistration());
  document.getElementById('schoolRegBack')?.addEventListener('click', () => {
    document.getElementById('schoolRegScreen').classList.add('hidden');
    loginScreen.classList.remove('hidden');
  });

  document.getElementById('logoutButton')?.addEventListener('click', () => {
    const acc=currentUser();
    if(acc) logAudit('Login','Encerramento de sessão',`${acc.name} saiu do sistema.`);
    save();
    app.classList.add('hidden'); loginScreen.classList.remove('hidden');
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginAccountId').value='';
    document.querySelectorAll('.lg-account').forEach(x=>x.classList.remove('selected'));
  });
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('closeSidebar')?.addEventListener('click', () => document.getElementById('sidebar')?.classList.remove('open'));
  document.getElementById('menuToggle')?.addEventListener('click', () => document.getElementById('sidebar')?.classList.toggle('open'));

  function updateUser() {
    const cfg = roles[state.role] || roles.direcao;
    const acc = currentUser();
    document.getElementById('sidebarUser').textContent = state.user;
    document.getElementById('topUserName').textContent = state.user;
    document.getElementById('sidebarRole').textContent = acc?.vinculoLabel ? `${cfg.name} · ${acc.vinculoLabel}` : cfg.name;
    document.getElementById('sidebarSector').textContent = cfg.sector;
  }

  function buildMenu() {
    const cfg = roles[state.role] || roles.direcao;
    sideMenu.innerHTML = '';
    let group = '';
    cfg.menu.forEach(([category,page,icon,title]) => {
      const moduleKey=PAGE_MODULE_MAP[page];
      if(moduleKey && !can(moduleKey,'view')) return;
      if (category !== group) { group = category; const label=document.createElement('div'); label.className='menu-label'; label.textContent=category; sideMenu.appendChild(label); }
      const btn=document.createElement('button'); btn.className='menu-item'; btn.dataset.page=page; btn.innerHTML=`<i class="fa-solid ${icon}"></i><span>${title}</span>`; btn.onclick=()=>navigate(page); sideMenu.appendChild(btn);
    });
  }

  function navigate(page) {
    document.querySelectorAll('.menu-item').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
    const cfg=roles[state.role]||roles.direcao;
    const item=cfg.menu.find(x=>x[1]===page);
    document.getElementById('pageTitle').textContent=item?.[3]||'SIGED';
    document.getElementById('breadcrumb').textContent=`SIGED / ${cfg.sector} / ${item?.[3]||'Painel'}`;
    const renderers={dashboard:renderDashboard,schools:renderSchools,classes:renderClasses,curriculum:renderCurriculum,calendar:renderCalendar,teachers:renderTeachers,students:renderStudents,guardians:renderGuardians,assignments:renderAssignments,diaryBook:renderDiaryBook,attendance:renderAttendance,gradebook:renderGradebook,reportCard:renderReportCard,users:renderUsers,reports:renderReports,documents:renderDocuments,certificates:renderCertificates,occurrences:renderOccurrences,grades:renderGrades,schedule:renderSchedule,content:renderContent,jobs:renderJobs,candidates:renderCandidates,employees:renderEmployees,payroll:renderPayroll,
      substitutes:()=>renderCrud(crudModules.substitutes),benefits:()=>renderCrud(crudModules.benefits),leaves:()=>renderCrud(crudModules.leaves),terminations:()=>renderCrud(crudModules.terminations),
      trainings:()=>renderCrud(crudModules.trainings),evaluations:()=>renderCrud(crudModules.evaluations),careerPlans:()=>renderCrud(crudModules.careerPlans),
      climateSurveys:()=>renderCrud(crudModules.climateSurveys),wellbeing:()=>renderCrud(crudModules.wellbeing),
      safety:()=>renderCrud(crudModules.safety),unions:()=>renderCrud(crudModules.unions),lgpd:()=>renderCrud(crudModules.lgpd),
      ethicsCases:()=>renderCrud(crudModules.ethicsCases),interns:()=>renderCrud(crudModules.interns),
      aeeRecords:()=>renderCrud(crudModules.aeeRecords),inventory:()=>renderCrud(crudModules.inventory),
      transportVehicles:()=>renderCrud(crudModules.transportVehicles),transportDrivers:()=>renderCrud(crudModules.transportDrivers),
      classCouncils:()=>renderCrud(crudModules.classCouncils),publicFunds:()=>renderCrud(crudModules.publicFunds),publicExpenses:()=>renderCrud(crudModules.publicExpenses),
      atRisk:renderAtRisk,dies:renderDiesInspections,eduMatrizes:renderEduMatrizes,eduSchools:renderEduSchools,eduUsers:renderEduUsers,eduPedagogy:renderEduPedagogy,eduCalendar:renderEduCalendar,eduReports:renderEduReports,eduPending:renderEduPending,eduAudit:renderEduAudit,hrProfile:renderHrProfile,diesSchools:renderDiesSchools,diesIrreg:renderDiesIrregularities,diesComplaints:renderDiesComplaints,diesDocs:renderDiesDocuments,diesConsist:renderDiesConsistency,diesNotif:renderDiesNotifications,diesReports:renderDiesReports,diesConfig:renderDiesConfig,census:renderCensus,globalSearch:renderGlobalSearch,
      academicPeriods:()=>renderCrud(crudModules.academicPeriods),enrollmentRequests:()=>renderCrud(crudModules.enrollmentRequests),
      spaces:()=>renderCrud(crudModules.spaces),assets:()=>renderCrud(crudModules.assets),library:()=>renderCrud(crudModules.library),
      transportRoutes:()=>renderCrud(crudModules.transportRoutes),meals:()=>renderCrud(crudModules.meals),healthRecords:()=>renderCrud(crudModules.healthRecords),
      financeRecords:()=>renderCrud(crudModules.financeRecords),studentDocuments:()=>renderCrud(crudModules.studentDocuments),
      contactLogs:()=>renderCrud(crudModules.contactLogs),lessonPlans:()=>renderCrud(crudModules.lessonPlans),
      announcements:()=>renderCrud(crudModules.announcements),appointments:()=>renderCrud(crudModules.appointments),
      serviceRequests:()=>renderCrud(crudModules.serviceRequests),documentIssuances:()=>renderCrud(crudModules.documentIssuances),
      auditLog:renderAuditLog,permissions:renderPermissions,queueTickets:renderQueue,settings:renderSettings};
    const mod=PAGE_MODULE_MAP[page];
    if(mod&&!can(mod,'view')){renderAccessDenied(item?.[3]||page);return;}
    try{ (renderers[page]||(()=>renderGeneric(page,item?.[3]||page)))(); }
    catch(err){
      console.error('Erro ao abrir a tela',page,err);
      content.innerHTML=`<div class="empty-state"><h3>Não foi possível abrir esta tela</h3><p>Ocorreu um erro inesperado. Volte ao painel e tente novamente; se continuar, avise o suporte.</p><button class="btn-primary" id="errHome">Voltar ao painel</button></div>`;
      document.getElementById('errHome')?.addEventListener('click',()=>navigate('dashboard'));
    }
  }

  function pageHeader(title,desc,actions='') { return `<div class="page-header"><div><h2>${title}</h2><p>${desc}</p></div><div class="page-actions">${actions}</div></div>`; }
  function statCard(title,value,icon){ return `<div class="stat-card"><div class="stat-icon"><i class="fa-solid ${icon}"></i></div><div><span>${title}</span><strong>${value}</strong></div></div>`; }
  function schoolForCurrent() { return state.schools.find(s=>s.id===state.currentSchoolId) || state.schools[0]; }
  function schoolOptions(selected='') { return state.schools.map(s=>`<option value="${s.id}" ${s.id===selected?'selected':''}>${escapeHtml(s.name)}</option>`).join(''); }
  function escapeHtml(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

  function renderDashboard() {
    if(state.role==='dies') return renderDiesDashboard();
    if(state.role==='educacao') return renderEduDashboard();
    const school=schoolForCurrent();
    const scopedClasses=school?state.classes.filter(c=>c.schoolId===school.id):[];
    const scopedStudents=school?state.students.filter(s=>s.schoolId===school.id):[];
    const scopedTeachers=school?state.teachers.filter(t=>t.schoolId===school.id):[];
    const byS=arr=>(state[arr]||[]).filter(x=>x.schoolId===school?.id);
    const cfg=roles[state.role]||roles.direcao;

    if(state.role==='secretaria'){
      const today=new Date(); const year=today.getFullYear();
      const pendingEnrollments=byS('enrollmentRequests').filter(r=>r.status==='Em análise'||r.status==='Pendente de documentos').length;
      content.innerHTML=`${pageHeader('Painel operacional', 'Tudo que a secretaria precisa para organizar o ano letivo e a vida acadêmica.', '<button class="btn-primary" id="quickClass"><i class="fa-solid fa-plus"></i> Criar turma</button>')}
        <div class="welcome-banner"><div><span class="eyebrow">Secretaria • Gestão Escolar</span><h2>${escapeHtml(school?.name||'Sua escola')}</h2><p>Organize estrutura, pessoas, horários e calendários em um único fluxo.</p></div><div class="welcome-metric"><strong>${year}</strong><span>Ano letivo atual</span></div></div>
        <div class="stat-grid">${statCard('Turmas',scopedClasses.length,'fa-people-roof')}${statCard('Alunos',scopedStudents.length,'fa-user-graduate')}${statCard('Professores',scopedTeachers.length,'fa-chalkboard-user')}${statCard('Matrículas/transferências pendentes',pendingEnrollments,'fa-user-pen')}</div>
        <div class="stat-grid">${statCard('Solicitações em aberto',byS('serviceRequests').filter(r=>r.status!=='Concluída'&&r.status!=='Cancelada').length,'fa-ticket')}${statCard('Agendamentos hoje',byS('appointments').filter(a=>a.date===todayIso()).length,'fa-calendar-check')}${statCard('Documentos emitidos',byS('documentIssuances').length,'fa-file-export')}</div>
        <div class="quick-grid"><button class="module-card action-card" data-page="classes"><div class="module-icon"><i class="fa-solid fa-people-roof"></i></div><h3>Montar turmas</h3><p>Crie a turma e carregue a matriz curricular automaticamente.</p><span>Gerenciar <i class="fa-solid fa-arrow-right"></i></span></button><button class="module-card action-card" data-page="schedule"><div class="module-icon"><i class="fa-solid fa-clock"></i></div><h3>Organizar horários</h3><p>Confira a grade semanal gerada e faça ajustes antes de publicar.</p><span>Ver grade <i class="fa-solid fa-arrow-right"></i></span></button><button class="module-card action-card" data-page="enrollmentRequests"><div class="module-icon"><i class="fa-solid fa-user-pen"></i></div><h3>Matrículas e transferências</h3><p>Acompanhe matrícula inicial, rematrícula, trancamentos e mais.</p><span>Abrir <i class="fa-solid fa-arrow-right"></i></span></button><button class="module-card action-card" data-page="academicPeriods"><div class="module-icon"><i class="fa-solid fa-calendar-check"></i></div><h3>Ano letivo</h3><p>Abra e encerre bimestres, trimestres e o ano letivo.</p><span>Abrir <i class="fa-solid fa-arrow-right"></i></span></button></div>`;
      document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>navigate(b.dataset.page));
      document.getElementById('quickClass')?.addEventListener('click',()=>openClassEditor());
      return;
    }

    if(state.role==='professor'){
      const asg=assignmentsForCurrentUser();
      const classIds=[...new Set(asg.map(a=>a.classId))];
      const myStudents=classIds.reduce((n,id)=>n+studentsOfClass(id).length,0);
      const per='3º Bimestre';
      const pendingGrades=asg.reduce((n,a)=>n+studentsOfClass(a.classId).filter(st=>{const g=findGrade(a.classId,a.subject,per,st.id);return !g||g.av1===null;}).length,0);
      const noLessonToday=asg.filter(a=>!(state.lessonRecords||[]).some(r=>r.classId===a.classId&&r.subject===a.subject&&r.date===todayIso())).length;
      const lowAtt=classIds.reduce((n,id)=>n+studentsOfClass(id).filter(st=>{const x=attendanceStats(st.id,id,null);return x.pct!==null&&x.pct<MIN_ATTENDANCE;}).length,0);
      content.innerHTML=`${pageHeader('Painel do Professor','Suas turmas, diário, notas e frequência.','<button class="btn-primary" id="quickDiary"><i class="fa-solid fa-plus"></i> Registrar aula</button>')}
        <div class="welcome-banner"><div><span class="eyebrow">Portal do Professor</span><h2>${escapeHtml(state.user||'')}</h2><p>${escapeHtml(school?.name||'')} — você vê somente as turmas e disciplinas atribuídas a você.</p></div></div>
        ${lowAtt?`<div class="alert alert-danger" role="alert"><i class="fa-solid fa-triangle-exclamation"></i> <div><strong>${lowAtt} aluno(s)</strong> das suas turmas estão com frequência abaixo de ${MIN_ATTENDANCE}%.</div></div>`:''}${noLessonToday?`<div class="alert alert-info"><i class="fa-solid fa-circle-info"></i> <div>${noLessonToday} turma(s)/disciplina(s) ainda sem chamada registrada hoje.</div></div>`:''}
        <div class="stat-grid">${statCard('Minhas turmas',classIds.length,'fa-people-roof')}${statCard('Minhas disciplinas',asg.length,'fa-book')}${statCard('Alunos atendidos',myStudents,'fa-user-graduate')}${statCard('Notas pendentes (3º bim.)',pendingGrades,'fa-marker')}</div>
        <div class="card"><div class="card-title"><div><h3>Minhas turmas e disciplinas</h3></div></div>${asg.length?`<div class="table-wrap"><table><thead><tr><th>Turma</th><th>Disciplina</th><th>Aulas/sem</th><th>Última aula</th></tr></thead><tbody>${asg.map(a=>{const last=(state.lessonRecords||[]).filter(r=>r.classId===a.classId&&r.subject===a.subject).map(r=>r.date).sort().pop();return `<tr><td>${escapeHtml(classLabel(classById(a.classId)))}</td><td>${escapeHtml(a.subject)}</td><td>${a.weeklyClasses}</td><td>${last?formatDate(last):'—'}</td></tr>`;}).join('')}</tbody></table></div>`:'<div class="empty-state">Nenhuma atribuição. Fale com a Secretaria.</div>'}</div>
        <div class="quick-grid"><button class="module-card action-card" data-page="attendance"><div class="module-icon"><i class="fa-solid fa-clipboard-check"></i></div><h3>Registrar frequência</h3><p>Chamada por turma e disciplina.</p><span>Abrir <i class="fa-solid fa-arrow-right"></i></span></button><button class="module-card action-card" data-page="gradebook"><div class="module-icon"><i class="fa-solid fa-marker"></i></div><h3>Lançar notas</h3><p>Avaliações, média e situação automáticas.</p><span>Abrir <i class="fa-solid fa-arrow-right"></i></span></button><button class="module-card action-card" data-page="diaryBook"><div class="module-icon"><i class="fa-solid fa-book-journal-whills"></i></div><h3>Registrar diário</h3><p>Conteúdo ministrado e chamada da aula.</p><span>Abrir <i class="fa-solid fa-arrow-right"></i></span></button><button class="module-card action-card" data-page="lessonPlans"><div class="module-icon"><i class="fa-solid fa-list-check"></i></div><h3>Planejar aula</h3><p>Objetivos, metodologia e recursos.</p><span>Abrir <i class="fa-solid fa-arrow-right"></i></span></button></div>`;
      document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>navigate(b.dataset.page));
      document.getElementById('quickDiary')?.addEventListener('click',()=>navigate('diaryBook'));
      return;
    }

    if(state.role==='aluno'||state.role==='responsavel'){
      const kid=selectedChild();
      const isGuardian=state.role==='responsavel';
      const title=isGuardian?'Painel do Responsável':'Painel do Aluno';
      if(!kid){content.innerHTML=`${pageHeader(title,'')}<div class="empty-state">Nenhum aluno vinculado a esta conta.</div>`;return;}
      const o=studentOverall(kid);
      const lowAtt=o.att.pct!==null&&o.att.pct<MIN_ATTENDANCE;
      const risk=riskReasons(kid);
      const notes=(state.notifications||[]).filter(n=>n.schoolId===school?.id&&(n.studentId===kid.id||!n.studentId)).slice(0,5);
      const openReq=byS('serviceRequests').filter(r=>r.createdBy===state.currentUserId&&r.status!=='Concluída'&&r.status!=='Cancelada').length;
      const pendingFin=isGuardian?byS('financeRecords').filter(f=>f.studentId===kid.id&&(f.status==='Em aberto'||f.status==='Atrasado')).length:0;
      const upcoming=(state.lessonRecords||[]).filter(r=>r.classId===kid.classId&&(r.attendance||[]).some(x=>x.studentId===kid.id&&x.status==='Falta')).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3);
      content.innerHTML=`${pageHeader(title,isGuardian?'Acompanhamento escolar dos seus filhos.':'Sua vida escolar em um só lugar.','<button class="btn-primary" id="quickRequest"><i class="fa-solid fa-plus"></i> Nova solicitação</button>')}${childSwitcherHtml()}
        <div class="welcome-banner"><div><span class="eyebrow">${isGuardian?'Portal do Responsável':'Portal do Aluno'}</span><h2>${escapeHtml(kid.name)}</h2><p>${escapeHtml(classLabel(classById(kid.classId)))} · Matrícula ${escapeHtml(kid.registration||'—')}</p></div></div>
        ${lowAtt?`<div class="alert alert-danger" role="alert"><i class="fa-solid fa-triangle-exclamation"></i> <div><strong>${escapeHtml(kid.name.split(' ')[0])} possui frequência abaixo do esperado:</strong> ${String(o.att.pct).replace('.',',')}% (mínimo ${MIN_ATTENDANCE}%).</div></div>`:''}${risk.length&&!lowAtt?`<div class="alert alert-info"><i class="fa-solid fa-circle-info"></i> <div>Acompanhamento pedagógico: ${escapeHtml(risk.join(' · '))}.</div></div>`:''}
        <div class="stat-grid">${statCard('Média geral',fmtNum(o.media),'fa-star-half-stroke')}${statCard('Frequência',o.att.pct===null?'—':String(o.att.pct).replace('.',',')+'%','fa-clipboard-check')}${statCard('Faltas',o.att.fal,'fa-user-xmark')}${statCard(isGuardian?'Pendências financeiras':'Solicitações abertas',isGuardian?pendingFin:openReq,isGuardian?'fa-sack-dollar':'fa-ticket')}</div>
        <div class="dashboard-grid"><div class="card"><div class="card-title"><div><h3>Notificações</h3><span>Últimas atualizações</span></div></div>${notes.length?`<ul class="plain-list">${notes.map(n=>`<li><i class="fa-solid fa-bell"></i> ${escapeHtml(n.text)} <small class="muted">${new Date(n.date).toLocaleDateString('pt-BR')}</small></li>`).join('')}</ul>`:'<div class="empty-state">Sem notificações.</div>'}</div>
        <div class="card"><div class="card-title"><div><h3>Faltas recentes</h3></div></div>${upcoming.length?`<ul class="plain-list">${upcoming.map(r=>`<li>${formatDate(r.date)} — ${escapeHtml(r.subject)}</li>`).join('')}</ul>`:'<div class="empty-state">Nenhuma falta recente.</div>'}</div></div>
        <div class="quick-grid"><button class="module-card action-card" data-page="reportCard"><div class="module-icon"><i class="fa-solid fa-file-lines"></i></div><h3>Boletim</h3><p>Notas por bimestre, frequência e resultado.</p><span>Abrir <i class="fa-solid fa-arrow-right"></i></span></button><button class="module-card action-card" data-page="attendance"><div class="module-icon"><i class="fa-solid fa-clipboard-check"></i></div><h3>Frequência</h3><p>Presenças e faltas por disciplina.</p><span>Abrir <i class="fa-solid fa-arrow-right"></i></span></button><button class="module-card action-card" data-page="serviceRequests"><div class="module-icon"><i class="fa-solid fa-ticket"></i></div><h3>Solicitações</h3><p>Peça declarações, histórico e outros documentos.</p><span>Abrir <i class="fa-solid fa-arrow-right"></i></span></button></div>`;
      document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>navigate(b.dataset.page));
      document.getElementById('quickRequest')?.addEventListener('click',()=>openCrudEditor(crudModules.serviceRequests));
      bindChildSwitcher(renderDashboard);
      return;
    }

    if(state.role==='rh'){
      const jobs=(state.jobs||[]).filter(j=>j.schoolId===school?.id);
      const cands=(state.candidates||[]).filter(c=>c.schoolId===school?.id);
      const emps=(state.employees||[]).filter(e=>e.schoolId===school?.id);
      const openJobs=jobs.filter(j=>j.status==='Aberta').length;
      const inProcess=cands.filter(c=>c.status==='Triagem'||c.status==='Entrevista').length;
      const pendingAccess=emps.filter(e=>e.status==='Aguardando Financeiro'||e.status==='Aguardando Liberação de Acesso').length;
      const activeLeaves=(state.leaves||[]).filter(l=>l.schoolId===school?.id&&l.status==='Em andamento').length;
      const openEthics=(state.ethicsCases||[]).filter(c=>c.schoolId===school?.id&&c.status==='Em apuração').length;
      const availableSubs=(state.substitutes||[]).filter(s=>s.schoolId===school?.id&&s.status==='Disponível').length;
      content.innerHTML=`${pageHeader('Painel de RH','Do pedido de contratação ao desligamento: recrutamento, departamento pessoal, desenvolvimento, clima, compliance e ética.','<button class="btn-primary" id="quickJob"><i class="fa-solid fa-plus"></i> Nova vaga</button>')}
        <div class="welcome-banner"><div><span class="eyebrow">Recursos Humanos</span><h2>${escapeHtml(school?.name||'Sua escola')}</h2><p>Publique vagas, avalie candidatos, contrate, gerencie o departamento pessoal e acompanhe clima, compliance e ética.</p></div></div>
        <div class="stat-grid">${statCard('Vagas abertas',openJobs,'fa-bullhorn')}${statCard('Candidatos em processo',inProcess,'fa-user-check')}${statCard('Funcionários ativos',emps.filter(e=>e.status==='Ativo').length,'fa-id-card')}${statCard('Aguardando acesso',pendingAccess,'fa-key')}</div>
        <div class="stat-grid">${statCard('Afastamentos ativos',activeLeaves,'fa-bed-pulse')}${statCard('Substitutos disponíveis',availableSubs,'fa-user-clock')}${statCard('Apurações em aberto (Ouvidoria)',openEthics,'fa-user-secret')}${statCard('Funcionários totais',emps.length,'fa-users')}</div>
        <div class="dashboard-grid"><div class="card"><div class="card-title"><div><h3>Fluxo de contratação</h3><span>Do RH ao primeiro acesso</span></div></div><div class="process-list"><div><b>1</b><span>Abrir vaga e triar candidatos</span><i class="fa-solid fa-chevron-right"></i></div><div><b>2</b><span>Aprovar e coletar documentos</span><i class="fa-solid fa-chevron-right"></i></div><div><b>3</b><span>Contratar e enviar ao Financeiro</span><i class="fa-solid fa-chevron-right"></i></div><div><b>4</b><span>Liberar acesso ao sistema</span><i class="fa-solid fa-check"></i></div></div></div>
        <div class="card"><div class="card-title"><div><h3>Atalhos</h3><span>Etapas do processo</span></div></div><div class="quick-grid" style="grid-template-columns:1fr"><button class="module-card action-card" data-page="candidates"><div class="module-icon"><i class="fa-solid fa-user-check"></i></div><h3>Avaliar candidatos</h3><p>Mova pelo funil: triagem, entrevista, aprovado.</p><span>Abrir <i class="fa-solid fa-arrow-right"></i></span></button><button class="module-card action-card" data-page="employees"><div class="module-icon"><i class="fa-solid fa-id-card"></i></div><h3>Funcionários e acesso</h3><p>Contratos ativos, afastamentos e rescisões.</p><span>Abrir <i class="fa-solid fa-arrow-right"></i></span></button><button class="module-card action-card" data-page="evaluations"><div class="module-icon"><i class="fa-solid fa-star-half-stroke"></i></div><h3>Desempenho e carreira</h3><p>Avaliação 360°, PDI e plano de carreira (PCCS).</p><span>Abrir <i class="fa-solid fa-arrow-right"></i></span></button><button class="module-card action-card" data-page="climateSurveys"><div class="module-icon"><i class="fa-solid fa-face-smile"></i></div><h3>Clima e bem-estar</h3><p>Pesquisas de clima e combate ao burnout.</p><span>Abrir <i class="fa-solid fa-arrow-right"></i></span></button></div></div></div>`;
      document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>navigate(b.dataset.page));
      document.getElementById('quickJob')?.addEventListener('click',()=>openJobEditor());
      return;
    }

    content.innerHTML=`${pageHeader('Visão geral da escola','Indicadores institucionais para acompanhamento da direção e apoio à decisão.')}
      <div class="welcome-banner executive"><div><span class="eyebrow">Direção Escolar</span><h2>${escapeHtml(school?.name||'Sua escola')}</h2><p>Uma visão consolidada da operação: pessoas, estrutura, pedagógico, financeiro e comunicação.</p></div><div class="executive-status"><span class="status-dot"></span><strong>Ambiente ativo</strong><small>Dados desta escola</small></div></div>
      <div class="stat-grid">${statCard('Alunos ativos',scopedStudents.length,'fa-user-graduate')}${statCard('Turmas em andamento',scopedClasses.length,'fa-people-roof')}${statCard('Professores ativos',scopedTeachers.length,'fa-chalkboard-user')}${statCard('Funcionários ativos',byS('employees').filter(e=>e.status==='Ativo').length,'fa-id-card')}</div>
      <div class="stat-grid">${statCard('Vagas aguardando aprovação',byS('jobs').filter(j=>j.status==='Aguardando aprovação').length,'fa-bullhorn')}${statCard('Contratações aguardando Financeiro/TI',byS('employees').filter(e=>e.status==='Aguardando Financeiro'||e.status==='Aguardando Liberação de Acesso').length,'fa-user-clock')}${statCard('Matrículas/transferências em análise',byS('enrollmentRequests').filter(r=>r.status==='Em análise'||r.status==='Pendente de documentos').length,'fa-user-pen')}${statCard('Solicitações abertas (Atendimento)',byS('serviceRequests').filter(r=>r.status!=='Concluída'&&r.status!=='Cancelada').length,'fa-ticket')}</div>
      <div class="stat-grid">${statCard('Pendências de RH',byS('leaves').filter(l=>l.status==='Em andamento').length+byS('ethicsCases').filter(c=>c.status==='Em apuração').length,'fa-triangle-exclamation')}${statCard('Comunicados recentes',byS('announcements').length,'fa-bullhorn')}${statCard('Lançamentos financeiros em aberto',byS('financeRecords').filter(f=>f.status==='Em aberto'||f.status==='Atrasado').length,'fa-sack-dollar')}${statCard('Eventos no calendário',state.calendars.filter(c=>c.schoolId===school?.id).reduce((a,c)=>a+c.events.length,0),'fa-calendar-check')}</div>
      <div class="dashboard-grid"><div class="card"><div class="card-title"><div><h3>Acompanhamento</h3><span>O que merece atenção</span></div></div><div class="attention-list"><div><span class="attention-icon warning"><i class="fa-solid fa-bullhorn"></i></span><div><strong>Aprovação de vagas</strong><p>Vagas solicitadas pelo RH aguardando sua decisão.</p></div><button class="small-button" data-page="jobs"><i class="fa-solid fa-arrow-right"></i></button></div><div><span class="attention-icon warning"><i class="fa-solid fa-user-clock"></i></span><div><strong>Financeiro e TI</strong><p>Confirme contratações e libere o acesso ao sistema.</p></div><button class="small-button" data-page="employees"><i class="fa-solid fa-arrow-right"></i></button></div><div><span class="attention-icon"><i class="fa-solid fa-magnifying-glass-chart"></i></span><div><strong>Auditoria</strong><p>Acompanhe as últimas alterações no sistema.</p></div><button class="small-button" data-page="auditLog"><i class="fa-solid fa-arrow-right"></i></button></div></div></div><div class="card"><div class="card-title"><div><h3>Visão institucional</h3><span>Resumo da escola</span></div></div><div class="institution-grid"><div><span>Unidade</span><strong>${escapeHtml(school?.name||'Não cadastrada')}</strong></div><div><span>Ano</span><strong>${new Date().getFullYear()}</strong></div><div><span>Cidade</span><strong>${escapeHtml(school?.city||'—')}</strong></div><div><span>UF</span><strong>${escapeHtml(school?.state||'—')}</strong></div></div></div></div>`;
    document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>navigate(b.dataset.page));
  }

  function renderSchools() {
    const school=schoolForCurrent();
    content.innerHTML=`${pageHeader('Dados da Escola','Consulte e altere os dados cadastrais da escola deste ambiente.','<button class="btn-primary" id="editSchool"><i class="fa-solid fa-pen"></i> Alterar dados</button>')}
      ${school?`<div class="module-grid"><div class="module-card"><div class="module-icon"><i class="fa-solid fa-school"></i></div><h3>${escapeHtml(school.name)}</h3><p>${escapeHtml(school.address||'Endereço não informado')} — ${escapeHtml(school.city||'')}/${escapeHtml(school.state||'')}</p><p><b>INEP:</b> ${escapeHtml(school.inep||'Não informado')}</p><p><b>CNPJ:</b> ${escapeHtml(school.cnpj||'Não informado')}</p><p><b>E-mail:</b> ${escapeHtml(school.email||'Não informado')}</p></div></div>`:'<div class="empty-state">Nenhuma escola cadastrada. Use “Adicione sua escola” na tela inicial.</div>'}`;
    document.getElementById('editSchool')?.addEventListener('click',()=>openSchoolEditor(school?.id));
  }

  const SCHOOL_STAGES=['Educação Infantil — Creche','Educação Infantil — Pré-escola','Ensino Fundamental — Anos Iniciais','Ensino Fundamental — Anos Finais','Ensino Médio','Educação de Jovens e Adultos (EJA)','Educação Especial (AEE)','Educação Profissional'];
  const SCHOOL_SHIFTS=['Matutino','Vespertino','Noturno','Integral'];
  const SCHOOL_INFRA=['Biblioteca','Laboratório de Informática','Laboratório de Ciências','Quadra Poliesportiva','Cozinha / Refeitório','Acessibilidade (rampas e banheiro adaptado)','Internet','Sala de Recursos Multifuncionais (AEE)'];

  function schoolFormSectionsHtml(s){
    s=s||{};
    const chkGroup=(name,options,selected)=>`<div class="checkbox-grid">${options.map(o=>`<label><input type="checkbox" name="${name}" value="${escapeHtml(o)}" ${(selected||[]).includes(o)?'checked':''}> ${escapeHtml(o)}</label>`).join('')}</div>`;
    const sel=(id,label,opts,val,full)=>`<div${full?' class="full"':''}><label for="${id}">${label}</label><select id="${id}">${optionsHtml(opts,val)}</select></div>`;
    const inp=(id,label,val,extra='',full)=>`<div${full?' class="full"':''}><label for="${id}">${label}</label><input id="${id}" value="${escapeHtml(val||'')}" ${extra}></div>`;
    return `
      <div class="section-progress"><span>1. Identificação</span><span>2. Localização</span><span>3. Contato</span><span>4. Gestão</span><span>5. Oferta educacional</span><span>6. Infraestrutura</span><span>7. Serviços</span></div>

      <fieldset><legend>1. Identificação da escola</legend><div class="form-grid">
        ${inp('sr_name','Nome oficial da escola *',s.name,'required placeholder="Ex.: Escola Municipal Modelo"',true)}
        ${inp('sr_fantasy','Nome fantasia (se houver)',s.fantasyName)}
        ${inp('sr_cnpj','CNPJ',s.cnpj,'placeholder="00.000.000/0000-00"')}
        ${inp('sr_inep','Código INEP',s.inep,'placeholder="8 dígitos"')}
        ${sel('sr_dependency','Dependência administrativa',['Municipal','Estadual','Federal','Privada'],s.dependency||'Municipal')}
        ${sel('sr_category','Categoria administrativa',['Não se aplica (rede pública)','Particular','Comunitária','Confessional','Filantrópica'],s.adminCategory||'Não se aplica (rede pública)')}
        ${sel('sr_status','Situação de funcionamento',['Em atividade','Em implantação','Paralisada'],s.operatingStatus||'Em atividade')}
      </div></fieldset>

      <fieldset><legend>2. Localização</legend><div class="form-grid">
        ${inp('sr_cep','CEP',s.cep,'placeholder="00000-000"')}
        ${inp('sr_address','Logradouro (rua/avenida)',s.address,'',true)}
        ${inp('sr_number','Número',s.number)}
        ${inp('sr_complement','Complemento',s.complement)}
        ${inp('sr_neighborhood','Bairro',s.neighborhood)}
        ${inp('sr_city','Município',s.city)}
        ${inp('sr_state','UF',s.state,'maxlength="2"')}
        ${sel('sr_zone','Localização',['Urbana','Rural'],s.zone||'Urbana')}
      </div></fieldset>

      <fieldset><legend>3. Contato</legend><div class="form-grid">
        ${inp('sr_phone','Telefone',s.phone,'placeholder="(00) 0000-0000"')}
        <div><label for="sr_email">E-mail institucional</label><input id="sr_email" type="email" value="${escapeHtml(s.email||'')}"></div>
        ${inp('sr_website','Site (opcional)',s.website,'placeholder="https://..."')}
      </div></fieldset>

      <fieldset><legend>4. Gestão escolar</legend><div class="form-grid">
        ${inp('sr_managerName','Nome do(a) gestor(a) escolar *',s.managerName,'required')}
        ${inp('sr_managerRole','Cargo',s.managerRole||'Diretor(a) Escolar')}
        ${inp('sr_managerPhone','Telefone do(a) gestor(a)',s.managerPhone)}
        <div><label for="sr_managerEmail">E-mail do(a) gestor(a) *</label><input id="sr_managerEmail" type="email" value="${escapeHtml(s.managerEmail||'')}" required></div>
      </div></fieldset>

      <fieldset><legend>5. Oferta educacional</legend>
        <label>Etapas e modalidades ofertadas</label>${chkGroup('sr_stages',SCHOOL_STAGES,s.stagesOffered)}
        <label style="margin-top:14px">Turnos de funcionamento</label>${chkGroup('sr_shifts',SCHOOL_SHIFTS,s.shifts)}
      </fieldset>

      <fieldset><legend>6. Infraestrutura</legend><div class="form-grid">
        ${inp('sr_classrooms','Número de salas de aula',s.classroomCount,'type="number" min="0"')}
        ${sel('sr_water','Abastecimento de água',['Rede pública','Poço / Cisterna','Outra forma','Inexistente'],s.waterSupply||'Rede pública')}
        ${sel('sr_energy','Energia elétrica',['Rede pública','Gerador','Inexistente'],s.electricity||'Rede pública')}
      </div>
        <label style="margin-top:14px">Dependências e recursos</label>${chkGroup('sr_infra',SCHOOL_INFRA,s.infrastructure)}
      </fieldset>

      <fieldset><legend>7. Serviços escolares</legend><div class="form-grid">
        ${sel('sr_meals','Oferece alimentação escolar',['Sim','Não'],s.mealsProgram||'Sim')}
        ${sel('sr_transport','Oferece transporte escolar',['Sim','Não'],s.schoolTransport||'Não')}
      </div></fieldset>`;
  }

  function collectSchoolForm(prevId,prevCreatedAt){
    const v=id=>document.getElementById(id)?.value.trim();
    const checked=name=>[...document.querySelectorAll(`input[name="${name}"]:checked`)].map(x=>x.value);
    return {
      id: prevId||crypto.randomUUID(),
      name:v('sr_name'), fantasyName:v('sr_fantasy'), cnpj:v('sr_cnpj'), inep:v('sr_inep'),
      dependency:v('sr_dependency'), adminCategory:v('sr_category'), operatingStatus:v('sr_status'),
      cep:v('sr_cep'), address:v('sr_address'), number:v('sr_number'), complement:v('sr_complement'),
      neighborhood:v('sr_neighborhood'), city:v('sr_city'), state:v('sr_state').toUpperCase(), zone:v('sr_zone'),
      phone:v('sr_phone'), email:v('sr_email'), website:v('sr_website'),
      managerName:v('sr_managerName'), managerRole:v('sr_managerRole'), managerPhone:v('sr_managerPhone'), managerEmail:v('sr_managerEmail'),
      stagesOffered:checked('sr_stages'), shifts:checked('sr_shifts'),
      classroomCount:Number(v('sr_classrooms'))||0, waterSupply:v('sr_water'), electricity:v('sr_energy'),
      infrastructure:checked('sr_infra'), mealsProgram:v('sr_meals'), schoolTransport:v('sr_transport'),
      createdAt: prevCreatedAt||new Date().toISOString()
    };
  }

  function validateSchoolForm(data){
    if(!data.name) return 'Informe o nome oficial da escola.';
    if(!data.managerName) return 'Informe o nome do(a) gestor(a) escolar.';
    if(!validEmail(data.managerEmail)||!data.managerEmail) return 'Informe um e-mail válido para o(a) gestor(a).';
    if(!validEmail(data.email)) return 'E-mail institucional inválido.';
    if(!validPhone(data.phone)) return 'Telefone institucional em formato inválido.';
    if(data.state&&data.state.length!==2) return 'UF deve ter 2 letras (ex.: SE).';
    if(!data.stagesOffered.length) return 'Selecione ao menos uma etapa/modalidade ofertada.';
    if(!data.shifts.length) return 'Selecione ao menos um turno de funcionamento.';
    return null;
  }

  function openPublicSchoolRegistration(){
    loginScreen.classList.add('hidden');
    document.getElementById('schoolRegScreen').classList.remove('hidden');
    const body=document.getElementById('schoolRegBody');
    body.innerHTML=`
      <div class="public-register-intro">
        <i class="fa-solid fa-school"></i>
        <div><strong>Cadastre sua escola</strong><p>Preencha os dados abaixo para criar o ambiente de gestão da sua escola. Este cadastro não dá acesso a outras escolas — após concluir, esta será a única escola ativa neste navegador.</p></div>
      </div>
      <form id="schoolRegForm" novalidate>
        ${schoolFormSectionsHtml({})}
        <fieldset><legend>8. Conta de acesso do(a) responsável pelo cadastro</legend><div class="form-grid">
          <div class="full"><label for="sr_adminName">Nome completo *</label><input id="sr_adminName" required placeholder="Quem está cadastrando a escola"></div>
          <div><label for="sr_adminEmail">E-mail de acesso *</label><input id="sr_adminEmail" type="email" required></div>
          <div><label for="sr_adminPassword">Crie uma senha de acesso *</label><input id="sr_adminPassword" type="password" required minlength="4" placeholder="Mínimo 4 caracteres"></div>
        </div></fieldset>
        <div class="form-actions"><button type="button" class="btn-secondary" id="schoolRegCancel">Cancelar</button> <button class="btn-primary" type="submit"><i class="fa-solid fa-check"></i> Cadastrar minha escola</button></div>
      </form>`;
    document.getElementById('schoolRegCancel').onclick=()=>{document.getElementById('schoolRegScreen').classList.add('hidden');loginScreen.classList.remove('hidden');};
    document.getElementById('schoolRegForm').onsubmit=e=>{
      e.preventDefault();
      const data=collectSchoolForm();
      const err=validateSchoolForm(data);
      if(err){ let el=document.getElementById('schoolRegError'); if(!el){el=document.createElement('div');el.id='schoolRegError';el.className='alert alert-danger';el.setAttribute('role','alert');document.getElementById('schoolRegForm').prepend(el);} el.textContent=err; el.scrollIntoView({block:'center'}); return; }
      const adminName=document.getElementById('sr_adminName').value.trim();
      const adminEmail=document.getElementById('sr_adminEmail').value.trim();
      const adminPassword=document.getElementById('sr_adminPassword').value;
      if(!adminName||!adminEmail||!adminPassword){ showToast('Preencha os dados da conta de acesso.'); return; }
      state.schools.push(data);
      state.currentSchoolId=data.id;
      const account={id:crypto.randomUUID(),name:adminName,role:'secretaria',email:adminEmail,password:adminPassword,schoolId:data.id,status:'Ativo',vinculo:null,vinculoLabel:'Responsável pelo cadastro da escola',matricula:'FUNC-0000'};
      state.mockUsers.push(account);
      state.user=adminName; state.role='secretaria'; state.currentUserId=account.id;
      save();
      document.getElementById('schoolRegScreen').classList.add('hidden');
      app.classList.remove('hidden');
      updateUser(); buildMenu(); navigate('dashboard'); wireTopbar(); updateNotifBadge();
      logAudit('Escolas','Cadastro',`${data.name} cadastrada por ${adminName}.`);
      showToast('Escola cadastrada. Ambiente de gestão criado com sucesso.');
    };
  }

  function openSchoolEditor(id=null){
    const school=schoolForCurrent();
    if(!can('estrutura', id?'edit':'create')){ denyToast(id?'edit':'create'); return; }
    const s=state.schools.find(x=>x.id===id)||{};
    content.innerHTML=`${pageHeader(id?'Alterar Dados da Escola':'Cadastrar Nova Escola','Cadastro completo, nos mesmos moldes das informações pedidas pelo Censo Escolar/INEP.')}
      <div class="table-card" style="padding:28px 30px"><form id="schoolEditForm" novalidate>${schoolFormSectionsHtml(s)}${state.role==='educacao'?eduSchoolLinkHtml(s,id):''}<div class="form-actions"><button type="button" class="btn-secondary" id="schoolEditCancel">Cancelar</button> <button class="btn-primary" type="submit">Salvar escola</button></div></form></div>`;
    document.getElementById('schoolEditCancel').onclick=()=>(state.role==='educacao'?renderEduSchools():renderSchools());
    document.getElementById('schoolEditForm').onsubmit=e=>{
      e.preventDefault();
      const data=collectSchoolForm(id||undefined,s.createdAt);
      if(id){ data.email=data.email; } // keep collected value
      const eduLink=state.role==='educacao'?eduReadLink(data,id):null;
      const err=(eduLink&&eduLink.error)||validateSchoolForm(data);
      if(err){ let el=document.getElementById('schoolEditError'); if(!el){el=document.createElement('div');el.id='schoolEditError';el.className='alert alert-danger';el.setAttribute('role','alert');document.getElementById('schoolEditForm').prepend(el);} el.textContent=err; el.scrollIntoView({block:'center'}); return; }
      if(id){ Object.assign(s,data,{adminName:s.adminName,adminEmail:s.adminEmail}); logAudit('Escolas','Alteração',s.name); }
      else{ state.schools.push(data); if(!state.currentSchoolId) state.currentSchoolId=data.id; logAudit('Escolas','Criação',data.name); }
      if(eduLink&&eduLink.account) state.mockUsers.push({...eduLink.account,schoolId:data.id});
      save(); (state.role==='educacao'?renderEduSchools():renderSchools()); showToast('Escola cadastrada/atualizada com sucesso.');
    };
  }

  function renderClasses(){
    const school=schoolForCurrent(); const list=state.classes.filter(c=>!school||c.schoolId===school.id);
    content.innerHTML=`${pageHeader('Turmas e Séries','Crie turmas com matriz curricular e grade semanal pré-carregadas.','<button class="btn-primary" id="newClass"><i class="fa-solid fa-plus"></i> Criar turma</button>')}
      <div class="alert alert-info"><i class="fa-solid fa-wand-magic-sparkles"></i><div><strong>Cadastro inteligente</strong><br>Ao escolher a série, disciplinas, carga horária e quantidade semanal de aulas são carregadas automaticamente. A grade de segunda a sexta também é criada.</div></div>
      <div class="table-card"><div class="table-wrap"><table><thead><tr><th>Turma</th><th>Série</th><th>Turno</th><th>Ocupação</th><th>Disciplinas</th><th>Aulas/semana</th><th>Ações</th></tr></thead><tbody>${list.length?list.map(c=>{const occ=studentsOfClass(c.id).length;const pct=c.vacancies?Math.round(occ/c.vacancies*100):0;const full=occ>=c.vacancies;return `<tr><td><strong>${escapeHtml(c.name)}</strong></td><td>${escapeHtml(c.grade)}</td><td>${escapeHtml(c.shift)}</td><td><span class="badge ${full?'badge-red':pct>=90?'badge-yellow':'badge-green'}">${occ} / ${c.vacancies} (${pct}%)</span>${full?' <small class="muted">turma cheia</small>':''}</td><td>${c.subjects.length}</td><td>${c.subjects.reduce((a,s)=>a+Number(s.weeklyClasses||0),0)}</td><td><button class="small-button class-view" data-id="${c.id}"><i class="fa-solid fa-eye"></i></button><button class="small-button class-edit" data-id="${c.id}"><i class="fa-solid fa-pen"></i></button></td></tr>`;}).join(''):'<tr><td colspan="7" style="text-align:center;padding:30px">Nenhuma turma cadastrada.</td></tr>'}</tbody></table></div></div>`;
    document.getElementById('newClass')?.addEventListener('click',()=>openClassEditor());
    document.querySelectorAll('.class-edit').forEach(b=>b.onclick=()=>openClassEditor(b.dataset.id));
    document.querySelectorAll('.class-view').forEach(b=>b.onclick=()=>openClassDetails(b.dataset.id));
  }

  function getTemplate(grade){return (curriculumTemplates[grade]||[]).map(([name,annual,weeklyClasses])=>({name,annual,weeklyHours:Math.round(annual/40),weeklyClasses}));}

  function buildSchedule(subjects){
    const slots=[]; let cursor=0; const max=timeSlots.length*weekdays.length;
    const queue=[]; subjects.forEach(s=>{for(let i=0;i<s.weeklyClasses;i++)queue.push(s.name);});
    // Distribute by day to avoid filling one subject on the same day repeatedly.
    let index=0;
    for(let d=0;d<weekdays.length && index<queue.length;d++){
      const used=new Set();
      for(let p=0;p<timeSlots.length && index<queue.length;p++){
        let found=-1;
        for(let k=index;k<queue.length;k++){if(!used.has(queue[k])){found=k;break;}}
        if(found<0) found=index;
        const subject=queue[found]; queue.splice(found,1); used.add(subject);
        const t=timeSlots[p]; slots.push({weekday:d+1,weekdayName:weekdays[d],period:t[0],start:t[1],end:t[2],subject}); index=0;
      }
    }
    while(queue.length && slots.length<max){const subject=queue.shift();const p=slots.length%timeSlots.length;const d=Math.floor(slots.length/timeSlots.length);const t=timeSlots[p];slots.push({weekday:d+1,weekdayName:weekdays[d],period:t[0],start:t[1],end:t[2],subject});}
    return slots;
  }

  function openClassEditor(id=null){
    const c=state.classes.find(x=>x.id===id); const grade=c?.grade||'1º ano do Ensino Médio'; const subjects=c?.subjects||getTemplate(grade); const school=schoolForCurrent();
    if(!school){showToast('Cadastre sua escola primeiro pelo botão “Adicione sua escola”.');return;}
    openModal(id?'Alterar turma':'Criar turma',`<form id="classForm" class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid"><div class="full"><label>Escola *</label><select id="classSchool" required>${schoolOptions(c?.schoolId||school?.id)}</select></div><div><label>Ano letivo</label><input id="classYear" value="${c?.year||new Date().getFullYear()}" type="number"></div><div><label>Série / etapa *</label><select id="classGrade">${Object.keys(curriculumTemplates).map(g=>`<option ${g===grade?'selected':''}>${g}</option>`).join('')}</select></div><div><label>Nome da turma *</label><input id="className" value="${escapeHtml(c?.name||'A')}" placeholder="Ex.: A" required></div><div><label>Turno</label><select id="classShift">${['Manhã','Tarde','Noite','Integral'].map(x=>`<option ${x===(c?.shift||'Manhã')?'selected':''}>${x}</option>`).join('')}</select></div><div><label>Sala</label><input id="classRoom" value="${escapeHtml(c?.room||'')}" placeholder="Ex.: Sala 03"></div><div><label>Vagas</label><input id="classVacancies" type="number" value="${c?.vacancies||35}" min="1"></div></div><div class="curriculum-editor"><div class="card-title"><h3>Matriz curricular</h3><span>Pré-definida e editável</span></div><div id="subjectRows">${subjects.map(subjectRow).join('')}</div><button type="button" class="btn-secondary" id="addSubject"><i class="fa-solid fa-plus"></i> Adicionar disciplina</button></div><div class="alert alert-success"><i class="fa-solid fa-calendar-check"></i><div><strong>Grade semanal automática</strong><br>Depois de salvar, o sistema distribui as aulas entre segunda e sexta-feira usando os horários padrão.</div></div><div class="form-actions"><button class="btn-primary" type="submit">${id?'Salvar alterações':'Criar turma e gerar grade'}</button></div></form>`);
    const bind=()=>document.querySelectorAll('.remove-subject').forEach(b=>b.onclick=()=>b.parentElement.remove());
    document.getElementById('classGrade').onchange=e=>{document.getElementById('subjectRows').innerHTML=getTemplate(e.target.value).map(subjectRow).join('');bind();};
    document.getElementById('addSubject').onclick=()=>{const d=document.createElement('div');d.innerHTML=subjectRow({name:'',annual:40,weeklyHours:1,weeklyClasses:1});document.getElementById('subjectRows').appendChild(d.firstElementChild);bind();}; bind();
    document.getElementById('classForm').onsubmit=e=>{e.preventDefault();const subjects=[...document.querySelectorAll('.subject-row')].map(r=>({name:r.querySelector('.subject-name').value.trim(),annual:Number(r.querySelector('.subject-annual').value||0),weeklyHours:Number(r.querySelector('.subject-hours').value||0),weeklyClasses:Number(r.querySelector('.subject-classes').value||0)})).filter(s=>s.name);const data={id:id||crypto.randomUUID(),schoolId:document.getElementById('classSchool').value,year:Number(document.getElementById('classYear').value),grade:document.getElementById('classGrade').value,name:document.getElementById('className').value.trim(),shift:document.getElementById('classShift').value,room:document.getElementById('classRoom').value,vacancies:Number(document.getElementById('classVacancies').value),subjects,schedule:buildSchedule(subjects),updatedAt:new Date().toISOString()};if(id)Object.assign(c,data);else state.classes.push(data);state.currentSchoolId=data.schoolId;save();closeModal();renderClasses();showToast('Turma criada com matriz e grade semanal automaticamente.');};
  }
  function subjectRow(s){return `<div class="subject-row"><input class="subject-name" value="${escapeHtml(s.name)}" placeholder="Disciplina"><input class="subject-hours" type="number" min="0" value="${s.weeklyHours}" title="Horas/semana"><input class="subject-annual" type="number" min="0" value="${s.annual}" title="Carga anual"><input class="subject-classes" type="number" min="1" value="${s.weeklyClasses}" title="Aulas/semana"><button type="button" class="small-button remove-subject"><i class="fa-solid fa-trash"></i></button></div>`;}

  function openClassDetails(id){const c=state.classes.find(x=>x.id===id);if(!c)return;openModal(`Turma ${escapeHtml(c.name)}`,`<div class="detail-grid"><div><b>Série</b><span>${escapeHtml(c.grade)}</span></div><div><b>Turno</b><span>${escapeHtml(c.shift)}</span></div><div><b>Sala</b><span>${escapeHtml(c.room||'-')}</span></div><div><b>Vagas</b><span>${c.vacancies}</span></div></div><h3 style="margin:24px 0 12px">Matriz curricular</h3><div class="table-card"><div class="table-wrap"><table><thead><tr><th>Disciplina</th><th>Horas/semana</th><th>Horas/ano</th><th>Aulas/semana</th></tr></thead><tbody>${c.subjects.map(s=>`<tr><td>${escapeHtml(s.name)}</td><td>${s.weeklyHours}</td><td>${s.annual}</td><td>${s.weeklyClasses}</td></tr>`).join('')}</tbody></table></div></div><h3 style="margin:24px 0 12px">Grade semanal automática</h3>${scheduleTable(c.schedule)}`);}
  function scheduleTable(schedule=[]){return `<div class="table-card"><div class="table-wrap"><table class="schedule-table"><thead><tr><th>Horário</th>${weekdays.map(d=>`<th>${d}</th>`).join('')}</tr></thead><tbody>${timeSlots.map(t=>`<tr><th>${t[0]}<br><small>${t[1]}–${t[2]}</small></th>${weekdays.map((_,di)=>{const x=schedule.find(z=>z.weekday===di+1&&z.period===t[0]);return `<td>${x?`<strong>${escapeHtml(x.subject)}</strong>`:'—'}</td>`}).join('')}</tr>`).join('')}</tbody></table></div></div>`;}

  function renderCurriculum(){content.innerHTML=`${pageHeader('Matrizes Curriculares','Modelos pré-definidos que alimentam automaticamente novas turmas.') }<div class="module-grid">${Object.entries(curriculumTemplates).map(([name,items])=>`<div class="module-card"><div class="module-icon"><i class="fa-solid fa-book-open"></i></div><h3>${name}</h3><p>${items.length} disciplinas · ${items.reduce((a,x)=>a+x[2],0)} aulas semanais</p><button class="btn-secondary template-view" data-grade="${escapeHtml(name)}">Visualizar / editar</button></div>`).join('')}</div>`;document.querySelectorAll('.template-view').forEach(b=>b.onclick=()=>openTemplateEditor(b.dataset.grade));}
  function openTemplateEditor(grade){const items=getTemplate(grade);openModal(`Matriz — ${grade}`,`<div class="alert alert-info">Este modelo é usado como padrão ao criar uma nova turma. A turma recebe uma cópia editável, então alterações na turma não alteram o modelo.</div><div id="templateRows">${items.map(subjectRow).join('')}</div><div class="form-actions"><button class="btn-primary" id="saveTemplate">Salvar modelo</button></div>`);document.getElementById('saveTemplate').onclick=()=>{const arr=[...document.querySelectorAll('.subject-row')].map(r=>[r.querySelector('.subject-name').value,Number(r.querySelector('.subject-annual').value),Number(r.querySelector('.subject-classes').value)]);curriculumTemplates[grade]=arr;closeModal();renderCurriculum();showToast('Matriz atualizada.');};}

  function renderCalendar(){
    const school=schoolForCurrent();
    if(!school){
      content.innerHTML=`${pageHeader('Calendário Escolar','Cadastre uma escola para configurar o calendário escolar.')}<div class="empty-state">Nenhuma escola cadastrada.</div>`;
      return;
    }

    const config=ensureSchoolCalendar(school.id);
    const models=calendarModels();
    const selected=models.find(m=>m.id===config.modelId)||models[0];
    const year=config.year||2026;
    const events=config.events||[];

    content.innerHTML=`${pageHeader(
      'Calendário Escolar',
      'Escolha um dos modelos padrão e aplique o que melhor se encaixa na realidade da escola.',
      `<button class="btn-primary" id="changeCalendarModel"><i class="fa-solid fa-repeat"></i> Trocar modelo</button>`
    )}
      <div class="calendar-selection-note"><i class="fa-solid fa-circle-info"></i><div><strong>Um modelo ativo por escola</strong><span>A escola escolhe um calendário padrão. Os outros dois ficam disponíveis apenas como opções de comparação.</span></div></div>
      <div class="calendar-option-grid">
        ${models.map(m=>`<div class="calendar-option ${m.id===selected.id?'active':''}">
          <div class="calendar-option-top"><span class="calendar-option-number">${m.number}</span>${m.id===selected.id?'<span class="badge badge-green">Selecionado</span>':''}</div>
          <h3>${escapeHtml(m.title)}</h3>
          <p>${escapeHtml(m.description)}</p>
          <div class="calendar-option-meta"><span><i class="fa-solid fa-arrows-rotate"></i>${escapeHtml(m.rule)}</span><span><i class="fa-solid fa-calendar-check"></i>${m.saturdays} sábados letivos (base histórica)</span></div>
          <button class="btn-secondary model-view" data-model="${m.id}">${m.id===selected.id?'Ver calendário':'Visualizar modelo'}</button>
        </div>`).join('')}
      </div>

      <div class="selected-calendar-header">
        <div><span class="eyebrow">MODELO ATIVO</span><h2>${escapeHtml(selected.title)}</h2><p>${escapeHtml(selected.description)}</p></div>
        <div class="selected-calendar-actions"><label>Ano <select id="calendarYear">${[2026,2027,2028,2029,2030].map(y=>`<option ${y===year?'selected':''}>${y}</option>`).join('')}</select></label></div>
      </div>

      <div class="calendar-legend">
        ${calendarLegend().map(x=>`<span><i class="legend-dot ${x.className}"></i>${x.label}</span>`).join('')}
      </div>

      <div class="card annual-calendar-card"><div class="card-title"><div><h3>Calendário anual ${year}</h3><span>Datas letivas, feriados, recessos, períodos pedagógicos e avaliações.</span></div><span class="calendar-total-days">${countEventType(events,'Dia letivo')} dias/eventos marcados</span></div><div id="annualCalendarGrid">${renderSchoolAnnualCalendar(year, events)}</div></div>

      <div class="card calendar-summary-card"><div class="card-title"><div><h3>Resumo do calendário</h3><span>Principais marcos do ano letivo selecionado</span></div></div><div class="calendar-summary-grid">${summaryCards(events)}</div></div>`;

    document.querySelectorAll('.model-view').forEach(btn=>btn.onclick=()=>{const modelId=btn.dataset.model;if(modelId===config.modelId){renderCalendar();}else{chooseCalendarModel(school.id,modelId);}});
    document.getElementById('changeCalendarModel')?.addEventListener('click',()=>openCalendarModelSelector(school.id));
    document.getElementById('calendarYear')?.addEventListener('change',e=>{config.year=Number(e.target.value);config.events=buildModelEvents(config.modelId,config.year);save();renderCalendar();});
  }

  function openCalendarModelSelector(schoolId){
    const config=ensureSchoolCalendar(schoolId);
    const models=calendarModels();
    openModal('Escolher modelo de calendário',`<div class="model-selector-modal"><p class="muted">Selecione o modelo que melhor corresponde à organização da escola. Apenas um modelo fica ativo por vez.</p><div class="calendar-modal-options">${models.map(m=>`<button type="button" class="calendar-modal-option ${m.id===config.modelId?'selected':''}" data-model="${m.id}"><span class="calendar-option-number">${m.number}</span><div><strong>${escapeHtml(m.title)}</strong><small>${escapeHtml(m.description)}</small></div>${m.id===config.modelId?'<i class="fa-solid fa-circle-check"></i>':''}</button>`).join('')}</div></div>`);
    document.querySelectorAll('.calendar-modal-option').forEach(b=>b.onclick=()=>{chooseCalendarModel(schoolId,b.dataset.model);closeModal();});
  }

  function chooseCalendarModel(schoolId,modelId){
    const config=ensureSchoolCalendar(schoolId);config.modelId=modelId;config.year=config.year||2026;config.events=buildModelEvents(modelId,config.year);save();renderCalendar();showToast('Modelo de calendário selecionado para a escola.');
  }

  function ensureSchoolCalendar(schoolId){
    if(!state.schoolCalendars) state.schoolCalendars=[];
    let config=state.schoolCalendars.find(x=>x.schoolId===schoolId);
    if(!config){
      config={id:crypto.randomUUID(),schoolId,modelId:'MODEL_1',year:2026,events:buildModelEvents('MODEL_1',2026)};
      state.schoolCalendars.push(config);
      save();
    }
    return config;
  }

  function calendarModels(){
    return [
      {id:'MODEL_1',number:'01',title:'Modelo 1 — Recuperação Paralela',description:'Modelo indicado para escolas que trabalham com recuperação paralela e contínua.',rule:'Recuperação paralela',saturdays:14},
      {id:'MODEL_2',number:'02',title:'Modelo 2 — Recuperação Semestral',description:'Modelo indicado para escolas que adotam recuperação semestral.',rule:'Recuperação semestral',saturdays:17},
      {id:'MODEL_3',number:'03',title:'Modelo 3 — EJA / Recuperação Final',description:'Modelo destinado às modalidades específicas, especialmente EJA, com organização própria de recuperação.',rule:'EJA / recuperação final',saturdays:20}
    ];
  }

  function calendarLegend(){return [
    {label:'Feriado',className:'holiday'},{label:'Dia letivo',className:'school-day'},{label:'Recesso / férias',className:'break'},{label:'Avaliação',className:'assessment'},{label:'Planejamento / reunião',className:'planning'},{label:'Sábado letivo',className:'saturday'}
  ];}

  function buildModelEvents(modelId,year){
    const base=[
      ['Planejamento do 1º semestre',`${year}-01-26`,`${year}-01-28`,'Planejamento'],
      ['Início do ano letivo',`${year}-02-02`,'','Dia letivo'],
      ['Carnaval',`${year}-02-16`,`${year}-02-18`,'Recesso'],
      ['Paixão de Cristo',`${year}-04-03`,'','Feriado'],
      ['Tiradentes',`${year}-04-21`,'','Feriado'],
      ['Dia Mundial do Trabalho',`${year}-05-01`,'','Feriado'],
      ['Corpus Christi',`${year}-06-04`,'','Feriado'],
      ['São João',`${year}-06-24`,'','Feriado'],
      ['Independência de Sergipe',`${year}-07-08`,'','Feriado'],
      ['Final do 1º semestre',`${year}-07-10`,'','Término'],
      ['Férias do magistério',`${year}-07-13`,`${year}-07-27`,'Férias'],
      ['Planejamento do 2º semestre',`${year}-07-28`,'','Planejamento'],
      ['Início do 2º semestre',`${year}-07-29`,'','Dia letivo'],
      ['Independência do Brasil',`${year}-09-07`,'','Feriado'],
      ['Nossa Senhora Aparecida',`${year}-10-12`,'','Feriado'],
      ['Finados',`${year}-11-02`,'','Feriado'],
      ['Dia da Consciência Negra',`${year}-11-20`,'','Feriado'],
      ['Proclamação da República',`${year}-11-15`,'','Feriado'],
      ['Natal',`${year}-12-25`,'','Feriado'],
      ['Final do ano letivo',`${year}-12-18`,'','Término']
    ];
    if(modelId==='MODEL_2') base.splice(9,0,['Período de recuperação semestral',`${year}-07-01`,`${year}-07-10`,'Avaliação']);
    if(modelId==='MODEL_3') base.push(['Período de recuperação final',`${year}-12-19`,`${year}-12-23`,'Avaliação']);
    return base.map(([title,date,endDate,type])=>({id:crypto.randomUUID(),title,date,endDate,type}));
  }

  function countEventType(events,type){return events.filter(e=>e.type===type).length;}

  function summaryCards(events){
    const important=['Início do ano letivo','Final do 1º semestre','Início do 2º semestre','Final do ano letivo'];
    return important.map(title=>{const e=events.find(x=>x.title===title);return `<div><span>${escapeHtml(title)}</span><strong>${e?formatDate(e.date):'—'}</strong></div>`}).join('');
  }

  function renderSchoolAnnualCalendar(year,events=[]){
    const monthNames=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const weekdaysShort=['D','S','T','Q','Q','S','S'];
    return `<div class="annual-year-grid school-calendar-grid">${monthNames.map((month,mi)=>{
      const first=new Date(year,mi,1), days=new Date(year,mi+1,0).getDate(), start=first.getDay();
      let cells=''; for(let i=0;i<start;i++) cells+='<span class="day-cell empty"></span>';
      for(let d=1;d<=days;d++){
        const iso=`${year}-${String(mi+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const dayEvents=events.filter(e=>e.date===iso || (e.endDate&&iso>=e.date&&iso<=e.endDate));
        const primary=dayEvents[0];
        const classes=dayEvents.map(e=>eventColorClass(e.type)).join(' ');
        cells+=`<span class="day-cell ${classes||''} ${dayEvents.length?'has-event':''}" title="${escapeHtml(dayEvents.map(e=>e.title).join(' • '))}">${d}</span>`;
      }
      return `<div class="year-month"><div class="month-title">${month} <span>${year}</span></div><div class="weekday-head">${weekdaysShort.map(w=>`<span>${w}</span>`).join('')}</div><div class="month-days">${cells}</div>${events.filter(e=>Number(e.date?.slice(5,7))===mi+1).slice(0,5).map(e=>`<div class="month-event ${eventColorClass(e.type)}"><b>${formatDate(e.date)}</b> ${escapeHtml(e.title)}</div>`).join('')}</div>`;
    }).join('')}</div>`;
  }

  function eventColorClass(type){return type==='Feriado'?'holiday':type==='Dia letivo'?'school-day':type==='Férias'||type==='Recesso'?'break':type==='Avaliação'?'assessment':type==='Planejamento'?'planning':type==='Sábado letivo'?'saturday':'other-event';}

  function ensureCalendars(schoolId){
    ensureSchoolCalendar(schoolId);
    return [];
  }
  function calendarLabel(t){return t==='ACADEMIC'?'Calendário Acadêmico':t==='ADMINISTRATIVE'?'Calendário Administrativo':'Calendário de Eventos / Atividades';}
  function openEventEditor(eventId=null,calendarId=null){const school=schoolForCurrent();if(!school)return;const cs=ensureCalendars(school.id);const existing=eventId?cs.flatMap(c=>c.events.map(e=>({...e,calendarId:c.id}))).find(e=>e.id===eventId):null;calendarId=calendarId||existing?.calendarId||cs[0].id;openModal(existing?'Alterar evento':'Novo evento',`<form id="eventForm" class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid"><div class="full"><label>Calendário</label><select id="eventCalendar">${cs.map(c=>`<option value="${c.id}" ${c.id===calendarId?'selected':''}>${calendarLabel(c.type)}</option>`).join('')}</select></div><div class="full"><label>Título *</label><input id="eventTitle" value="${escapeHtml(existing?.title||'')}" required></div><div><label>Data *</label><input id="eventDate" type="date" value="${existing?.date||''}" required></div><div><label>Data final</label><input id="eventEnd" type="date" value="${existing?.endDate||''}"></div><div><label>Tipo</label><input id="eventType" value="${escapeHtml(existing?.type||'Evento')}"></div></div><div class="form-actions"><button class="btn-primary">Salvar evento</button></div></form>`);document.getElementById('eventForm').onsubmit=e=>{e.preventDefault();const target=state.calendars.find(c=>c.id===document.getElementById('eventCalendar').value);const data={id:existing?.id||crypto.randomUUID(),title:document.getElementById('eventTitle').value,date:document.getElementById('eventDate').value,endDate:document.getElementById('eventEnd').value,type:document.getElementById('eventType').value};if(existing){cs.forEach(c=>c.events=c.events.filter(x=>x.id!==existing.id));}target.events.push(data);save();closeModal();renderCalendar();showToast('Evento salvo.');};}
  function formatDate(s){if(!s)return '-';return new Date(`${s}T12:00:00`).toLocaleDateString('pt-BR');}


  function renderUsers(){
    const f=window.__usf=window.__usf||{q:'',role:''};
    const accounts=state.mockUsers||[];const canEdit=can('permissoes','edit');
    content.innerHTML=`${pageHeader('Usuários e Perfis','Contas de acesso, perfis do sistema e seus níveis de acesso.','<button class="btn-secondary" id="goPerms"><i class="fa-solid fa-lock"></i> Configurar permissões detalhadas</button>')}
      <div class="module-grid">${Object.entries(roles).map(([k,r])=>`<div class="module-card"><div class="module-icon"><i class="fa-solid ${r.icon}"></i></div><h3>${escapeHtml(r.name)}</h3><p>${escapeHtml(r.sector)}</p><span class="badge badge-green">${accounts.filter(u=>u.role===k).length} conta(s)</span></div>`).join('')}</div>
      <div class="table-card" style="margin-top:18px"><div style="display:flex;gap:10px;flex-wrap:wrap;padding:16px"><input id="usQ" type="search" placeholder="Buscar por nome ou e-mail" value="${escapeHtml(f.q)}" style="flex:1;min-width:200px"><select id="usRole"><option value="">Todos os perfis</option>${Object.entries(roles).map(([k,r])=>`<option value="${k}" ${k===f.role?'selected':''}>${escapeHtml(r.name)}</option>`).join('')}</select></div><div id="usTbl"></div></div>`;
    const draw=()=>{
      const q=f.q.trim().toLowerCase();
      const l=accounts.filter(u=>(!f.role||u.role===f.role)&&(!q||(u.name+' '+u.email).toLowerCase().includes(q))).sort((a,b)=>a.name.localeCompare(b.name));const p=paginate(l,'usr');
      document.getElementById('usTbl').innerHTML=`<div class="table-wrap"><table><thead><tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Escola</th><th>Função</th><th>Situação</th><th>Ações</th></tr></thead><tbody>${p.slice.length?p.slice.map(u=>`<tr><td><strong>${escapeHtml(u.name)}</strong>${u.id===state.currentUserId?' <span class="badge">você</span>':''}</td><td>${escapeHtml(u.email)}</td><td>${escapeHtml(roles[u.role]?.name||u.role)}</td><td>${escapeHtml(state.schools.find(s=>s.id===u.schoolId)?.name||'—')}</td><td>${escapeHtml(u.vinculoLabel||'—')}</td><td>${badge(u.status||'Ativo',{'Ativo':'badge-green','Inativo':'badge-gray'})}</td><td>${canEdit?`<button class="small-button us-toggle" data-id="${u.id}" title="${u.status==='Ativo'?'Desativar':'Ativar'} conta"><i class="fa-solid ${u.status==='Ativo'?'fa-user-slash':'fa-user-check'}"></i></button><button class="small-button us-pass" data-id="${u.id}" title="Redefinir senha"><i class="fa-solid fa-key"></i></button>`:''}</td></tr>`).join(''):'<tr><td colspan="7"><div class="empty-state" style="border:none">Nenhuma conta encontrada.</div></td></tr>'}</tbody></table></div>${paginationHtml(p,'usr')}`;
      bindPagination('usr',draw);
      document.querySelectorAll('.us-toggle').forEach(b=>b.onclick=()=>{
        const u=accounts.find(x=>x.id===b.dataset.id);if(!u)return;
        if(u.id===state.currentUserId) return showToast('Você não pode desativar a própria conta.');
        const activate=u.status!=='Ativo';
        if(!activate&&u.role==='direcao'&&accounts.filter(x=>x.role==='direcao'&&x.status==='Ativo').length<=1) return showToast('É preciso manter ao menos uma conta de Direção ativa.');
        confirmAction(activate?'Ativar conta':'Desativar conta',`${activate?'Ativar':'Desativar'} a conta de ${escapeHtml(u.name)}? ${activate?'':'Ela não poderá mais entrar no sistema.'}`,()=>{u.status=activate?'Ativo':'Inativo';logAudit('Usuários',activate?'Ativação de conta':'Desativação de conta',u.name);save();draw();showToast('Conta atualizada.');},activate?'Ativar':'Desativar');
      });
      document.querySelectorAll('.us-pass').forEach(b=>b.onclick=()=>{
        const u=accounts.find(x=>x.id===b.dataset.id);if(!u)return;
        openModal(`Redefinir senha — ${u.name}`,`<form id="pwForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid"><div><label>Nova senha *</label><input id="pwNew" type="password" autocomplete="new-password"></div><div><label>Confirmar senha *</label><input id="pwConf" type="password" autocomplete="new-password"></div></div><small class="muted">Mínimo de 6 caracteres. Em produção, as senhas devem ser guardadas com hash no servidor.</small><div class="form-actions"><button class="btn-primary">Salvar nova senha</button></div></form>`);
        document.getElementById('pwForm').onsubmit=e=>{e.preventDefault();const a1=document.getElementById('pwNew').value,a2=document.getElementById('pwConf').value;
          if(a1.length<6) return formError('A senha deve ter ao menos 6 caracteres.');
          if(a1!==a2) return formError('As senhas não coincidem.');
          u.password=a1;logAudit('Usuários','Redefinição de senha',u.name);save();closeModal();showToast('Senha redefinida.');};
      });
    };
    document.getElementById('usQ').oninput=e=>{f.q=e.target.value;window.__pg&&window.__pg.usr&&(window.__pg.usr.page=1);draw();};
    document.getElementById('usRole').onchange=e=>{f.role=e.target.value;window.__pg&&window.__pg.usr&&(window.__pg.usr.page=1);draw();};
    document.getElementById('goPerms')?.addEventListener('click',()=>navigate('permissions'));
    draw();
  }
  function renderReports(){
    const school=schoolForCurrent();
    const cls=state.classes.filter(c=>c.schoolId===school?.id);
    const byS=arr=>(state[arr]||[]).filter(x=>x.schoolId===school?.id);
    const rhCards=state.role==='rh'?`${statCard('Vagas abertas',byS('jobs').filter(j=>j.status==='Aberta').length,'fa-bullhorn')}${statCard('Funcionários ativos',byS('employees').filter(e=>e.status==='Ativo').length,'fa-id-card')}${statCard('Afastamentos ativos',byS('leaves').filter(l=>l.status==='Em andamento').length,'fa-bed-pulse')}${statCard('Rescisões no ano',byS('terminations').length,'fa-file-signature')}${statCard('Treinamentos realizados',byS('trainings').filter(t=>t.status==='Concluído').length,'fa-chalkboard')}${statCard('Avaliações de desempenho',byS('evaluations').length,'fa-star-half-stroke')}${statCard('Pesquisas de clima',byS('climateSurveys').length,'fa-face-smile')}${statCard('Registros de SST',byS('safety').length,'fa-briefcase-medical')}${statCard('Apurações de ouvidoria',byS('ethicsCases').length,'fa-user-secret')}`:'';
    const atendimentoCards=state.role==='secretaria'?`${statCard('Solicitações em aberto',byS('serviceRequests').filter(r=>r.status!=='Concluída'&&r.status!=='Cancelada').length,'fa-ticket')}${statCard('Solicitações concluídas',byS('serviceRequests').filter(r=>r.status==='Concluída').length,'fa-circle-check')}${statCard('Documentos emitidos',byS('documentIssuances').length,'fa-file-export')}${statCard('Agendamentos',byS('appointments').length,'fa-calendar-check')}${statCard('Atestados',byS('certificates').length,'fa-file-medical')}${statCard('Ocorrências',byS('occurrences').length,'fa-clipboard-list')}`:'';
    const gestaoCards=state.role==='secretaria'?`${statCard('Matrículas/transferências no período',byS('enrollmentRequests').length,'fa-user-pen')}${statCard('Matrículas concluídas',byS('enrollmentRequests').filter(r=>r.status==='Concluída').length,'fa-circle-check')}${statCard('Períodos letivos cadastrados',byS('academicPeriods').length,'fa-calendar-check')}`:'';
    const direcaoCards=state.role==='direcao'?`${statCard('Lançamentos financeiros',byS('financeRecords').length,'fa-sack-dollar')}${statCard('Inadimplência (em aberto/atrasado)',byS('financeRecords').filter(f=>f.status==='Em aberto'||f.status==='Atrasado').length,'fa-triangle-exclamation')}${statCard('Comunicados publicados',byS('announcements').length,'fa-bullhorn')}${statCard('Registros de auditoria',byS('auditLog').length,'fa-magnifying-glass-chart')}`:'';
    content.innerHTML=`${pageHeader('Relatórios','Indicadores básicos da escola ativa.')}<div class="stat-grid">${statCard('Turmas',cls.length,'fa-people-roof')}${statCard('Alunos',state.students.filter(s=>s.schoolId===school?.id).length,'fa-user-graduate')}${statCard('Professores',state.teachers.filter(t=>t.schoolId===school?.id).length,'fa-chalkboard-user')}${statCard('Eventos',state.calendars.filter(c=>c.schoolId===school?.id).reduce((a,c)=>a+c.events.length,0),'fa-calendar-days')}</div>${rhCards?`<div class="stat-grid">${rhCards}</div>`:''}${atendimentoCards?`<div class="stat-grid">${atendimentoCards}</div>`:''}${gestaoCards?`<div class="stat-grid">${gestaoCards}</div>`:''}${direcaoCards?`<div class="stat-grid">${direcaoCards}</div>`:''}${reportChartsHtml(school,cls)}`;
    bindReportCharts(school,cls);
  }
  // ----- Relatórios: gráficos e resumo por turma (dados agregados, sem expor dados individuais) -----
  function classSummaries(school,cls){
    return cls.map(c=>{
      const alunos=state.students.filter(s=>s.schoolId===school?.id&&s.classId===c.id&&activeStudent(s));
      const recs=(state.lessonRecords||[]).filter(r=>r.schoolId===school?.id&&r.classId===c.id);
      let pres=0,tot=0;recs.forEach(r=>(r.attendance||[]).forEach(a=>{tot++;if(a.status==='Presente'||a.status==='Falta Justificada')pres++;}));
      const meds=(state.grades||[]).filter(g=>g.schoolId===school?.id&&g.classId===c.id).map(g=>gradeMedia(g,weightsFor(c.id,g.subject))).filter(m=>m!==null);
      return {label:classLabel(c),alunos:alunos.length,freq:tot?Math.round(pres/tot*1000)/10:null,media:meds.length?Math.round(meds.reduce((a,b)=>a+b,0)/meds.length*10)/10:null};
    });
  }
  function reportChartsHtml(school,cls){
    if(!can('alunos','view')||!cls.length) return '';
    const sm=classSummaries(school,cls);
    const occ={};(state.occurrences||[]).filter(o=>o.schoolId===school?.id).forEach(o=>{occ[o.type||'Outro']=(occ[o.type||'Outro']||0)+1;});
    const panel=(t,b)=>`<div class="card"><div class="card-title"><div><h3>${t}</h3></div></div>${b}</div>`;
    return `<div class="dies-grid" style="margin-top:18px">
      ${panel('Alunos ativos por turma',dBars(sm.map(x=>({label:x.label,value:x.alunos}))))}
      ${panel('Frequência média por turma (%)',dBars(sm.map(x=>({label:x.label,value:x.freq||0}))))}
      ${panel('Média geral por turma (0 a 10)',dBars(sm.map(x=>({label:x.label,value:x.media||0}))))}
      ${panel('Ocorrências por tipo',dBars(Object.entries(occ).map(([label,value])=>({label,value}))))}</div>
      <div class="form-actions" style="justify-content:flex-start"><button class="btn-secondary" id="rpClassCsv"><i class="fa-solid fa-file-csv"></i> Exportar resumo por turma (CSV)</button></div>`;
  }
  function bindReportCharts(school,cls){
    document.getElementById('rpClassCsv')?.addEventListener('click',()=>exportCsv('resumo-por-turma.csv',[['Turma','Alunos ativos','Frequência média (%)','Média geral'],...classSummaries(school,cls).map(x=>[x.label,x.alunos,x.freq??'',x.media??''])]));
  }
  function renderDocuments(){content.innerHTML=`${pageHeader('Documentação Acadêmica','Emita documentos oficiais e consulte a documentação dos alunos.')}<div class="module-grid"><div class="module-card"><div class="module-icon"><i class="fa-solid fa-file-export"></i></div><h3>Emissão rápida de documentos</h3><p>Boletim, histórico, declarações e certificados, prontos para impressão.</p><button class="btn-secondary" data-page="documentIssuances">Abrir emissão</button></div><div class="module-card"><div class="module-icon"><i class="fa-solid fa-folder-open"></i></div><h3>Gestão documental</h3><p>Documentos dos alunos: RG, CPF, comprovantes e documentos acadêmicos.</p><button class="btn-secondary" data-page="studentDocuments">Abrir gestão documental</button></div><div class="module-card"><div class="module-icon"><i class="fa-solid fa-user-pen"></i></div><h3>Matrículas e transferências</h3><p>Matrícula inicial, rematrícula, trancamento e transferências.</p><button class="btn-secondary" data-page="enrollmentRequests">Abrir matrículas</button></div></div>`;document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>navigate(b.dataset.page));}
  function renderCertificates(){
    const school=schoolForCurrent();
    const list=state.certificates.filter(x=>x.schoolId===school?.id).sort((a,b)=>a.start.localeCompare(b.start));
    const year=new Date().getFullYear();
    content.innerHTML=`${pageHeader('Atestados de Alunos','Registre atestados apresentados na secretaria e acompanhe os períodos pelo calendário anual.','<button class="btn-primary" id="newCertificate"><i class="fa-solid fa-plus"></i> Adicionar atestado</button>')}
      <div class="card annual-calendar-card"><div class="card-title"><div><h3>Calendário anual ${year}</h3><span>As datas com atestado ficam marcadas no calendário.</span></div><span class="badge badge-green">Calendário da secretaria</span></div><div>${renderAnnualCalendarWithCertificates(year,list)}</div></div>
      <div class="table-card"><div class="table-wrap"><table><thead><tr><th>Aluno</th><th>Início</th><th>Término</th><th>Dias</th><th>Motivo / Observação</th><th>Ação</th></tr></thead><tbody>${list.length?list.map(a=>`<tr><td><strong>${escapeHtml(a.studentName)}</strong></td><td>${formatDate(a.start)}</td><td>${formatDate(a.end)}</td><td>${diffDays(a.start,a.end)}</td><td>${escapeHtml(a.reason||'-')}</td><td><button class="small-button certificate-edit" data-id="${a.id}"><i class="fa-solid fa-pen"></i></button></td></tr>`).join(''):'<tr><td colspan="6" style="text-align:center;padding:30px">Nenhum atestado registrado.</td></tr>'}</tbody></table></div></div>`;
    document.getElementById('newCertificate').onclick=()=>openCertificateEditor();
    document.querySelectorAll('.certificate-edit').forEach(b=>b.onclick=()=>openCertificateEditor(b.dataset.id));
  }
  function renderAnnualCalendarWithCertificates(year,certs){
    const monthNames=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const week=['D','S','T','Q','Q','S','S'];
    return `<div class="certificate-calendar-grid">${monthNames.map((month,mi)=>{
      const first=new Date(year,mi,1), days=new Date(year,mi+1,0).getDate(), offset=first.getDay();
      let cells='';
      for(let i=0;i<offset;i++) cells+='<span class="certificate-day empty"></span>';
      for(let d=1;d<=days;d++){
        const iso=`${year}-${String(mi+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const hits=certs.filter(c=>iso>=c.start&&iso<=c.end);
        const names=[...new Set(hits.map(c=>c.studentName))];
        cells+=`<button type="button" class="certificate-day ${hits.length?'has-certificate':''}" data-date="${iso}" title="${escapeHtml(names.join(' • ')||'Selecionar data')}">${d}</button>`;
      }
      return `<section class="certificate-month"><h4>${month} <small>${year}</small></h4><div class="certificate-week">${week.map(w=>`<span>${w}</span>`).join('')}</div><div class="certificate-days">${cells}</div></section>`;
    }).join('')}</div>`;
  }
  function diffDays(start,end){if(!start||!end)return 0;return Math.max(1,Math.floor((new Date(end+'T12:00:00')-new Date(start+'T12:00:00'))/86400000)+1);}
  function openCertificateEditor(id=null){
    const school=schoolForCurrent(); if(!school){showToast('Cadastre uma escola primeiro.');return;}
    const existing=state.certificates.find(x=>x.id===id)||{};
    const students=state.students.filter(s=>s.schoolId===school.id);
    const defaultStart=existing.start||'';
    const defaultEnd=existing.end||existing.start||'';
    const tempYear=(defaultStart||todayIso()).slice(0,4);
    openModal(id?'Alterar atestado':'Adicionar atestado',`
      <div class="certificate-editor">
        <form id="certificateForm" class="form-card" style="border:none;padding:0;max-width:none">
          <div class="form-grid">
            <div class="full"><label>Aluno *</label><select id="certStudent" required><option value="">Selecione o aluno</option>${students.map(s=>`<option value="${s.id}" ${s.id===existing.studentId?'selected':''}>${escapeHtml(s.name)}${s.registration?` — ${escapeHtml(s.registration)}`:''}</option>`).join('')}</select></div>
            <div><label>Data inicial *</label><input id="certStart" type="date" value="${defaultStart}" required></div>
            <div><label>Data final *</label><input id="certEnd" type="date" value="${defaultEnd}" required></div>
          </div>
          <div class="certificate-calendar-head"><div><strong>Selecione no calendário o período do atestado</strong><span>Clique no primeiro dia e depois no último dia. O período ficará marcado.</span></div><div class="certificate-calendar-year"><button type="button" class="small-button" id="certPrevYear">‹</button><strong id="certCalendarYear">${tempYear}</strong><button type="button" class="small-button" id="certNextYear">›</button></div></div>
          <div id="certificatePicker">${renderAnnualCalendarWithCertificates(Number(tempYear),state.certificates.filter(x=>x.schoolId===school.id))}</div>
          <div class="certificate-selection-status" id="certificateSelectionStatus"><i class="fa-solid fa-calendar-check"></i><span>Escolha a data inicial e a data final no calendário.</span></div>
          <div class="form-grid">
            <div class="full"><label>Motivo / observação</label><textarea id="certReason" rows="3" placeholder="Ex.: afastamento médico / documento apresentado na secretaria">${escapeHtml(existing.reason||'')}</textarea></div>
            <div><label>Documento / número</label><input id="certDoc" value="${escapeHtml(existing.document||'')}" placeholder="Opcional"></div>
          </div>
          <div class="form-actions"><button class="btn-primary" type="submit"><i class="fa-solid fa-check"></i> Salvar atestado</button></div>
        </form>
      </div>`);

    let selectedStart=defaultStart, selectedEnd=defaultEnd;
    let calendarYear=Number(tempYear);
    const refreshCalendar=()=>{
      document.getElementById('certCalendarYear').textContent=calendarYear;
      document.getElementById('certificatePicker').innerHTML=renderAnnualCalendarWithCertificates(calendarYear,state.certificates.filter(x=>x.schoolId===school.id));
      bindCertificateCalendar();
      updateSelectionUI();
    };
    const updateInputs=()=>{
      document.getElementById('certStart').value=selectedStart||'';
      document.getElementById('certEnd').value=selectedEnd||'';
    };
    const updateSelectionUI=()=>{
      const status=document.getElementById('certificateSelectionStatus');
      if(!status)return;
      if(selectedStart&&selectedEnd) status.innerHTML=`<i class="fa-solid fa-calendar-check"></i><span>Período selecionado: <strong>${formatDate(selectedStart)}</strong> até <strong>${formatDate(selectedEnd)}</strong> (${diffDays(selectedStart,selectedEnd)} dia(s)).</span>`;
      else if(selectedStart) status.innerHTML=`<i class="fa-solid fa-calendar-day"></i><span>Data inicial: <strong>${formatDate(selectedStart)}</strong>. Agora selecione o último dia.</span>`;
      else status.innerHTML='<i class="fa-solid fa-calendar-check"></i><span>Escolha a data inicial e a data final no calendário.</span>';
      document.querySelectorAll('#certificatePicker .certificate-day:not(.empty)').forEach(btn=>{
        const d=btn.dataset.date;
        const inRange=selectedStart&&selectedEnd&&d>=selectedStart&&d<=selectedEnd;
        btn.classList.toggle('picker-start',d===selectedStart);
        btn.classList.toggle('picker-end',d===selectedEnd);
        btn.classList.toggle('picker-range',!!inRange);
      });
    };
    const bindCertificateCalendar=()=>{
      document.querySelectorAll('#certificatePicker .certificate-day:not(.empty)').forEach(btn=>btn.onclick=()=>{
        const d=btn.dataset.date;
        if(!selectedStart|| (selectedStart&&selectedEnd)){ selectedStart=d; selectedEnd=''; }
        else { selectedEnd=d<selectedStart?selectedStart:d; selectedStart=d<selectedStart?d:selectedStart; }
        calendarYear=Number((selectedStart||d).slice(0,4));
        updateInputs(); updateSelectionUI();
      });
    };
    document.getElementById('certStart').onchange=e=>{selectedStart=e.target.value; if(selectedEnd&&selectedEnd<selectedStart)selectedEnd=''; calendarYear=Number((selectedStart||calendarYear)); refreshCalendar();};
    document.getElementById('certEnd').onchange=e=>{selectedEnd=e.target.value; if(selectedStart&&selectedEnd<selectedStart){showToast('A data final não pode ser anterior à inicial.');selectedEnd='';} updateSelectionUI();};
    document.getElementById('certPrevYear').onclick=()=>{calendarYear--; refreshCalendar();};
    document.getElementById('certNextYear').onclick=()=>{calendarYear++; refreshCalendar();};
    bindCertificateCalendar(); updateSelectionUI();
    document.getElementById('certificateForm').onsubmit=e=>{
      e.preventDefault();
      const st=students.find(x=>x.id===document.getElementById('certStudent').value);
      const start=document.getElementById('certStart').value, end=document.getElementById('certEnd').value;
      if(!st)return showToast('Selecione o aluno.');
      if(!start||!end)return showToast('Selecione no calendário a data inicial e a data final.');
      if(end<start)return showToast('A data final não pode ser anterior à inicial.');
      const data={id:id||crypto.randomUUID(),schoolId:school.id,studentId:st.id,studentName:st.name,start,end,reason:document.getElementById('certReason').value.trim(),document:document.getElementById('certDoc').value.trim(),updatedAt:new Date().toISOString()};
      if(id)Object.assign(existing,data);else state.certificates.push(data);
      save(); closeModal(); renderCertificates(); showToast('Atestado registrado e período marcado no calendário.');
    };
  }

  function renderOccurrences(){renderCrud(crudModules.occurrences);}
  function renderGrades(){const school=schoolForCurrent();const cls=state.classes.find(c=>c.schoolId===school?.id);content.innerHTML=`${pageHeader(state.role==='aluno'?'Boletim e Frequência':'Notas e Frequência','Área preparada para lançamento e consulta acadêmica.')}${cls?`<div class="card"><h3>${escapeHtml(cls.name)} — ${escapeHtml(cls.grade)}</h3><p class="muted">O professor lança notas e faltas com base na grade horária atribuída pela secretaria.</p></div>`:'<div class="empty-state">Nenhuma turma disponível.</div>'}`;}
  function renderSchedule(){const school=schoolForCurrent();const cls=state.classes.find(c=>c.schoolId===school?.id);content.innerHTML=`${pageHeader('Grade Horária','Grade gerada automaticamente a partir da matriz curricular.')}${cls?scheduleTable(cls.schedule):'<div class="empty-state">Crie uma turma para gerar a grade.</div>'}`;}
  function renderContent(){content.innerHTML=`${pageHeader('Conteúdos das aulas','Professor registra conteúdos conforme suas aulas e horários atribuídos.')}<div class="empty-state">Selecione uma turma para começar.</div>`;}
  function renderGeneric(page,title){content.innerHTML=`${pageHeader(title,'Módulo preparado para evolução do sistema.')}<div class="empty-state">Este módulo está estruturado na arquitetura do SIGED e será conectado às operações correspondentes.</div>`;}

  const jobStatusBadge={'Aguardando aprovação':'badge-yellow',Aberta:'badge-green',Reprovada:'badge-red',Fechada:'badge-gray'};
  const candStatusBadge={Triagem:'badge-blue',Entrevista:'badge-yellow',Aprovado:'badge-green',Reprovado:'badge-red',Contratado:'badge-green'};
  function renderJobs(){
    const school=schoolForCurrent();
    const jobs=(state.jobs||[]).filter(j=>j.schoolId===school?.id);
    const isDirecao=can('vagas','approve');
    content.innerHTML=`${pageHeader(isDirecao?'Aprovação de Vagas':'Vagas abertas',isDirecao?'Aprove ou reprove os pedidos de abertura de vaga/turma solicitados pelo RH, conforme o processo de contratação.':'Solicite a abertura de vagas para professores e funcionários. A Direção aprova antes da publicação.','<button class="btn-primary" id="newJob"><i class="fa-solid fa-plus"></i> Nova vaga</button>')}<div class="table-card"><div class="table-wrap"><table><thead><tr><th>Vaga</th><th>Setor</th><th>Tipo</th><th>Candidatos</th><th>Status</th><th>Ação</th></tr></thead><tbody>${jobs.length?jobs.map(j=>{const n=(state.candidates||[]).filter(c=>c.jobId===j.id).length;const pending=j.status==='Aguardando aprovação';return `<tr><td><strong>${escapeHtml(j.title)}</strong></td><td>${escapeHtml(j.sector)}</td><td>${escapeHtml(j.type)}</td><td>${n}</td><td><span class="badge ${jobStatusBadge[j.status]||'badge-gray'}">${escapeHtml(j.status)}</span></td><td>${isDirecao&&pending?`<button class="small-button job-approve" data-id="${j.id}" title="Aprovar"><i class="fa-solid fa-check"></i></button> <button class="small-button job-reject" data-id="${j.id}" title="Reprovar"><i class="fa-solid fa-xmark"></i></button>`:`<button class="small-button job-cands" data-id="${j.id}" title="Ver candidatos"><i class="fa-solid fa-user-check"></i></button> <button class="small-button job-edit" data-id="${j.id}"><i class="fa-solid fa-pen"></i></button>`}</td></tr>`;}).join(''):'<tr><td colspan="6" style="text-align:center;padding:30px">Nenhuma vaga publicada.</td></tr>'}</tbody></table></div></div>`;
    document.getElementById('newJob').onclick=()=>openJobEditor();
    document.querySelectorAll('.job-edit').forEach(b=>b.onclick=()=>openJobEditor(b.dataset.id));
    document.querySelectorAll('.job-cands').forEach(b=>b.onclick=()=>{window.__rhJobFilter=b.dataset.id;navigate('candidates');});
    document.querySelectorAll('.job-approve').forEach(b=>b.onclick=()=>{const j=state.jobs.find(x=>x.id===b.dataset.id);if(j){j.status='Aberta';logAudit('Vagas','Aprovação',j.title);save();renderJobs();showToast('Vaga aprovada e publicada para o RH.');}});
    document.querySelectorAll('.job-reject').forEach(b=>b.onclick=()=>{const j=state.jobs.find(x=>x.id===b.dataset.id);if(j){j.status='Reprovada';logAudit('Vagas','Reprovação',j.title);save();renderJobs();showToast('Solicitação de vaga reprovada.');}});
  }

  function openJobEditor(id=null){
    const school=schoolForCurrent();
    if(!school){showToast('Cadastre uma escola primeiro.');return;}
    const j=(state.jobs||[]).find(x=>x.id===id)||{};
    const isDirecao=can('vagas','approve');
    const statusField = isDirecao
      ? `<div><label>Status</label><select id="jobStatus"><option ${j.status==='Aguardando aprovação'?'selected':''}>Aguardando aprovação</option><option ${j.status==='Aberta'?'selected':''}>Aberta</option><option ${j.status==='Reprovada'?'selected':''}>Reprovada</option><option ${j.status==='Fechada'?'selected':''}>Fechada</option></select></div>`
      : (id ? `<div><label>Status</label><input value="${escapeHtml(j.status||'')}" disabled><small class="muted">Somente a Direção altera o status de aprovação.</small></div>` : '');
    openModal(id?'Alterar vaga':'Solicitar abertura de vaga',`${!id?'<div class="alert alert-info">Ao salvar, a solicitação segue para aprovação da Direção antes de ficar disponível para candidatos.</div>':''}<form id="jobForm" class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid"><div class="full"><label>Cargo / título da vaga *</label><input id="jobTitle" value="${escapeHtml(j.title||'')}" required placeholder="Ex.: Professor de Matemática"></div><div><label>Setor</label><select id="jobSector"><option ${j.sector==='Pedagógico'?'selected':''}>Pedagógico</option><option ${j.sector==='Administrativo'?'selected':''}>Administrativo</option><option ${j.sector==='Financeiro'?'selected':''}>Financeiro</option><option ${j.sector==='TI'?'selected':''}>TI</option><option ${j.sector==='Apoio'?'selected':''}>Apoio / Limpeza</option></select></div><div><label>Tipo</label><select id="jobType"><option ${j.type==='Professor'?'selected':''}>Professor</option><option ${j.type==='Funcionário'?'selected':''}>Funcionário</option></select></div><div class="full"><label>Descrição da vaga</label><textarea id="jobDesc" rows="3">${escapeHtml(j.description||'')}</textarea></div>${statusField}</div><div class="form-actions"><button class="btn-primary">${id?'Salvar vaga':'Enviar para aprovação'}</button></div></form>`);
    document.getElementById('jobForm').onsubmit=e=>{
      e.preventDefault();
      const status = isDirecao ? document.getElementById('jobStatus').value : (id ? j.status : 'Aguardando aprovação');
      const data={id:id||crypto.randomUUID(),schoolId:school.id,title:document.getElementById('jobTitle').value,sector:document.getElementById('jobSector').value,type:document.getElementById('jobType').value,description:document.getElementById('jobDesc').value,status};
      if(id)Object.assign(j,data);else state.jobs.push(data);
      logAudit('Vagas',id?'Alteração':'Solicitação',data.title);
      save();closeModal();renderJobs();showToast(id?'Vaga atualizada.':'Solicitação enviada para aprovação da Direção.');
    };
  }

  function renderCandidates(){
    const school=schoolForCurrent();
    const jobs=(state.jobs||[]).filter(j=>j.schoolId===school?.id);
    let cands=(state.candidates||[]).filter(c=>c.schoolId===school?.id);
    const filterId=window.__rhJobFilter;
    if(filterId)cands=cands.filter(c=>c.jobId===filterId);
    const jobName=id=>jobs.find(j=>j.id===id)?.title||'—';
    content.innerHTML=`${pageHeader('Candidatos',filterId?`Filtrando por: ${escapeHtml(jobName(filterId))}`:'Triagem, entrevista e aprovação de candidatos.',`${filterId?'<button class="btn-secondary" id="clearFilter">Limpar filtro</button> ':''}<button class="btn-primary" id="newCand"><i class="fa-solid fa-plus"></i> Novo candidato</button>`)}<div class="table-card"><div class="table-wrap"><table><thead><tr><th>Nome</th><th>Vaga</th><th>Contato</th><th>Status</th><th>Ação</th></tr></thead><tbody>${cands.length?cands.map(c=>`<tr><td><strong>${escapeHtml(c.name)}</strong></td><td>${escapeHtml(jobName(c.jobId))}</td><td>${escapeHtml(c.contact||'-')}</td><td><span class="badge ${candStatusBadge[c.status]||'badge-gray'}">${escapeHtml(c.status)}</span></td><td>${c.status==='Contratado'?'<span class="muted">Contratado</span>':`<select class="cand-status" data-id="${c.id}"><option ${c.status==='Triagem'?'selected':''}>Triagem</option><option ${c.status==='Entrevista'?'selected':''}>Entrevista</option><option ${c.status==='Aprovado'?'selected':''}>Aprovado</option><option ${c.status==='Reprovado'?'selected':''}>Reprovado</option></select> ${c.status==='Aprovado'?`<button class="small-button cand-hire" data-id="${c.id}" title="Contratar"><i class="fa-solid fa-file-signature"></i></button>`:''}`}</td></tr>`).join(''):'<tr><td colspan="5" style="text-align:center;padding:30px">Nenhum candidato registrado.</td></tr>'}</tbody></table></div></div>`;
    document.getElementById('newCand').onclick=()=>openCandidateEditor();
    document.getElementById('clearFilter')?.addEventListener('click',()=>{window.__rhJobFilter=null;renderCandidates();});
    document.querySelectorAll('.cand-status').forEach(s=>s.onchange=()=>{const c=state.candidates.find(x=>x.id===s.dataset.id);if(c){c.status=s.value;save();renderCandidates();showToast('Status do candidato atualizado.');}});
    document.querySelectorAll('.cand-hire').forEach(b=>b.onclick=()=>openHireEditor(b.dataset.id));
  }

  function openCandidateEditor(){
    const school=schoolForCurrent();
    if(!school){showToast('Cadastre uma escola primeiro.');return;}
    const jobs=(state.jobs||[]).filter(j=>j.schoolId===school.id&&j.status==='Aberta');
    if(!jobs.length){showToast('É preciso ter uma vaga aprovada e aberta pela Direção antes de cadastrar candidatos.');return;}
    openModal('Novo candidato',`<form id="candForm" class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid"><div class="full"><label>Nome completo *</label><input id="candName" required></div><div><label>Vaga *</label><select id="candJob">${jobs.map(j=>`<option value="${j.id}">${escapeHtml(j.title)}</option>`).join('')}</select></div><div><label>Contato (telefone/e-mail)</label><input id="candContact"></div></div><div class="form-actions"><button class="btn-primary">Registrar candidato</button></div></form>`);
    document.getElementById('candForm').onsubmit=e=>{
      e.preventDefault();
      state.candidates.push({id:crypto.randomUUID(),schoolId:school.id,jobId:document.getElementById('candJob').value,name:document.getElementById('candName').value,contact:document.getElementById('candContact').value,status:'Triagem'});
      save();closeModal();renderCandidates();showToast('Candidato registrado em Triagem.');
    };
  }

  function openHireEditor(candId){
    const school=schoolForCurrent();
    const c=state.candidates.find(x=>x.id===candId);
    const job=state.jobs.find(j=>j.id===c?.jobId);
    if(!c)return;
    openModal('Contratar candidato',`<div class="alert alert-info">Ao confirmar, um cadastro de funcionário é criado e enviado para o Financeiro incluir na folha. O acesso ao sistema é liberado separadamente por TI, na tela de Funcionários.</div><form id="hireForm" class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid"><div class="full"><label>Nome</label><input value="${escapeHtml(c.name)}" disabled></div><div><label>Cargo</label><input id="hireRole" value="${escapeHtml(job?.title||'')}"></div><div><label>Tipo</label><select id="hireType"><option ${job?.type==='Professor'?'selected':''}>Professor</option><option ${job?.type!=='Professor'?'selected':''}>Funcionário</option></select></div><div><label>Data de admissão</label><input id="hireDate" type="date" value="${todayIso()}"></div><div><label>Regime de contratação</label><select id="hireRegime"><option>Mensalista</option><option>Horista</option></select></div><div><label>Salário mensal (R$) — se Mensalista</label><input id="hireSalary" type="number" min="0" step="0.01"></div><div><label>Carga horária semanal (h/aula) — se Horista</label><input id="hireCarga" type="number" min="0" step="1"></div><div><label>Valor da hora-aula (R$) — se Horista</label><input id="hireValorHora" type="number" min="0" step="0.01"></div></div><div class="form-actions"><button class="btn-primary">Confirmar contratação</button></div></form>`);
    document.getElementById('hireForm').onsubmit=e=>{
      e.preventDefault();
      const regime=document.getElementById('hireRegime').value;
      const carga=Number(document.getElementById('hireCarga').value)||0;
      const valorHora=Number(document.getElementById('hireValorHora').value)||0;
      const salarioBase=Number(document.getElementById('hireSalary').value)||0;
      const salary = regime==='Horista' ? Math.round(carga*valorHora*4.5*100)/100 : salarioBase;
      const emp={id:crypto.randomUUID(),schoolId:school.id,name:c.name,role:document.getElementById('hireRole').value,type:document.getElementById('hireType').value,admissionDate:document.getElementById('hireDate').value,regime,cargaHorariaSemanal:carga,valorHora,salary,status:'Aguardando Financeiro',hasAccess:false,ingressType:'Processo seletivo (recrutamento do RH)'};
      state.employees.push(emp);
      c.status='Contratado';
      if(emp.type==='Professor'){state.teachers.push({id:crypto.randomUUID(),schoolId:school.id,name:emp.name,registration:'PROF-'+emp.id.slice(0,5).toUpperCase(),email:'',classId:null,className:'Sem vínculo'});}
      logAudit('Funcionários','Contratação',emp.name);
      save();closeModal();renderCandidates();showToast('Contratação registrada. Dados do colaborador encaminhados ao Financeiro para confirmação.');
    };
  }

  const empStatusBadge={'Aguardando Financeiro':'badge-yellow','Aguardando Liberação de Acesso':'badge-blue',Ativo:'badge-green',Afastado:'badge-yellow',Desligado:'badge-gray'};
  function renderEmployees(){
    const school=schoolForCurrent();
    const emps=(state.employees||[]).filter(e=>e.schoolId===school?.id);
    const isDirecao=can('financeiro','approve');
    content.innerHTML=`${pageHeader(isDirecao?'Confirmação Financeira e Acessos':'Funcionários',isDirecao?'Etapas de Financeiro (confirmar cadastro e liberar para criação de conta) e TI (criar conta, definir permissões e liberar o primeiro acesso).':'Contratos ativos, regime de contratação, cargos e salários. A confirmação financeira e a liberação de acesso são feitas pela Direção (Financeiro/TI).')}<div class="table-card"><div class="table-wrap"><table><thead><tr><th>Nome</th><th>Cargo</th><th>Regime</th><th>Admissão</th><th>Salário</th><th>Status</th><th>Acesso</th><th>Ações</th></tr></thead><tbody>${emps.length?emps.map(e=>{
      let accessCell='<span class="muted">-</span>';
      if(e.hasAccess){accessCell='<span class="badge badge-green">Liberado</span>';}
      else if(isDirecao&&e.status==='Aguardando Financeiro'){accessCell=`<button class="small-button fin-confirm" data-id="${e.id}"><i class="fa-solid fa-check"></i> Confirmar no Financeiro</button>`;}
      else if(isDirecao&&e.status==='Aguardando Liberação de Acesso'){accessCell=`<button class="small-button ti-access" data-id="${e.id}"><i class="fa-solid fa-key"></i> Criar conta (TI)</button>`;}
      else if(e.status==='Aguardando Financeiro'){accessCell='<span class="muted">Aguardando Financeiro</span>';}
      else if(e.status==='Aguardando Liberação de Acesso'){accessCell='<span class="muted">Aguardando TI</span>';}
      return `<tr><td><strong>${escapeHtml(e.name)}</strong></td><td>${escapeHtml(e.role)}</td><td>${escapeHtml(e.regime||e.type||'-')}${e.regime==='Horista'?`<br><small class="muted">${e.cargaHorariaSemanal||0}h/sem · R$ ${Number(e.valorHora||0).toLocaleString('pt-BR',{minimumFractionDigits:2})}/h</small>`:''}</td><td>${formatDate(e.admissionDate)}</td><td>R$ ${Number(e.salary||0).toLocaleString('pt-BR',{minimumFractionDigits:2})}</td><td>${badge(e.status,empStatusBadge)}</td><td>${accessCell}</td><td>${e.status!=='Desligado'?`<button class="small-button emp-leave" data-id="${e.id}" title="Registrar afastamento"><i class="fa-solid fa-bed-pulse"></i></button> <button class="small-button emp-term" data-id="${e.id}" title="Registrar rescisão"><i class="fa-solid fa-file-signature"></i></button>`:'<span class="muted">Desligado</span>'}</td></tr>`;
    }).join(''):'<tr><td colspan="8" style="text-align:center;padding:30px">Nenhum funcionário contratado ainda.</td></tr>'}</tbody></table></div></div>`;
    document.querySelectorAll('.fin-confirm').forEach(b=>b.onclick=()=>{const e=state.employees.find(x=>x.id===b.dataset.id);if(e){e.status='Aguardando Liberação de Acesso';logAudit('Financeiro','Confirmação de contratação',e.name);save();renderEmployees();showToast(`Cadastro financeiro de ${e.name} confirmado. Liberado para a TI criar a conta.`);}});
    document.querySelectorAll('.ti-access').forEach(b=>b.onclick=()=>openAccessEditor(b.dataset.id));
    document.querySelectorAll('.emp-leave').forEach(b=>b.onclick=()=>openCrudEditor(crudModules.leaves,null,{employeeId:b.dataset.id}));
    document.querySelectorAll('.emp-term').forEach(b=>b.onclick=()=>openCrudEditor(crudModules.terminations,null,{employeeId:b.dataset.id}));
  }

  function openAccessEditor(empId){
    const e=state.employees.find(x=>x.id===empId);
    if(!e)return;
    const school=schoolForCurrent();
    const isProf=e.type==='Professor';
    const classes=state.classes.filter(c=>c.schoolId===school?.id);
    openModal('TI — Criar conta e definir acesso',`<div class="alert alert-info">Etapa de TI: criar a conta de usuário, decidir o tipo de acesso e enviar as credenciais por e-mail.</div><form id="accessForm" class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid"><div class="full"><label>Colaborador</label><input value="${escapeHtml(e.name)}" disabled></div><div class="full"><label>É professor?</label><input value="${isProf?'Sim — será associado a turmas e disciplinas':'Não — funcionário administrativo/apoio'}" disabled></div>${isProf?`<div class="full"><label>Turma inicial (opcional)</label><select id="accessClass"><option value="">Sem vínculo por enquanto</option>${classes.map(c=>`<option value="${c.id}">${escapeHtml(c.name)} — ${escapeHtml(c.grade)}</option>`).join('')}</select></div>`:`<div class="full"><label>Perfil de permissões</label><select id="accessProfile"><option>Administrativo</option><option>Secretaria</option><option>Financeiro</option><option>Apoio / Limpeza</option><option>TI</option></select></div>`}<div class="full"><label>E-mail institucional</label><input id="accessEmail" type="email" placeholder="nome@escola.com.br" required></div></div><div class="form-actions"><button class="btn-primary">Criar conta e liberar acesso</button></div></form>`);
    document.getElementById('accessForm').onsubmit=ev=>{
      ev.preventDefault();
      const email=document.getElementById('accessEmail').value;
      e.hasAccess=true; e.status='Ativo'; e.email=email;
      if(isProf){
        const classId=document.getElementById('accessClass').value;
        const cls=classes.find(c=>c.id===classId);
        const teacher=state.teachers.find(t=>t.schoolId===school.id&&t.name===e.name);
        if(teacher){teacher.email=email; if(cls){teacher.classId=cls.id;teacher.className=cls.name;}}
      } else {
        e.accessProfile=document.getElementById('accessProfile').value;
      }
      logAudit('TI','Criação de conta e liberação de acesso',`${e.name} — e-mail de boas-vindas enviado para ${email}`);
      save();closeModal();renderEmployees();showToast(`Conta criada. E-mail de boas-vindas enviado para ${email}. ${e.name} já pode fazer o primeiro acesso.`);
    };
  }

  function renderPayroll(){
    const school=schoolForCurrent();
    const emps=(state.employees||[]).filter(e=>e.schoolId===school?.id&&e.status==='Ativo');
    const mensalistas=emps.filter(e=>e.regime!=='Horista');
    const horistas=emps.filter(e=>e.regime==='Horista');
    const total=emps.reduce((a,e)=>a+(e.salary||0),0);
    const benefitsTotal=(state.benefits||[]).filter(b=>b.schoolId===school?.id&&b.status==='Ativo').reduce((a,b)=>a+(Number(b.value)||0),0);
    const runs=(state.payrollRuns||[]).filter(r=>r.schoolId===school?.id).sort((a,b)=>b.date.localeCompare(a.date));
    content.innerHTML=`${pageHeader('Folha de pagamento','Consolide salários (mensalistas e horistas, com DSR embutido), benefícios e gere a folha do mês.','<button class="btn-primary" id="runPayroll"><i class="fa-solid fa-play"></i> Gerar folha do mês</button>')}<div class="stat-grid">${statCard('Funcionários ativos',emps.length,'fa-id-card')}${statCard('Mensalistas',mensalistas.length,'fa-user-tie')}${statCard('Horistas (hora-aula)',horistas.length,'fa-clock')}${statCard('Total da folha',`R$ ${total.toLocaleString('pt-BR',{minimumFractionDigits:2})}`,'fa-sack-dollar')}</div><div class="alert alert-info">Benefícios ativos (plano de saúde, vale-transporte, bolsas de estudo) somam R$ ${benefitsTotal.toLocaleString('pt-BR',{minimumFractionDigits:2})}/mês, à parte da folha salarial. Para horistas, o valor estimado já inclui DSR e hora-atividade proporcional.</div><div class="card"><div class="card-title"><div><h3>Histórico de folhas geradas</h3></div></div>${runs.length?`<div class="table-wrap"><table><thead><tr><th>Gerada em</th><th>Funcionários</th><th>Total</th></tr></thead><tbody>${runs.map(r=>`<tr><td>${formatDate(r.date)}</td><td>${r.count}</td><td>R$ ${r.total.toLocaleString('pt-BR',{minimumFractionDigits:2})}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty-state">Nenhuma folha gerada ainda.</div>'}</div>`;
    document.getElementById('runPayroll').onclick=()=>{
      state.payrollRuns.push({id:crypto.randomUUID(),schoolId:school.id,date:todayIso(),count:emps.length,total});
      logAudit('Folha de pagamento','Geração de folha',`${emps.length} funcionários — R$ ${total.toLocaleString('pt-BR',{minimumFractionDigits:2})}`);
      save();renderPayroll();showToast('Folha do mês gerada e enviada à Direção.');
    };
  }

  // ===== Módulos genéricos de RH (Departamento Pessoal, T&D, Clima, Compliance, Ética) =====

  function employeeName(id){return (state.employees||[]).find(e=>e.id===id)?.name||'—';}
  function studentName(id){return (state.students||[]).find(s=>s.id===id)?.name||'—';}
  function badge(value,map){return `<span class="badge ${map[value]||'badge-gray'}">${escapeHtml(value||'-')}</span>`;}

  function fieldHtml(f,item){
    const val = item[f.key] ?? f.default ?? '';
    const cls = f.full ? 'full' : '';
    if (f.type === 'select') {
      return `<div class="${cls}"><label>${f.label}${f.required?' *':''}</label><select id="f_${f.key}" ${f.required?'required':''}>${f.options.map(o=>`<option value="${escapeHtml(o)}" ${String(val)===o?'selected':''}>${escapeHtml(o)}</option>`).join('')}</select></div>`;
    }
    if (f.type === 'textarea') {
      return `<div class="${cls}"><label>${f.label}${f.required?' *':''}</label><textarea id="f_${f.key}" rows="${f.rows||3}" ${f.required?'required':''}>${escapeHtml(val)}</textarea></div>`;
    }
    if (f.type === 'employee') {
      const school = schoolForCurrent();
      const emps = (state.employees||[]).filter(e=>e.schoolId===school?.id);
      return `<div class="${cls}"><label>${f.label}${f.required?' *':''}</label><select id="f_${f.key}" ${f.required?'required':''}><option value="">${f.optional?'— não se aplica / institucional —':'Selecione'}</option>${emps.map(e=>`<option value="${e.id}" ${val===e.id?'selected':''}>${escapeHtml(e.name)}</option>`).join('')}</select></div>`;
    }
    if (f.type === 'student') {
      const school = schoolForCurrent();
      const studs = (state.students||[]).filter(s=>s.schoolId===school?.id);
      return `<div class="${cls}"><label>${f.label}${f.required?' *':''}</label><select id="f_${f.key}" ${f.required?'required':''}><option value="">Selecione</option>${studs.map(s=>`<option value="${s.id}" ${val===s.id?'selected':''}>${escapeHtml(s.name)}</option>`).join('')}</select></div>`;
    }
    if (f.type === 'class') {
      const school = schoolForCurrent();
      const classes = (state.classes||[]).filter(c=>c.schoolId===school?.id);
      return `<div class="${cls}"><label>${f.label}${f.required?' *':''}</label><select id="f_${f.key}" ${f.required?'required':''}><option value="">Selecione</option>${classes.map(c=>`<option value="${c.id}" ${val===c.id?'selected':''}>${escapeHtml(classLabel(c))}</option>`).join('')}</select></div>`;
    }
    if (f.type === 'file') {
      const existing = item[f.key];
      return `<div class="${cls}"><label>${f.label}${f.required?' *':''}</label>
        ${existing?`<div class="file-current"><i class="fa-solid fa-paperclip"></i> <span>${escapeHtml(existing.name)}</span> <small class="muted">(${(existing.size/1024).toFixed(0)} KB)</small> <a href="${existing.dataUrl}" download="${escapeHtml(existing.name)}" class="file-download"><i class="fa-solid fa-download"></i> baixar</a> <label class="file-remove"><input type="checkbox" id="f_${f.key}_remove"> remover anexo</label></div>`:''}
        <input type="file" id="f_${f.key}" accept="${f.accept||'.pdf,.jpg,.jpeg,.png'}" ${f.required&&!existing?'required':''}>
        <small class="muted">${f.hint||'PDF ou imagem, até 4 MB.'}</small></div>`;
    }
    return `<div class="${cls}"><label>${f.label}${f.required?' *':''}</label><input id="f_${f.key}" type="${f.type||'text'}" ${f.step?`step="${f.step}"`:''} ${f.min!==undefined?`min="${f.min}"`:''} ${f.max!==undefined?`max="${f.max}"`:''} value="${escapeHtml(String(val))}" ${f.required?'required':''}></div>`;
  }

  function nextProtocol(prefix,key){
    const y=new Date().getFullYear();
    const n=(state[key]||[]).filter(x=>String(x.protocol||'').startsWith(`${prefix}-${y}-`)).length+124;
    return `${prefix}-${y}-${String(n).padStart(6,'0')}`;
  }
  function scopeRecords(key,list){
    const role=state.role;
    if(key==='announcements'){
      const map={professor:['Toda a escola','Professores'],aluno:['Toda a escola','Alunos'],responsavel:['Toda a escola','Responsáveis']};
      return map[role]?list.filter(x=>map[role].includes(x.audience)):list;
    }
    let kids=null;
    if(role==='aluno'){const k=selectedChild();kids=k?[k]:[];}
    else if(role==='responsavel'){kids=childrenOfGuardian(myGuardianId());}
    else if(role==='professor'){kids=visibleStudents();}
    if(!kids) return list;
    const ids=new Set(kids.map(k=>k.id)),names=new Set(kids.map(k=>k.name));
    if(key==='occurrences') return list.filter(o=>ids.has(o.studentId)||names.has(o.studentName));
    if(key==='studentDocuments'||key==='financeRecords'||key==='healthRecords') return list.filter(x=>ids.has(x.studentId));
    if(key==='serviceRequests') return list.filter(x=>x.createdBy===state.currentUserId||names.has(x.requester));
    return list;
  }
  function renderCrud(cfg){
    const school = schoolForCurrent();
    const moduleKey = PAGE_MODULE_MAP[cfg.key];
    if(moduleKey && !can(moduleKey,'view')){ renderAccessDenied(cfg.title); return; }
    const canCreate = !moduleKey || can(moduleKey,'create');
    const canEdit = !moduleKey || can(moduleKey,'edit');
    const list = scopeRecords(cfg.key,(state[cfg.key]||[]).filter(x=>x.schoolId===school?.id));
    content.innerHTML = `${pageHeader(cfg.title, cfg.desc, school&&canCreate?`<button class="btn-primary" id="crud_new"><i class="fa-solid fa-plus"></i> ${cfg.addLabel}</button>`:'')}${cfg.info?`<div class="alert alert-info">${cfg.info}</div>`:''}<div class="table-card"><div class="table-wrap"><table><thead><tr>${cfg.columns.map(c=>`<th>${c.label}</th>`).join('')}<th>Ação</th></tr></thead><tbody>${list.length?list.map(item=>`<tr>${cfg.columns.map(c=>`<td>${c.render?c.render(item):escapeHtml(String(item[c.field]??'-'))}</td>`).join('')}<td>${canEdit?`<button class="small-button crud-edit" data-id="${item.id}" title="Editar"><i class="fa-solid fa-pen"></i></button>`:'<span class="muted">Somente leitura</span>'}${cfg.extraAction?` <button class="small-button crud-extra" data-id="${item.id}" title="${cfg.extraAction.label}"><i class="fa-solid ${cfg.extraAction.icon}"></i></button>`:''}</td></tr>`).join(''):`<tr><td colspan="${cfg.columns.length+1}" style="text-align:center;padding:30px">${cfg.emptyText}</td></tr>`}</tbody></table></div></div>`;
    document.getElementById('crud_new')?.addEventListener('click',()=>openCrudEditor(cfg));
    document.querySelectorAll('.crud-edit').forEach(b=>b.onclick=()=>openCrudEditor(cfg,b.dataset.id));
    document.querySelectorAll('.crud-extra').forEach(b=>b.onclick=()=>cfg.extraAction.handler((state[cfg.key]||[]).find(x=>x.id===b.dataset.id)));
  }

  function renderAccessDenied(title){
    content.innerHTML=`${pageHeader(title||'Acesso restrito','')}<div class="empty-state"><i class="fa-solid fa-lock" style="font-size:28px;color:var(--muted);margin-bottom:10px;display:block"></i><strong>Seu perfil não tem permissão para visualizar este módulo.</strong><p>Fale com a Direção caso precise de acesso a esta área (Direção → Permissões por Perfil).</p></div>`;
  }

  function logAudit(module,action,summary,schoolId){
    const school = schoolId?{id:schoolId}:schoolForCurrent();
    state.auditLog = state.auditLog||[];
    state.auditLog.unshift({id:crypto.randomUUID(),schoolId:school?.id,when:new Date().toISOString(),user:state.user,role:roles[state.role]?.name||state.role,module,action,summary});
    if(state.auditLog.length>1000) state.auditLog.length=1000;
  }

  function openCrudEditor(cfg,id=null,presets={}){
    const school = schoolForCurrent();
    if (!school) { showToast('Cadastre uma escola primeiro.'); return; }
    const moduleKey = PAGE_MODULE_MAP[cfg.key];
    const action = id ? 'edit' : 'create';
    if(moduleKey && !can(moduleKey,action)){ denyToast(action); return; }
    const item = id ? ((state[cfg.key]||[]).find(x=>x.id===id)||{}) : { ...presets };
    openModal(id?`Alterar ${cfg.singular}`:`Novo(a) ${cfg.singular}`, `<form id="crudForm" class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid">${cfg.fields.map(f=>fieldHtml(f,item)).join('')}</div><div class="form-actions"><button class="btn-primary">Salvar</button></div></form>`);
    document.getElementById('crudForm').onsubmit = async e => {
      e.preventDefault();
      const data = { schoolId: school.id };
      for (const f of cfg.fields) {
        const el = document.getElementById(`f_${f.key}`);
        if (f.type === 'file') {
          const file = el.files && el.files[0];
          const removeChk = document.getElementById(`f_${f.key}_remove`);
          if (file) {
            if (file.size > 4*1024*1024) { formError(`O arquivo "${file.name}" é muito grande (máximo de 4 MB nesta demonstração).`); return; }
            data[f.key] = await new Promise((resolve,reject)=>{
              const r = new FileReader();
              r.onload = () => resolve({ name:file.name, size:file.size, type:file.type, dataUrl:r.result, uploadedAt:new Date().toISOString(), uploadedBy:state.user });
              r.onerror = () => reject(new Error('Falha ao ler o arquivo'));
              r.readAsDataURL(file);
            });
          } else if (removeChk && removeChk.checked) {
            data[f.key] = null;
          } else {
            data[f.key] = item[f.key] || null;
          }
          if (f.required && !data[f.key]) { formError(`Anexe um arquivo em "${f.label}".`); return; }
          continue;
        }
        data[f.key] = f.type === 'number' ? (Number(el.value)||0) : el.value;
      }
      if (id) { Object.assign(item, data); }
      else { data.id = crypto.randomUUID(); data.createdBy = state.currentUserId; state[cfg.key] = state[cfg.key]||[]; state[cfg.key].push(data); }
      cfg.onSave?.(id?item:data);
      const summary = (id?item:data).name || (id?item:data).title || (id?item:data).protocol || (id?item:data).studentName || ((id?item:data).employeeId&&employeeName((id?item:data).employeeId)) || ((id?item:data).studentId&&studentName((id?item:data).studentId)) || 'Registro';
      logAudit(cfg.title, id?'Alteração':'Criação', summary);
      save(); closeModal(); renderCrud(cfg);
      showToast(cfg.savedMsg || 'Registro salvo.');
    };
  }

  const crudModules = {
    substitutes: {
      key:'substitutes', title:'Banco de Substitutos', addLabel:'Novo substituto', singular:'substituto',
      desc:'Cadastro ágil de professores substitutos para cobrir ausências e licenças médicas sem quebrar o calendário de aulas.',
      emptyText:'Nenhum substituto cadastrado.', savedMsg:'Substituto salvo no banco de talentos.',
      fields:[
        {key:'name',label:'Nome completo',required:true,full:true},
        {key:'subject',label:'Disciplina / área',required:true},
        {key:'phone',label:'Telefone / contato'},
        {key:'availability',label:'Disponibilidade',type:'select',options:['Imediata','A combinar','Apenas manhã','Apenas tarde']},
        {key:'status',label:'Status',type:'select',options:['Disponível','Alocado','Indisponível'],default:'Disponível'}
      ],
      columns:[
        {label:'Nome',field:'name'},{label:'Disciplina',field:'subject'},{label:'Contato',field:'phone'},
        {label:'Disponibilidade',field:'availability'},
        {label:'Status',render:i=>badge(i.status,{'Disponível':'badge-green',Alocado:'badge-blue',Indisponível:'badge-gray'})}
      ]
    },
    benefits: {
      key:'benefits', title:'Benefícios e Bolsas de Estudo', addLabel:'Novo benefício', singular:'benefício',
      desc:'Planos de saúde, vale-transporte, vale-alimentação e bolsas de estudo para filhos de colaboradores.',
      emptyText:'Nenhum benefício cadastrado.', savedMsg:'Benefício salvo.',
      fields:[
        {key:'employeeId',label:'Funcionário',type:'employee',required:true,full:true},
        {key:'type',label:'Tipo de benefício',type:'select',options:['Plano de Saúde','Vale-Transporte','Vale-Alimentação','Bolsa de Estudo (filho)','Outro']},
        {key:'description',label:'Detalhes',type:'textarea',full:true},
        {key:'value',label:'Valor mensal (R$)',type:'number',step:'0.01',min:0},
        {key:'status',label:'Status',type:'select',options:['Ativo','Suspenso'],default:'Ativo'}
      ],
      columns:[
        {label:'Funcionário',render:i=>escapeHtml(employeeName(i.employeeId))},{label:'Benefício',field:'type'},
        {label:'Valor mensal',render:i=>`R$ ${Number(i.value||0).toLocaleString('pt-BR',{minimumFractionDigits:2})}`},
        {label:'Status',render:i=>badge(i.status,{Ativo:'badge-green',Suspenso:'badge-gray'})}
      ]
    },
    leaves: {
      key:'leaves', title:'Afastamentos e Licenças', addLabel:'Novo afastamento', singular:'afastamento',
      desc:'Licença-maternidade, atestados, auxílio-doença e readaptação de função (ex.: professor realocado para a biblioteca).',
      info:'Ao registrar um afastamento "Em andamento", o funcionário é marcado como Afastado. Ao encerrar, ele volta a Ativo automaticamente.',
      emptyText:'Nenhum afastamento registrado.', savedMsg:'Afastamento registrado.',
      fields:[
        {key:'employeeId',label:'Funcionário',type:'employee',required:true,full:true},
        {key:'type',label:'Tipo',type:'select',options:['Licença-Maternidade','Licença-Paternidade','Atestado Médico','Auxílio-Doença','Licença Sem Vencimento','Readaptação de Função']},
        {key:'startDate',label:'Início',type:'date',required:true},
        {key:'endDate',label:'Fim previsto',type:'date'},
        {key:'notes',label:'Observações',type:'textarea',full:true},
        {key:'status',label:'Status',type:'select',options:['Em andamento','Encerrado'],default:'Em andamento'}
      ],
      columns:[
        {label:'Funcionário',render:i=>escapeHtml(employeeName(i.employeeId))},{label:'Tipo',field:'type'},
        {label:'Início',render:i=>formatDate(i.startDate)},{label:'Fim previsto',render:i=>i.endDate?formatDate(i.endDate):'-'},
        {label:'Status',render:i=>badge(i.status,{'Em andamento':'badge-yellow',Encerrado:'badge-gray'})}
      ],
      onSave:(data)=>{
        const emp=(state.employees||[]).find(e=>e.id===data.employeeId);
        if(emp){ if(data.status==='Em andamento') emp.status='Afastado'; else if(emp.status==='Afastado') emp.status='Ativo'; }
      }
    },
    terminations: {
      key:'terminations', title:'Rescisões e Homologações', addLabel:'Nova rescisão', singular:'rescisão',
      desc:'Cálculo de verbas rescisórias e acompanhamento da homologação junto ao sindicato da categoria.',
      info:'Ao salvar, o funcionário selecionado é automaticamente marcado como Desligado.',
      emptyText:'Nenhuma rescisão registrada.', savedMsg:'Rescisão registrada e funcionário desligado.',
      fields:[
        {key:'employeeId',label:'Funcionário',type:'employee',required:true,full:true},
        {key:'date',label:'Data de desligamento',type:'date',required:true,default:todayIso()},
        {key:'reason',label:'Motivo',type:'select',options:['Pedido de demissão','Dispensa sem justa causa','Dispensa com justa causa','Término de contrato determinado','Acordo entre as partes']},
        {key:'severance',label:'Verba rescisória estimada (R$)',type:'number',step:'0.01',min:0},
        {key:'status',label:'Status',type:'select',options:['Calculada','Homologada'],default:'Calculada'}
      ],
      columns:[
        {label:'Funcionário',render:i=>escapeHtml(employeeName(i.employeeId))},{label:'Data',render:i=>formatDate(i.date)},
        {label:'Motivo',field:'reason'},{label:'Verba estimada',render:i=>`R$ ${Number(i.severance||0).toLocaleString('pt-BR',{minimumFractionDigits:2})}`},
        {label:'Status',render:i=>badge(i.status,{Calculada:'badge-yellow',Homologada:'badge-green'})}
      ],
      onSave:(data)=>{ const emp=(state.employees||[]).find(e=>e.id===data.employeeId); if(emp) emp.status='Desligado'; }
    },
    trainings: {
      key:'trainings', title:'Treinamentos e Formação Continuada', addLabel:'Novo treinamento', singular:'treinamento',
      desc:'Semanas pedagógicas, capacitação de equipes de frente e incentivo à titulação docente (especialização, mestrado, doutorado).',
      emptyText:'Nenhum treinamento cadastrado.', savedMsg:'Treinamento salvo.',
      fields:[
        {key:'title',label:'Título / evento',required:true,full:true},
        {key:'type',label:'Tipo',type:'select',options:['Semana Pedagógica','Capacitação de Equipe de Frente','Incentivo à Titulação','Reciclagem Docente','Outro']},
        {key:'date',label:'Data',type:'date',required:true},
        {key:'participants',label:'Nº de participantes',type:'number',min:0},
        {key:'notes',label:'Observações',type:'textarea',full:true},
        {key:'status',label:'Status',type:'select',options:['Planejado','Em andamento','Concluído'],default:'Planejado'}
      ],
      columns:[
        {label:'Título',field:'title'},{label:'Tipo',field:'type'},{label:'Data',render:i=>formatDate(i.date)},
        {label:'Participantes',field:'participants'},
        {label:'Status',render:i=>badge(i.status,{Planejado:'badge-blue','Em andamento':'badge-yellow',Concluído:'badge-green'})}
      ]
    },
    evaluations: {
      key:'evaluations', title:'Avaliação de Desempenho (360°)', addLabel:'Nova avaliação', singular:'avaliação',
      desc:'Cruza a visão da coordenação pedagógica, a autoavaliação do professor e o feedback de alunos e pais.',
      emptyText:'Nenhuma avaliação registrada.', savedMsg:'Avaliação registrada.',
      fields:[
        {key:'employeeId',label:'Funcionário',type:'employee',required:true,full:true},
        {key:'period',label:'Período avaliado',required:true},
        {key:'coordScore',label:'Nota da coordenação (0-10)',type:'number',min:0,max:10,step:'0.1'},
        {key:'selfScore',label:'Autoavaliação (0-10)',type:'number',min:0,max:10,step:'0.1'},
        {key:'feedbackScore',label:'Feedback de alunos/pais (0-10)',type:'number',min:0,max:10,step:'0.1'},
        {key:'notes',label:'Observações do PDI',type:'textarea',full:true}
      ],
      columns:[
        {label:'Funcionário',render:i=>escapeHtml(employeeName(i.employeeId))},{label:'Período',field:'period'},
        {label:'Coordenação',field:'coordScore'},{label:'Autoavaliação',field:'selfScore'},{label:'Feedback',field:'feedbackScore'},
        {label:'Média',render:i=>(((Number(i.coordScore)||0)+(Number(i.selfScore)||0)+(Number(i.feedbackScore)||0))/3).toFixed(1)}
      ]
    },
    careerPlans: {
      key:'careerPlans', title:'Plano de Cargos, Carreiras e Salários (PCCS)', addLabel:'Novo registro', singular:'registro de carreira',
      desc:'Progressão vertical por titulação e horizontal por tempo de casa (anuênios e quinquênios).',
      emptyText:'Nenhum registro de carreira cadastrado.', savedMsg:'Plano de carreira atualizado.',
      fields:[
        {key:'employeeId',label:'Funcionário',type:'employee',required:true,full:true},
        {key:'level',label:'Nível / referência atual'},
        {key:'titulacao',label:'Titulação',type:'select',options:['Graduação','Especialização','Mestrado','Doutorado']},
        {key:'tempoCasaAnos',label:'Tempo de casa (anos)',type:'number',min:0},
        {key:'nextProgression',label:'Próxima progressão prevista',full:true},
        {key:'status',label:'Status',type:'select',options:['Em dia','Pendente de análise'],default:'Em dia'}
      ],
      columns:[
        {label:'Funcionário',render:i=>escapeHtml(employeeName(i.employeeId))},{label:'Nível',field:'level'},
        {label:'Titulação',field:'titulacao'},{label:'Tempo de casa',render:i=>`${i.tempoCasaAnos||0} anos`},
        {label:'Status',render:i=>badge(i.status,{'Em dia':'badge-green','Pendente de análise':'badge-yellow'})}
      ]
    },
    climateSurveys: {
      key:'climateSurveys', title:'Pesquisas de Clima Organizacional', addLabel:'Nova pesquisa', singular:'pesquisa de clima',
      desc:'Questionários de satisfação para identificar gargalos de comunicação e insatisfações com a infraestrutura pedagógica.',
      emptyText:'Nenhuma pesquisa registrada.', savedMsg:'Pesquisa de clima registrada.',
      fields:[
        {key:'title',label:'Título da pesquisa',required:true,full:true},
        {key:'date',label:'Data de aplicação',type:'date',required:true},
        {key:'respondents',label:'Nº de respondentes',type:'number',min:0},
        {key:'avgScore',label:'Satisfação média (0-10)',type:'number',min:0,max:10,step:'0.1'},
        {key:'notes',label:'Principais pontos identificados',type:'textarea',full:true}
      ],
      columns:[
        {label:'Título',field:'title'},{label:'Data',render:i=>formatDate(i.date)},{label:'Respondentes',field:'respondents'},
        {label:'Satisfação média',render:i=>{const v=Number(i.avgScore)||0;const cls=v>=7?'badge-green':v>=5?'badge-yellow':'badge-red';return `<span class="badge ${cls}">${escapeHtml(String(i.avgScore??'-'))}</span>`;}}
      ]
    },
    wellbeing: {
      key:'wellbeing', title:'Bem-Estar, Saúde Mental e Endomarketing', addLabel:'Nova ação', singular:'ação de bem-estar',
      desc:'Programas de combate ao burnout, mediação de conflitos complexos e ações de reconhecimento institucional.',
      emptyText:'Nenhuma ação cadastrada.', savedMsg:'Ação registrada.',
      fields:[
        {key:'title',label:'Ação / programa',required:true,full:true},
        {key:'type',label:'Tipo',type:'select',options:['Prevenção ao Burnout','Apoio Psicológico','Mediação de Conflito','Endomarketing / Reconhecimento','Outro']},
        {key:'date',label:'Data',type:'date'},
        {key:'notes',label:'Observações',type:'textarea',full:true},
        {key:'status',label:'Status',type:'select',options:['Planejado','Realizado'],default:'Planejado'}
      ],
      columns:[
        {label:'Ação',field:'title'},{label:'Tipo',field:'type'},{label:'Data',render:i=>i.date?formatDate(i.date):'-'},
        {label:'Status',render:i=>badge(i.status,{Planejado:'badge-blue',Realizado:'badge-green'})}
      ]
    },
    safety: {
      key:'safety', title:'Segurança e Medicina do Trabalho (SST)', addLabel:'Novo registro', singular:'registro de SST',
      desc:'Exames admissionais, periódicos e demissionais, laudos (PGR/LTCAT) e acompanhamento da CIPA.',
      emptyText:'Nenhum registro de SST cadastrado.', savedMsg:'Registro de SST salvo.',
      fields:[
        {key:'employeeId',label:'Funcionário',type:'employee',optional:true,full:true},
        {key:'examType',label:'Tipo',type:'select',options:['Exame Admissional','Exame Periódico','Exame Demissional','Laudo PGR','Laudo LTCAT','Reunião CIPA']},
        {key:'date',label:'Data',type:'date',required:true},
        {key:'dueDate',label:'Validade / próxima data',type:'date'},
        {key:'status',label:'Status',type:'select',options:['Em dia','Vencido','Agendado'],default:'Agendado'}
      ],
      columns:[
        {label:'Funcionário',render:i=>i.employeeId?escapeHtml(employeeName(i.employeeId)):'Institucional'},
        {label:'Tipo',field:'examType'},{label:'Data',render:i=>formatDate(i.date)},
        {label:'Validade',render:i=>i.dueDate?formatDate(i.dueDate):'-'},
        {label:'Status',render:i=>badge(i.status,{'Em dia':'badge-green',Vencido:'badge-red',Agendado:'badge-blue'})}
      ]
    },
    unions: {
      key:'unions', title:'Relações Sindicais e Convenções Coletivas (CCT)', addLabel:'Novo sindicato', singular:'convenção',
      desc:'Negociação, interpretação e aplicação das normas das CCTs junto aos sindicatos de professores e de auxiliares.',
      emptyText:'Nenhuma convenção cadastrada.', savedMsg:'Convenção salva.',
      fields:[
        {key:'name',label:'Sindicato',required:true,full:true},
        {key:'category',label:'Categoria',type:'select',options:['Professores','Auxiliares de Administração Escolar','Outro']},
        {key:'cctValidity',label:'Validade da CCT vigente',type:'date'},
        {key:'notes',label:'Cláusulas relevantes / reajustes',type:'textarea',full:true}
      ],
      columns:[
        {label:'Sindicato',field:'name'},{label:'Categoria',field:'category'},
        {label:'Validade da CCT',render:i=>i.cctValidity?formatDate(i.cctValidity):'-'}
      ]
    },
    lgpd: {
      key:'lgpd', title:'Adequação à LGPD', addLabel:'Novo item', singular:'item de conformidade',
      desc:'Garantia de privacidade e segurança dos dados sensíveis de funcionários, candidatos e suas famílias.',
      emptyText:'Nenhum item de conformidade cadastrado.', savedMsg:'Item de conformidade salvo.',
      fields:[
        {key:'item',label:'Item de conformidade',required:true,full:true},
        {key:'responsible',label:'Responsável'},
        {key:'status',label:'Status',type:'select',options:['Conforme','Em adequação','Pendente'],default:'Pendente'},
        {key:'notes',label:'Observações',type:'textarea',full:true}
      ],
      columns:[
        {label:'Item',field:'item'},{label:'Responsável',field:'responsible'},
        {label:'Status',render:i=>badge(i.status,{Conforme:'badge-green','Em adequação':'badge-yellow',Pendente:'badge-red'})}
      ]
    },
    ethicsCases: {
      key:'ethicsCases', title:'Ouvidoria e Comitê de Ética', addLabel:'Nova apuração', singular:'caso',
      desc:'Apuração sigilosa de denúncias de assédio, discriminação ou condutas inadequadas de funcionários em relação aos alunos.',
      info:'Os detalhes de cada apuração são sigilosos e visíveis apenas ao abrir o registro.',
      emptyText:'Nenhum caso registrado.', savedMsg:'Caso registrado sob sigilo.',
      fields:[
        {key:'protocol',label:'Protocolo (gerado automaticamente se em branco)',full:true},
        {key:'category',label:'Categoria',type:'select',options:['Assédio','Discriminação','Conduta Inadequada com Aluno','Conflito Interpessoal','Outro']},
        {key:'notes',label:'Descrição sigilosa do caso',type:'textarea',required:true,full:true,rows:5},
        {key:'status',label:'Status',type:'select',options:['Em apuração','Concluído','Arquivado'],default:'Em apuração'}
      ],
      columns:[
        {label:'Protocolo',render:i=>escapeHtml(i.protocol||'-')},{label:'Categoria',field:'category'},
        {label:'Status',render:i=>badge(i.status,{'Em apuração':'badge-yellow',Concluído:'badge-green',Arquivado:'badge-gray'})}
      ],
      onSave:(data)=>{ if(!data.protocol){ data.protocol='OUV-'+Date.now().toString().slice(-6); } }
    },
    aeeRecords: {
      key:'aeeRecords', title:'Educação Especial (AEE)', addLabel:'Novo atendimento', singular:'atendimento AEE',
      desc:'Plano de Atendimento Educacional Especializado: necessidades, recursos, profissionais e cronograma. Dado sensível — visível apenas a perfis autorizados.',
      emptyText:'Nenhum atendimento AEE registrado.', savedMsg:'Registro de AEE salvo.',
      fields:[
        {key:'studentId',label:'Aluno',type:'student',required:true,full:true},
        {key:'need',label:'Necessidade educacional',type:'select',options:['Deficiência Intelectual','Deficiência Física','Deficiência Visual','Deficiência Auditiva','TEA (Autismo)','TDAH','Altas Habilidades/Superdotação','Outro']},
        {key:'professional',label:'Profissional responsável'},
        {key:'resources',label:'Recursos utilizados',type:'textarea',full:true},
        {key:'schedule',label:'Cronograma de atendimento'},
        {key:'evolution',label:'Evolução / observações',type:'textarea',full:true},
        {key:'status',label:'Status',type:'select',options:['Em atendimento','Em avaliação','Encerrado'],default:'Em atendimento'}
      ],
      columns:[
        {label:'Aluno',render:i=>escapeHtml(studentById(i.studentId)?.name||'—')},{label:'Necessidade',field:'need'},
        {label:'Profissional',field:'professional'},{label:'Status',render:i=>badge(i.status,{'Em atendimento':'badge-blue','Em avaliação':'badge-yellow',Encerrado:'badge-gray'})}
      ]
    },
    inventory: {
      key:'inventory', title:'Estoque', addLabel:'Novo item', singular:'item de estoque',
      desc:'Controle de materiais de consumo (separado do patrimônio): entradas, saídas e estoque mínimo.',
      emptyText:'Nenhum item de estoque cadastrado.', savedMsg:'Item de estoque salvo.',
      fields:[
        {key:'name',label:'Produto',required:true,full:true},
        {key:'category',label:'Categoria',type:'select',options:['Material de escritório','Material de limpeza','Material pedagógico','Material de laboratório','Outro']},
        {key:'unit',label:'Unidade',type:'select',options:['un','cx','pct','L','kg']},
        {key:'quantity',label:'Quantidade atual',type:'number',min:0},
        {key:'minQuantity',label:'Estoque mínimo',type:'number',min:0},
        {key:'supplier',label:'Fornecedor'},
        {key:'location',label:'Local de armazenamento'}
      ],
      columns:[
        {label:'Produto',field:'name'},{label:'Categoria',field:'category'},
        {label:'Quantidade',render:i=>`${i.quantity} ${i.unit||''}`},
        {label:'Situação',render:i=>{const low=Number(i.quantity)<Number(i.minQuantity||0);return badge(low?'Abaixo do mínimo':'Regular',{'Abaixo do mínimo':'badge-red',Regular:'badge-green'});}}
      ]
    },
    transportVehicles: {
      key:'transportVehicles', title:'Veículos do Transporte Escolar', addLabel:'Novo veículo', singular:'veículo',
      desc:'Frota utilizada no transporte escolar: placa, capacidade, documentação e manutenção.',
      emptyText:'Nenhum veículo cadastrado.', savedMsg:'Veículo salvo.',
      fields:[
        {key:'plate',label:'Placa',required:true},{key:'model',label:'Modelo'},{key:'capacity',label:'Capacidade (alunos)',type:'number',min:1},
        {key:'docExpiry',label:'Validade da documentação',type:'date'},{key:'lastMaintenance',label:'Última manutenção',type:'date'},
        {key:'status',label:'Situação',type:'select',options:['Em operação','Manutenção','Inativo'],default:'Em operação'}
      ],
      columns:[
        {label:'Placa',field:'plate'},{label:'Modelo',field:'model'},{label:'Capacidade',field:'capacity'},
        {label:'Documentação',render:i=>{if(!i.docExpiry)return '—';const soon=new Date(i.docExpiry)<new Date(Date.now()+30*864e5);return `<span class="${soon?'badge badge-red':''}">${formatDate(i.docExpiry)}${soon?' — vence em breve':''}</span>`;}},
        {label:'Situação',render:i=>badge(i.status,{'Em operação':'badge-green',Manutenção:'badge-yellow',Inativo:'badge-gray'})}
      ]
    },
    transportDrivers: {
      key:'transportDrivers', title:'Motoristas', addLabel:'Novo motorista', singular:'motorista',
      desc:'Condutores responsáveis pelas rotas do transporte escolar.',
      emptyText:'Nenhum motorista cadastrado.', savedMsg:'Motorista salvo.',
      fields:[
        {key:'name',label:'Nome completo',required:true,full:true},{key:'cnh',label:'Nº da CNH'},{key:'cnhExpiry',label:'Validade da CNH',type:'date'},
        {key:'phone',label:'Contato'},{key:'status',label:'Situação',type:'select',options:['Ativo','Afastado','Inativo'],default:'Ativo'}
      ],
      columns:[
        {label:'Nome',field:'name'},{label:'CNH',field:'cnh'},
        {label:'Validade',render:i=>i.cnhExpiry?formatDate(i.cnhExpiry):'—'},{label:'Situação',render:i=>badge(i.status,{Ativo:'badge-green',Afastado:'badge-yellow',Inativo:'badge-gray'})}
      ]
    },
    classCouncils: {
      key:'classCouncils', title:'Conselho de Classe', addLabel:'Novo registro', singular:'reunião de conselho',
      desc:'Reuniões do conselho de classe: pauta, participantes, observações e encaminhamentos por turma/período.',
      emptyText:'Nenhuma reunião registrada.', savedMsg:'Conselho de classe registrado.',
      fields:[
        {key:'classId',label:'Turma',type:'class',required:true,full:true},
        {key:'period',label:'Período',type:'select',options:['1º Bimestre','2º Bimestre','3º Bimestre','4º Bimestre']},
        {key:'date',label:'Data',type:'date',default:todayIso()},
        {key:'participants',label:'Participantes'},
        {key:'agenda',label:'Pauta',type:'textarea',full:true},
        {key:'decisions',label:'Encaminhamentos e decisões',type:'textarea',full:true},
        {key:'status',label:'Status',type:'select',options:['Agendado','Realizado'],default:'Agendado'}
      ],
      columns:[
        {label:'Turma',render:i=>escapeHtml(classLabel(classById(i.classId)))},{label:'Período',field:'period'},{label:'Data',render:i=>formatDate(i.date)},
        {label:'Status',render:i=>badge(i.status,{Agendado:'badge-blue',Realizado:'badge-green'})}
      ]
    },
    publicFunds: {
      key:'publicFunds', title:'Recursos Públicos', addLabel:'Novo recurso', singular:'recurso',
      desc:'Repasses, programas, convênios e recursos próprios recebidos pela escola (PDDE, alimentação, transporte etc.). Não é cobrança de mensalidade — a escola é pública.',
      emptyText:'Nenhum recurso registrado.', savedMsg:'Recurso registrado.',
      fields:[
        {key:'source',label:'Origem',type:'select',options:['Repasse Federal (PDDE)','Repasse Estadual','Repasse Municipal','Alimentação Escolar (PNAE)','Transporte Escolar (PNATE)','Convênio','Recurso Próprio','Projeto/Emenda','Outro']},
        {key:'description',label:'Descrição',full:true},{key:'amount',label:'Valor (R$)',type:'number',min:0,step:'0.01'},
        {key:'receivedDate',label:'Data de recebimento',type:'date'},{key:'status',label:'Status',type:'select',options:['Recebido','Previsto','Em prestação de contas'],default:'Recebido'}
      ],
      columns:[
        {label:'Origem',field:'source'},{label:'Descrição',field:'description'},
        {label:'Valor',render:i=>`R$ ${Number(i.amount||0).toLocaleString('pt-BR',{minimumFractionDigits:2})}`},
        {label:'Status',render:i=>badge(i.status,{Recebido:'badge-green',Previsto:'badge-blue','Em prestação de contas':'badge-yellow'})}
      ]
    },
    publicExpenses: {
      key:'publicExpenses', title:'Despesas Públicas', addLabel:'Nova despesa', singular:'despesa',
      desc:'Execução de despesas da escola pública: material, alimentação, manutenção, equipamentos, serviços e contratos.',
      emptyText:'Nenhuma despesa registrada.', savedMsg:'Despesa registrada.',
      fields:[
        {key:'category',label:'Categoria',type:'select',options:['Material Didático/Escolar','Alimentação Escolar','Manutenção','Equipamentos','Serviços','Transporte','Contratos','Outro']},
        {key:'description',label:'Descrição',full:true},{key:'amount',label:'Valor (R$)',type:'number',min:0,step:'0.01'},
        {key:'supplier',label:'Fornecedor'},{key:'document',label:'Documento/Nota fiscal'},{key:'date',label:'Data',type:'date'},
        {key:'status',label:'Status',type:'select',options:['Pago','Em prestação de contas','Pendente'],default:'Pago'}
      ],
      columns:[
        {label:'Categoria',field:'category'},{label:'Descrição',field:'description'},
        {label:'Valor',render:i=>`R$ ${Number(i.amount||0).toLocaleString('pt-BR',{minimumFractionDigits:2})}`},
        {label:'Status',render:i=>badge(i.status,{Pago:'badge-green','Em prestação de contas':'badge-yellow',Pendente:'badge-red'})}
      ]
    },
    interns: {
      key:'interns', title:'Estagiários e Menores Aprendizes', addLabel:'Novo estagiário', singular:'estagiário',
      desc:'Recrutamento e controle contratual de estudantes de pedagogia e licenciaturas atuando como auxiliares de classe ou monitores.',
      emptyText:'Nenhum estagiário cadastrado.', savedMsg:'Estagiário cadastrado.',
      fields:[
        {key:'name',label:'Nome completo',required:true,full:true},
        {key:'course',label:'Curso'},{key:'institution',label:'Instituição de ensino'},
        {key:'supervisor',label:'Supervisor responsável'},
        {key:'startDate',label:'Início',type:'date'},{key:'endDate',label:'Término previsto',type:'date'},
        {key:'status',label:'Status',type:'select',options:['Ativo','Encerrado'],default:'Ativo'}
      ],
      columns:[
        {label:'Nome',field:'name'},{label:'Curso',field:'course'},{label:'Supervisor',field:'supervisor'},
        {label:'Início',render:i=>i.startDate?formatDate(i.startDate):'-'},
        {label:'Status',render:i=>badge(i.status,{Ativo:'badge-green',Encerrado:'badge-gray'})}
      ]
    },
    occurrences: {
      key:'occurrences', title:'Ocorrências', addLabel:'Nova ocorrência', singular:'ocorrência',
      desc:'Registro de ocorrências de portaria, recepção, sala de aula ou atendimento, com encaminhamento e acompanhamento.',
      emptyText:'Nenhuma ocorrência registrada.', savedMsg:'Ocorrência registrada.',
      fields:[
        {key:'studentName',label:'Aluno envolvido (opcional)',full:true},
        {key:'type',label:'Tipo',type:'select',options:['Portaria','Recepção / Atendimento','Sala de Aula','Comportamental','Disciplinar','Outro']},
        {key:'description',label:'Descrição',type:'textarea',required:true,full:true,rows:4},
        {key:'date',label:'Data',type:'date',default:todayIso()},
        {key:'status',label:'Status',type:'select',options:['Em aberto','Encaminhada','Resolvida'],default:'Em aberto'}
      ],
      columns:[
        {label:'Aluno',render:i=>escapeHtml(i.studentName||'-')},{label:'Tipo',field:'type'},{label:'Data',render:i=>i.date?formatDate(i.date):'-'},
        {label:'Status',render:i=>badge(i.status,{'Em aberto':'badge-yellow',Encaminhada:'badge-blue',Resolvida:'badge-green'})}
      ]
    },

    // ===== Ano letivo / Estrutura / Serviços escolares / Financeiro (Direção e Secretarias) =====
    academicPeriods: {
      key:'academicPeriods', title:'Ano Letivo e Períodos', addLabel:'Novo período', singular:'período letivo',
      desc:'Abertura e encerramento do ano letivo, bimestres/trimestres, dias letivos e carga horária.',
      emptyText:'Nenhum período cadastrado.', savedMsg:'Período letivo salvo.',
      fields:[
        {key:'name',label:'Nome (ex.: 2026 — 1º Bimestre)',required:true,full:true},
        {key:'type',label:'Tipo',type:'select',options:['Ano Letivo','Bimestre','Trimestre','Semestre']},
        {key:'startDate',label:'Início',type:'date',required:true},
        {key:'endDate',label:'Fim',type:'date',required:true},
        {key:'schoolDays',label:'Dias letivos previstos',type:'number',min:0},
        {key:'status',label:'Status',type:'select',options:['Planejado','Em andamento','Encerrado'],default:'Planejado'}
      ],
      columns:[
        {label:'Nome',field:'name'},{label:'Tipo',field:'type'},{label:'Início',render:i=>formatDate(i.startDate)},
        {label:'Fim',render:i=>formatDate(i.endDate)},{label:'Dias letivos',field:'schoolDays'},
        {label:'Status',render:i=>badge(i.status,{Planejado:'badge-blue','Em andamento':'badge-yellow',Encerrado:'badge-gray'})}
      ]
    },
    enrollmentRequests: {
      key:'enrollmentRequests', title:'Matrículas, Renovações e Transferências', addLabel:'Nova solicitação', singular:'solicitação acadêmica',
      desc:'Fluxo de matrícula inicial, rematrícula, transferência recebida/enviada, trancamento, cancelamento e reativação.',
      emptyText:'Nenhuma solicitação registrada.', savedMsg:'Solicitação acadêmica registrada.',
      fields:[
        {key:'studentName',label:'Aluno',required:true,full:true},
        {key:'type',label:'Tipo',type:'select',options:['Matrícula Inicial','Rematrícula','Transferência Recebida','Transferência Enviada','Trancamento','Cancelamento','Reativação','Mudança de Turma','Mudança de Turno']},
        {key:'requestDate',label:'Data da solicitação',type:'date',default:todayIso()},
        {key:'notes',label:'Observações',type:'textarea',full:true},
        {key:'status',label:'Status',type:'select',options:['Em análise','Aprovada','Pendente de documentos','Concluída','Negada'],default:'Em análise'}
      ],
      columns:[
        {label:'Aluno',field:'studentName'},{label:'Tipo',field:'type'},{label:'Data',render:i=>formatDate(i.requestDate)},
        {label:'Status',render:i=>badge(i.status,{'Em análise':'badge-yellow',Aprovada:'badge-blue','Pendente de documentos':'badge-red',Concluída:'badge-green',Negada:'badge-gray'})}
      ],
      onSave:(data)=>{
        if(data.type==='Matrícula Inicial' && data.status==='Concluída' && !data.studentId){
          const student={id:crypto.randomUUID(),schoolId:data.schoolId,name:data.studentName,registration:'ALU-'+Date.now().toString().slice(-6),email:'',classId:null,className:'Sem vínculo'};
          state.students.push(student);
          data.studentId=student.id;
          logAudit('Matrículas','Cadastro automático de aluno',student.name);
        }
      }
    },
    spaces: {
      key:'spaces', title:'Estrutura Física da Instituição', addLabel:'Novo ambiente', singular:'ambiente',
      desc:'Prédios, blocos, salas, laboratórios, biblioteca, quadras e auditórios, com capacidade e recursos disponíveis.',
      emptyText:'Nenhum ambiente cadastrado.', savedMsg:'Ambiente salvo.',
      fields:[
        {key:'name',label:'Nome do ambiente',required:true,full:true},
        {key:'type',label:'Tipo',type:'select',options:['Sala de Aula','Laboratório','Biblioteca','Quadra','Auditório','Sala Administrativa','Outro']},
        {key:'capacity',label:'Capacidade',type:'number',min:0},
        {key:'resources',label:'Recursos / equipamentos disponíveis',type:'textarea',full:true},
        {key:'status',label:'Status',type:'select',options:['Disponível','Em manutenção','Indisponível'],default:'Disponível'}
      ],
      columns:[
        {label:'Nome',field:'name'},{label:'Tipo',field:'type'},{label:'Capacidade',field:'capacity'},
        {label:'Status',render:i=>badge(i.status,{'Disponível':'badge-green','Em manutenção':'badge-yellow',Indisponível:'badge-red'})}
      ]
    },
    assets: {
      key:'assets', title:'Estoque e Patrimônio', addLabel:'Novo item', singular:'item de patrimônio',
      desc:'Equipamentos, inventário, manutenção e controle patrimonial da instituição.',
      emptyText:'Nenhum item cadastrado.', savedMsg:'Item salvo.',
      fields:[
        {key:'name',label:'Item / equipamento',required:true,full:true},
        {key:'category',label:'Categoria',type:'select',options:['Mobiliário','Equipamento de TI','Material Pedagógico','Material de Limpeza','Outro']},
        {key:'quantity',label:'Quantidade',type:'number',min:0},
        {key:'location',label:'Localização'},
        {key:'status',label:'Status',type:'select',options:['Em uso','Em manutenção','Baixado'],default:'Em uso'}
      ],
      columns:[
        {label:'Item',field:'name'},{label:'Categoria',field:'category'},{label:'Quantidade',field:'quantity'},{label:'Localização',field:'location'},
        {label:'Status',render:i=>badge(i.status,{'Em uso':'badge-green','Em manutenção':'badge-yellow',Baixado:'badge-gray'})}
      ]
    },
    library: {
      key:'library', title:'Biblioteca — Acervo e Empréstimos', addLabel:'Novo empréstimo', singular:'empréstimo',
      desc:'Controle de exemplares, empréstimos, devoluções e reservas do acervo da biblioteca.',
      emptyText:'Nenhum empréstimo registrado.', savedMsg:'Registro salvo na biblioteca.',
      fields:[
        {key:'title',label:'Título da obra',required:true,full:true},
        {key:'borrower',label:'Aluno / professor (tomador)'},
        {key:'loanDate',label:'Data do empréstimo',type:'date',default:todayIso()},
        {key:'dueDate',label:'Previsão de devolução',type:'date'},
        {key:'status',label:'Status',type:'select',options:['Emprestado','Devolvido','Reservado','Atrasado'],default:'Emprestado'}
      ],
      columns:[
        {label:'Obra',field:'title'},{label:'Tomador',field:'borrower'},{label:'Empréstimo',render:i=>i.loanDate?formatDate(i.loanDate):'-'},
        {label:'Devolução prevista',render:i=>i.dueDate?formatDate(i.dueDate):'-'},
        {label:'Status',render:i=>badge(i.status,{Emprestado:'badge-blue',Devolvido:'badge-green',Reservado:'badge-yellow',Atrasado:'badge-red'})}
      ]
    },
    transportRoutes: {
      key:'transportRoutes', title:'Transporte Escolar', addLabel:'Nova rota', singular:'rota',
      desc:'Rotas, veículos, motoristas, monitores, pontos e alunos atendidos pelo transporte escolar.',
      emptyText:'Nenhuma rota cadastrada.', savedMsg:'Rota salva.',
      fields:[
        {key:'name',label:'Nome da rota',required:true,full:true},
        {key:'vehicle',label:'Veículo'},{key:'driver',label:'Motorista'},{key:'monitor',label:'Monitor'},
        {key:'shift',label:'Turno',type:'select',options:['Manhã','Tarde','Noite','Integral']},
        {key:'studentsCount',label:'Nº de alunos atendidos',type:'number',min:0},
        {key:'status',label:'Status',type:'select',options:['Ativa','Inativa'],default:'Ativa'}
      ],
      columns:[
        {label:'Rota',field:'name'},{label:'Veículo',field:'vehicle'},{label:'Motorista',field:'driver'},
        {label:'Turno',field:'shift'},{label:'Alunos',field:'studentsCount'},
        {label:'Status',render:i=>badge(i.status,{Ativa:'badge-green',Inativa:'badge-gray'})}
      ]
    },
    meals: {
      key:'meals', title:'Alimentação Escolar', addLabel:'Novo cardápio', singular:'cardápio',
      desc:'Cardápios, controle de consumo e restrições alimentares atendidas.',
      emptyText:'Nenhum cardápio cadastrado.', savedMsg:'Cardápio salvo.',
      fields:[
        {key:'title',label:'Cardápio / refeição',required:true,full:true},
        {key:'date',label:'Data',type:'date'},
        {key:'restrictions',label:'Restrições alimentares atendidas',type:'textarea',full:true},
        {key:'status',label:'Status',type:'select',options:['Planejado','Servido'],default:'Planejado'}
      ],
      columns:[
        {label:'Cardápio',field:'title'},{label:'Data',render:i=>i.date?formatDate(i.date):'-'},
        {label:'Status',render:i=>badge(i.status,{Planejado:'badge-blue',Servido:'badge-green'})}
      ]
    },
    healthRecords: {
      key:'healthRecords', title:'Saúde e Apoio Escolar', addLabel:'Novo registro', singular:'registro de saúde',
      desc:'Contatos de emergência, restrições, registros de atendimento e encaminhamentos de apoio ao aluno.',
      emptyText:'Nenhum registro cadastrado.', savedMsg:'Registro de saúde salvo.',
      fields:[
        {key:'studentId',label:'Aluno',type:'student',required:true,full:true},
        {key:'type',label:'Tipo',type:'select',options:['Registro de Atendimento','Encaminhamento','Restrição / Alergia','Contato de Emergência']},
        {key:'description',label:'Descrição',type:'textarea',required:true,full:true},
        {key:'date',label:'Data',type:'date'},
        {key:'status',label:'Status',type:'select',options:['Em aberto','Resolvido'],default:'Em aberto'}
      ],
      columns:[
        {label:'Aluno',render:i=>escapeHtml(studentName(i.studentId))},{label:'Tipo',field:'type'},
        {label:'Data',render:i=>i.date?formatDate(i.date):'-'},
        {label:'Status',render:i=>badge(i.status,{'Em aberto':'badge-yellow',Resolvido:'badge-green'})}
      ]
    },
    financeRecords: {
      key:'financeRecords', title:'Financeiro — Mensalidades e Cobranças', addLabel:'Novo lançamento', singular:'lançamento financeiro',
      desc:'Mensalidades, taxas, bolsas, descontos e controle de inadimplência.',
      emptyText:'Nenhum lançamento cadastrado.', savedMsg:'Lançamento financeiro salvo.',
      fields:[
        {key:'studentId',label:'Aluno',type:'student',required:true,full:true},
        {key:'type',label:'Tipo',type:'select',options:['Mensalidade','Matrícula','Taxa','Material','Outro']},
        {key:'amount',label:'Valor (R$)',type:'number',step:'0.01',min:0},
        {key:'dueDate',label:'Vencimento',type:'date'},
        {key:'status',label:'Status',type:'select',options:['Em aberto','Pago','Atrasado','Negociado'],default:'Em aberto'}
      ],
      columns:[
        {label:'Aluno',render:i=>escapeHtml(studentName(i.studentId))},{label:'Tipo',field:'type'},
        {label:'Valor',render:i=>`R$ ${Number(i.amount||0).toLocaleString('pt-BR',{minimumFractionDigits:2})}`},
        {label:'Vencimento',render:i=>i.dueDate?formatDate(i.dueDate):'-'},
        {label:'Status',render:i=>badge(i.status,{'Em aberto':'badge-blue',Pago:'badge-green',Atrasado:'badge-red',Negociado:'badge-yellow'})}
      ]
    },
    studentDocuments: {
      key:'studentDocuments', title:'Gestão Documental', addLabel:'Novo documento', singular:'documento',
      desc:'Upload e validação de documentos de alunos e responsáveis (RG, CPF, comprovantes, documentos acadêmicos).',
      emptyText:'Nenhum documento cadastrado.', savedMsg:'Documento salvo.',
      fields:[
        {key:'studentId',label:'Aluno',type:'student',required:true,full:true},
        {key:'docType',label:'Tipo de documento',type:'select',options:['RG','CPF','Certidão de Nascimento','Comprovante de Residência','Documento Acadêmico','Documento de Transferência','Outro']},
        {key:'file',label:'Arquivo do documento',type:'file'},
        {key:'notes',label:'Observações',type:'textarea',full:true},
        {key:'status',label:'Status',type:'select',options:['Pendente','Aprovado','Reprovado'],default:'Pendente'}
      ],
      columns:[
        {label:'Aluno',render:i=>escapeHtml(studentName(i.studentId))},{label:'Tipo de documento',field:'docType'},
        {label:'Arquivo',render:i=>i.file?`<a href="${i.file.dataUrl}" download="${escapeHtml(i.file.name)}"><i class="fa-solid fa-paperclip"></i> ${escapeHtml(i.file.name.length>18?i.file.name.slice(0,16)+'…':i.file.name)}</a>`:'<span class="muted">—</span>'},
        {label:'Status',render:i=>badge(i.status,{Pendente:'badge-yellow',Aprovado:'badge-green',Reprovado:'badge-red'})}
      ]
    },
    contactLogs: {
      key:'contactLogs', title:'Central de Atendimento', addLabel:'Novo registro', singular:'atendimento',
      desc:'Registro de atendimentos presenciais, telefônicos, on-line e encaminhamentos entre setores.',
      emptyText:'Nenhum atendimento registrado.', savedMsg:'Atendimento registrado.',
      fields:[
        {key:'subject',label:'Assunto',required:true,full:true},
        {key:'channel',label:'Canal',type:'select',options:['Presencial','Telefone','On-line / Chat','E-mail']},
        {key:'notes',label:'Observações do atendimento',type:'textarea',full:true},
        {key:'forwardedTo',label:'Encaminhado para (setor)'},
        {key:'status',label:'Status',type:'select',options:['Em atendimento','Concluído','Encaminhado'],default:'Em atendimento'}
      ],
      columns:[
        {label:'Assunto',field:'subject'},{label:'Canal',field:'channel'},{label:'Encaminhado para',render:i=>i.forwardedTo||'-'},
        {label:'Status',render:i=>badge(i.status,{'Em atendimento':'badge-yellow',Concluído:'badge-green',Encaminhado:'badge-blue'})}
      ]
    },
    lessonPlans: {
      key:'lessonPlans', title:'Planejamento de Aulas', addLabel:'Novo plano', singular:'plano de aula',
      desc:'Planos de aula, conteúdos previstos e materiais por turma/disciplina.',
      emptyText:'Nenhum plano cadastrado.', savedMsg:'Plano de aula salvo.',
      fields:[
        {key:'title',label:'Título da aula / unidade',required:true,full:true},
        {key:'subject',label:'Disciplina'},
        {key:'date',label:'Data',type:'date'},
        {key:'content',label:'Conteúdo planejado',type:'textarea',full:true},
        {key:'status',label:'Status',type:'select',options:['Planejado','Ministrado'],default:'Planejado'}
      ],
      columns:[
        {label:'Título',field:'title'},{label:'Disciplina',field:'subject'},{label:'Data',render:i=>i.date?formatDate(i.date):'-'},
        {label:'Status',render:i=>badge(i.status,{Planejado:'badge-blue',Ministrado:'badge-green'})}
      ]
    },
    announcements: {
      key:'announcements', title:'Comunicados e Avisos', addLabel:'Novo comunicado', singular:'comunicado',
      desc:'Comunicados institucionais para professores, alunos e responsáveis, com histórico de envio.',
      emptyText:'Nenhum comunicado publicado.', savedMsg:'Comunicado publicado.',
      fields:[
        {key:'title',label:'Título',required:true,full:true},
        {key:'audience',label:'Público',type:'select',options:['Toda a escola','Professores','Alunos','Responsáveis','Funcionários']},
        {key:'message',label:'Mensagem',type:'textarea',required:true,full:true,rows:4},
        {key:'sendDate',label:'Data de envio',type:'date',default:todayIso()},
        {key:'status',label:'Status',type:'select',options:['Rascunho','Enviado'],default:'Enviado'}
      ],
      columns:[
        {label:'Título',field:'title'},{label:'Público',field:'audience'},{label:'Data de envio',render:i=>i.sendDate?formatDate(i.sendDate):'-'},
        {label:'Status',render:i=>badge(i.status,{Rascunho:'badge-gray',Enviado:'badge-green'})}
      ]
    },
    appointments: {
      key:'appointments', title:'Agendamentos', addLabel:'Novo agendamento', singular:'agendamento',
      desc:'Agendamento de atendimentos, reuniões e entrevistas com secretaria, direção ou coordenação.',
      emptyText:'Nenhum agendamento registrado.', savedMsg:'Agendamento registrado.',
      fields:[
        {key:'title',label:'Assunto',required:true,full:true},
        {key:'withWhom',label:'Atendido por',type:'select',options:['Secretaria','Direção','Coordenação Pedagógica']},
        {key:'date',label:'Data',type:'date',required:true},
        {key:'time',label:'Horário (ex.: 14:00)'},
        {key:'status',label:'Status',type:'select',options:['Agendado','Confirmado','Concluído','Cancelado'],default:'Agendado'}
      ],
      columns:[
        {label:'Assunto',field:'title'},{label:'Atendido por',field:'withWhom'},{label:'Data',render:i=>formatDate(i.date)},
        {label:'Horário',field:'time'},{label:'Status',render:i=>badge(i.status,{Agendado:'badge-blue',Confirmado:'badge-yellow',Concluído:'badge-green',Cancelado:'badge-gray'})}
      ]
    },
    serviceRequests: {
      key:'serviceRequests', title:'Solicitações e Protocolos', addLabel:'Nova solicitação', singular:'solicitação',
      desc:'Protocolo de solicitações da comunidade escolar: declarações, históricos, transferências, matrícula e mais.',
      info:'Cada solicitação recebe um número de protocolo automático e segue o fluxo: Aberta → Em análise → Aguardando documento → Em processamento → Concluída/Cancelada.',
      emptyText:'Nenhuma solicitação registrada.', savedMsg:'Solicitação protocolada.',
      fields:[
        {key:'protocol',label:'Protocolo (gerado automaticamente)',full:true},
        {key:'type',label:'Tipo',type:'select',options:['Declaração Escolar','Histórico Escolar','Boletim','Atestado','Transferência','Segunda Via de Documento','Matrícula','Rematrícula','Alteração Cadastral','Revisão de Nota','Aproveitamento de Estudos','Outro']},
        {key:'requester',label:'Solicitante',required:true},
        {key:'priority',label:'Prioridade',type:'select',options:['Normal','Prioritária'],default:'Normal'},
        {key:'dueDate',label:'Prazo',type:'date'},
        {key:'notes',label:'Observações',type:'textarea',full:true},
        {key:'attachment',label:'Anexo (ex.: atestado em PDF)',type:'file',hint:'Anexe aqui o PDF do atestado ou documento, quando houver. Até 4 MB.'},
        {key:'status',label:'Status',type:'select',options:['Aberta','Em análise','Aguardando documento','Em processamento','Concluída','Cancelada'],default:'Aberta'}
      ],
      columns:[
        {label:'Protocolo',render:i=>escapeHtml(i.protocol||'-')},{label:'Tipo',field:'type'},{label:'Solicitante',field:'requester'},
        {label:'Anexo',render:i=>i.attachment?`<a href="${i.attachment.dataUrl}" download="${escapeHtml(i.attachment.name)}" title="Baixar ${escapeHtml(i.attachment.name)}"><i class="fa-solid fa-paperclip"></i> ${escapeHtml(i.attachment.name.length>18?i.attachment.name.slice(0,16)+'…':i.attachment.name)}</a>`:'<span class="muted">—</span>'},
        {label:'Prioridade',render:i=>badge(i.priority,{Normal:'badge-gray',Prioritária:'badge-red'})},
        {label:'Status',render:i=>badge(i.status,{Aberta:'badge-blue','Em análise':'badge-yellow','Aguardando documento':'badge-red','Em processamento':'badge-yellow',Concluída:'badge-green',Cancelada:'badge-gray'})}
      ],
      onSave:(data)=>{ if(!data.protocol){ data.protocol=nextProtocol('ATD','serviceRequests'); } }
    },
    documentIssuances: {
      key:'documentIssuances', title:'Emissão Rápida de Documentos', addLabel:'Emitir documento', singular:'documento emitido',
      desc:'Selecione o aluno e o tipo de documento para gerar e imprimir declarações, atestados, boletins e históricos.',
      emptyText:'Nenhum documento emitido ainda.', savedMsg:'Documento emitido. Use o botão de impressão para visualizar.',
      fields:[
        {key:'studentName',label:'Aluno',required:true,full:true},
        {key:'docType',label:'Tipo de documento',type:'select',options:['Declaração de Matrícula','Declaração de Frequência','Declaração de Escolaridade','Declaração de Conclusão','Atestado','Boletim','Histórico Escolar','Comprovante','Documento de Transferência']},
        {key:'issueDate',label:'Data de emissão',type:'date',default:todayIso()},
        {key:'notes',label:'Observações',type:'textarea',full:true},
        {key:'protocol',label:'Protocolo (gerado automaticamente)',full:true}
      ],
      columns:[
        {label:'Protocolo',render:i=>escapeHtml(i.protocol||'-')},{label:'Aluno',field:'studentName'},{label:'Tipo',field:'docType'},
        {label:'Emissão',render:i=>i.issueDate?formatDate(i.issueDate):'-'}
      ],
      onSave:(data)=>{ if(!data.protocol){ data.protocol=nextProtocol('DOC','documentIssuances'); } },
      extraAction:{
        label:'Imprimir / visualizar', icon:'fa-print',
        handler:(item)=>{
          const school=schoolForCurrent();
          openModal('Documento — '+item.docType, `<div class="printable-doc" style="border:1px solid var(--border);padding:24px;border-radius:10px"><h2 style="margin-top:0">${escapeHtml(school?.name||'Escola')}</h2><p><strong>${escapeHtml(item.docType)}</strong></p><p>Protocolo: ${escapeHtml(item.protocol||'-')} • Emitido em: ${item.issueDate?formatDate(item.issueDate):'-'}</p><p>Aluno: ${escapeHtml(item.studentName)}</p><p>${escapeHtml(item.notes||'')}</p><p style="margin-top:40px">Responsável pela emissão: ${escapeHtml(state.user||'-')}</p></div><div class="form-actions"><button class="btn-primary" id="printDocBtn"><i class="fa-solid fa-print"></i> Imprimir</button></div>`);
          document.getElementById('printDocBtn').onclick=()=>window.print();
        }
      }
    }
  };

  function renderAuditLog(){
    const school=schoolForCurrent();
    const logs=(state.auditLog||[]).filter(l=>l.schoolId===school?.id);
    content.innerHTML=`${pageHeader('Auditoria','Registro de quem alterou o quê e quando, em todos os módulos do sistema.')}<div class="table-card"><div class="table-wrap"><table><thead><tr><th>Quando</th><th>Usuário</th><th>Perfil</th><th>Módulo</th><th>Ação</th><th>Registro</th></tr></thead><tbody>${logs.length?logs.map(l=>`<tr><td>${new Date(l.when).toLocaleString('pt-BR')}</td><td>${escapeHtml(l.user||'-')}</td><td>${escapeHtml(l.role||'-')}</td><td>${escapeHtml(l.module||'-')}</td><td>${escapeHtml(l.action||'-')}</td><td>${escapeHtml(String(l.summary||'-'))}</td></tr>`).join(''):'<tr><td colspan="6" style="text-align:center;padding:30px">Nenhuma alteração registrada ainda. Toda criação/edição feita nos módulos de cadastro passa a aparecer aqui.</td></tr>'}</tbody></table></div></div>`;
  }

  const MODULE_LABELS={alunos:'Alunos',responsaveis:'Responsáveis',professores:'Professores',funcionarios:'Funcionários',turmas:'Turmas',matriculas:'Matrículas',diario:'Diário de Classe',frequencia:'Frequência',notas:'Notas',boletim:'Boletim',coordenacao:'Coordenação Pedagógica',ocorrencias:'Ocorrências',documentos:'Documentos',protocolos:'Protocolos/Atendimento',biblioteca:'Biblioteca',transporte:'Transporte',alimentacao:'Alimentação',estoque:'Estoque',patrimonio:'Patrimônio',saude:'Saúde/Apoio',aee:'Educação Especial (AEE)',rh:'Recursos Humanos',vagas:'Vagas',financeiro:'Financeiro',comunicados:'Comunicados',calendario:'Calendário',relatorios:'Relatórios',censo:'Censo Escolar',auditoria:'Auditoria',permissoes:'Permissões',estrutura:'Estrutura/Escola',dies:'DIES — Inspeção Escolar',educacao:'Departamento de Educação'};
  const ACTION_LABELS={view:'Visualizar',create:'Criar',edit:'Editar',delete:'Excluir',approve:'Aprovar',export:'Exportar'};
  function renderPermissions(){
    state.permissions=state.permissions||seedDefaultPermissions();
    const roleKeys=Object.keys(roles);
    if(!window.__permRole||!roles[window.__permRole]) window.__permRole=roleKeys[0];
    const selected=window.__permRole;
    state.permissions[selected]=state.permissions[selected]||{};
    const actions=Object.keys(ACTION_LABELS);
    content.innerHTML=`${pageHeader('Permissões por Perfil','Defina o que cada perfil pode visualizar, criar, editar, excluir, aprovar ou exportar em cada módulo. Isso controla de verdade o que aparece no menu e nos botões do sistema.')}
      <div class="alert alert-info">Esta matriz é a configuração-mestre de permissões do SIGED. As alterações têm efeito imediato: um item sem "Visualizar" desaparece do menu do perfil, e botões de criar/editar/aprovar/exportar são ocultados ou bloqueados conforme aqui definido.</div>
      <div class="card"><div class="card-title"><div><h3>Perfil</h3><span>Selecione o perfil para editar suas permissões</span></div><select id="permRoleSelect">${roleKeys.map(k=>`<option value="${k}" ${k===selected?'selected':''}>${escapeHtml(roles[k].name)}</option>`).join('')}</select></div>
      <div class="table-wrap"><table><thead><tr><th>Módulo</th>${actions.map(a=>`<th>${ACTION_LABELS[a]}</th>`).join('')}</tr></thead><tbody>${PERMISSION_MODULES.map(m=>`<tr><td><strong>${MODULE_LABELS[m]||m}</strong></td>${actions.map(a=>{const checked=!!state.permissions[selected][m]?.[a];return `<td style="text-align:center"><input type="checkbox" class="perm-check" data-module="${m}" data-action="${a}" ${checked?'checked':''} ${selected==='direcao'?'disabled title="A Direção sempre tem acesso amplo"':''}></td>`;}).join('')}</tr>`).join('')}</tbody></table></div></div>`;
    document.getElementById('permRoleSelect').onchange=e=>{window.__permRole=e.target.value;renderPermissions();};
    document.querySelectorAll('.perm-check').forEach(chk=>chk.onchange=()=>{
      const m=chk.dataset.module, a=chk.dataset.action;
      state.permissions[selected][m]=state.permissions[selected][m]||{};
      state.permissions[selected][m][a]=chk.checked;
      save();
      logAudit('Permissões',chk.checked?'Concedida':'Revogada',`${roles[selected].name} — ${MODULE_LABELS[m]||m} / ${ACTION_LABELS[a]}`);
      showToast('Permissão atualizada. O menu e os botões desse perfil já refletem a mudança.');
      if(state.role===selected) buildMenu();
    });
  }

  function renderQueue(){
    const school=schoolForCurrent();
    const today=todayIso();
    const tickets=(state.queueTickets||[]).filter(t=>t.schoolId===school?.id&&t.date===today).sort((a,b)=>a.number-b.number);
    const waiting=tickets.filter(t=>t.status==='Aguardando');
    const current=tickets.find(t=>t.status==='Chamada');
    content.innerHTML=`${pageHeader('Fila de Atendimento','Emissão e chamada de senhas do dia, normais e prioritárias.','<button class="btn-primary" id="newNormal"><i class="fa-solid fa-plus"></i> Senha normal</button> <button class="btn-secondary" id="newPriority"><i class="fa-solid fa-star"></i> Senha prioritária</button>')}
      <div class="stat-grid">${statCard('Aguardando',waiting.length,'fa-hourglass-half')}${statCard('Senha em chamada',current?current.number:'-','fa-bullhorn')}${statCard('Atendidas hoje',tickets.filter(t=>t.status==='Atendida').length,'fa-check')}</div>
      <div class="card"><div class="card-title"><div><h3>Painel de senhas de hoje</h3></div><button class="btn-primary" id="callNext"><i class="fa-solid fa-forward"></i> Chamar próxima</button></div><div class="table-wrap"><table><thead><tr><th>Senha</th><th>Tipo</th><th>Status</th><th>Ação</th></tr></thead><tbody>${tickets.length?tickets.map(t=>`<tr><td><strong>${t.type==='Prioritária'?'P':'N'}${String(t.number).padStart(3,'0')}</strong></td><td>${escapeHtml(t.type)}</td><td>${badge(t.status,{Aguardando:'badge-blue',Chamada:'badge-yellow',Atendida:'badge-green'})}</td><td>${t.status==='Chamada'?`<button class="small-button ticket-done" data-id="${t.id}">Concluir</button>`:'-'}</td></tr>`).join(''):'<tr><td colspan="4" style="text-align:center;padding:30px">Nenhuma senha emitida hoje.</td></tr>'}</tbody></table></div></div>`;
    const nextNumber=()=>(tickets.reduce((a,t)=>Math.max(a,t.number),0)+1);
    document.getElementById('newNormal').onclick=()=>{state.queueTickets=state.queueTickets||[];state.queueTickets.push({id:crypto.randomUUID(),schoolId:school.id,date:today,number:nextNumber(),type:'Normal',status:'Aguardando'});save();renderQueue();showToast('Senha normal emitida.');};
    document.getElementById('newPriority').onclick=()=>{state.queueTickets=state.queueTickets||[];state.queueTickets.push({id:crypto.randomUUID(),schoolId:school.id,date:today,number:nextNumber(),type:'Prioritária',status:'Aguardando'});save();renderQueue();showToast('Senha prioritária emitida.');};
    document.getElementById('callNext').onclick=()=>{
      if(current){showToast('Conclua a senha em chamada antes de chamar a próxima.');return;}
      const priority=waiting.find(t=>t.type==='Prioritária')||waiting[0];
      if(!priority){showToast('Não há senhas aguardando.');return;}
      priority.status='Chamada';save();renderQueue();showToast(`Chamando senha ${priority.type==='Prioritária'?'P':'N'}${String(priority.number).padStart(3,'0')}.`);
    };
    document.querySelectorAll('.ticket-done').forEach(b=>b.onclick=()=>{const t=state.queueTickets.find(x=>x.id===b.dataset.id);if(t){t.status='Atendida';save();renderQueue();showToast('Atendimento concluído.');}});
  }

  function openModal(title,body){
    const m=document.getElementById('modal');
    if(m.classList.contains('hidden')) openModal.prev=document.activeElement;
    document.getElementById('modalTitle').textContent=title;document.getElementById('modalBody').innerHTML=body;m.classList.remove('hidden');
    const first=m.querySelector('#modalBody input:not([type=hidden]):not([disabled]),#modalBody select:not([disabled]),#modalBody textarea:not([disabled])');
    (first||document.getElementById('modalClose'))?.focus?.();
  }
  function closeModal(){
    document.getElementById('modal').classList.add('hidden');document.getElementById('modalBody').innerHTML='';
    const prev=openModal.prev;openModal.prev=null;if(prev&&prev.focus&&document.body.contains?.(prev))prev.focus();
  }
  function showToast(message){const t=document.getElementById('toast');t.textContent=message;t.classList.remove('hidden');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.add('hidden'),3000);}

  // ===== Vida acadêmica integrada (alunos, responsáveis, professores, diário, frequência, notas, boletim) =====
  const PERIODS=['1º Bimestre','2º Bimestre','3º Bimestre','4º Bimestre'];
  const PASS_GRADE=6, RECOVERY_MIN=4, MIN_ATTENDANCE=75;
  const sid=()=>schoolForCurrent()?.id;
  const fmtNum=n=>(n===null||n===undefined||n==='')?'—':Number(n).toFixed(1).replace('.',',');
  function todayIso(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
  const SITUATION_BADGE={Aprovado:'badge-green','Recuperação':'badge-yellow',Reprovado:'badge-red',Pendente:'badge-gray','Em andamento':'badge-blue'};
  const STUDENT_STATUS_BADGE={Ativo:'badge-green',Inativo:'badge-gray',Transferido:'badge-blue',Arquivado:'badge-gray'};
  function classLabel(c){return c?`${c.grade} — Turma ${c.name}`:'Sem turma';}
  function classById(id){return (state.classes||[]).find(c=>c.id===id);}
  function studentById(id){return (state.students||[]).find(s=>s.id===id);}
  function guardianById(id){return (state.guardians||[]).find(g=>g.id===id);}
  function teacherById(id){return (state.teachers||[]).find(t=>t.id===id);}
  function activeStudent(s){return s.status!=='Transferido'&&s.status!=='Inativo'&&s.status!=='Arquivado';}
  function studentsOfClass(classId){return (state.students||[]).filter(s=>s.schoolId===sid()&&s.classId===classId&&activeStudent(s)).sort((a,b)=>a.name.localeCompare(b.name));}
  function myTeacherId(){return state.role==='professor'?currentUser()?.vinculo:null;}
  function myGuardianId(){return state.role==='responsavel'?currentUser()?.vinculo:null;}
  function childrenOfGuardian(gid){return (state.students||[]).filter(s=>s.schoolId===sid()&&(s.guardians||[]).some(g=>g.guardianId===gid));}
  function selectedChild(){
    if(state.role==='aluno') return studentById(currentUser()?.vinculo)||null;
    if(state.role==='responsavel'){
      const kids=childrenOfGuardian(myGuardianId());
      if(!kids.length) return null;
      if(!kids.find(k=>k.id===window.__childId)) window.__childId=kids[0].id;
      return kids.find(k=>k.id===window.__childId);
    }
    return null;
  }
  function childSwitcherHtml(){
    if(state.role!=='responsavel') return '';
    const kids=childrenOfGuardian(myGuardianId());
    if(kids.length<1) return '';
    selectedChild();
    return `<div class="filter-bar"><label for="childSelect"><strong>Aluno(a) selecionado(a):</strong></label><select id="childSelect" aria-label="Selecionar filho">${kids.map(k=>`<option value="${k.id}" ${k.id===window.__childId?'selected':''}>${escapeHtml(k.name)} — ${escapeHtml(classLabel(classById(k.classId)))}</option>`).join('')}</select></div>`;
  }
  function bindChildSwitcher(rerender){document.getElementById('childSelect')?.addEventListener('change',e=>{window.__childId=e.target.value;rerender();});}
  function assignmentsForCurrentUser(){
    const list=(state.teacherAssignments||[]).filter(a=>a.schoolId===sid());
    if(state.role==='professor'){const tid=myTeacherId();return list.filter(a=>a.teacherId===tid);}
    return list;
  }
  function assignmentLabel(a){
    const c=classById(a.classId);const t=teacherById(a.teacherId);
    return `${classLabel(c)} · ${a.subject}${state.role==='professor'?'':' ('+(t?.name||'—')+')'}`;
  }
  function weightsFor(classId,subject){return (state.teacherAssignments||[]).find(a=>a.classId===classId&&a.subject===subject)?.weights;}
  function gradeMedia(g,w){
    w=w||{av1:1,av2:1,trabalho:1};
    let sum=0,ws=0;
    ['av1','av2','trabalho'].forEach(f=>{const v=g[f];if(v!==null&&v!==undefined&&v!==''){const wt=(w[f]??1);sum+=Number(v)*wt;ws+=wt;}});
    if(!ws) return null;
    const base=sum/ws;
    const r=g.recuperacao;
    if(r!==null&&r!==undefined&&r!==''&&Number(r)>base) return (base+Number(r))/2;
    return base;
  }
  function gradeSituation(g,m){
    if(m===null||m===undefined) return 'Pendente';
    if(m>=PASS_GRADE) return 'Aprovado';
    const hasRec=g&&g.recuperacao!==null&&g.recuperacao!==undefined&&g.recuperacao!=='';
    if(hasRec) return 'Reprovado';
    if(m>=RECOVERY_MIN) return 'Recuperação';
    return 'Reprovado';
  }
  function findGrade(classId,subject,period,studentId){return (state.grades||[]).find(g=>g.classId===classId&&g.subject===subject&&g.period===period&&g.studentId===studentId);}
  function periodMedia(studentId,classId,subject,period){const g=findGrade(classId,subject,period,studentId);return g?gradeMedia(g,weightsFor(classId,subject)):null;}
  function finalMedia(studentId,classId,subject){
    const ms=PERIODS.map(p=>periodMedia(studentId,classId,subject,p)).filter(m=>m!==null);
    return ms.length?ms.reduce((a,b)=>a+b,0)/ms.length:null;
  }
  function attendanceStats(studentId,classId,subject){
    const recs=(state.lessonRecords||[]).filter(r=>r.schoolId===sid()&&r.classId===classId&&(!subject||r.subject===subject));
    let total=0,pres=0,fal=0,just=0;
    recs.forEach(r=>{const e=(r.attendance||[]).find(x=>x.studentId===studentId);if(!e)return;total++;if(e.status==='Presente')pres++;else if(e.status==='Falta Justificada')just++;else fal++;});
    const pct=total?Math.round(((pres+just)/total)*1000)/10:null;
    return {total,pres,fal,just,pct};
  }
  function studentOverall(student){
    const c=classById(student.classId);
    if(!c) return {media:null,att:{total:0,pres:0,fal:0,just:0,pct:null},recovery:0};
    const finals=(c.subjects||[]).map(s=>({s:s.name,m:finalMedia(student.id,c.id,s.name)}));
    const ms=finals.filter(x=>x.m!==null).map(x=>x.m);
    return {media:ms.length?ms.reduce((a,b)=>a+b,0)/ms.length:null,att:attendanceStats(student.id,c.id,null),recovery:finals.filter(x=>x.m!==null&&x.m<PASS_GRADE&&x.m>=RECOVERY_MIN).length};
  }
  function riskReasons(student){
    const o=studentOverall(student);const r=[];
    if(o.att.pct!==null&&o.att.pct<MIN_ATTENDANCE) r.push(`Frequência ${String(o.att.pct).replace('.',',')}% (limite ${MIN_ATTENDANCE}%)`);
    if(o.media!==null&&o.media<PASS_GRADE) r.push(`Média geral ${fmtNum(o.media)}`);
    if(o.recovery>=2) r.push(`${o.recovery} disciplinas em recuperação`);
    return r;
  }

  // ----- utilitários de interface -----
  function formError(msg){
    let el=document.getElementById('formError');
    if(!el){const f=document.querySelector('#modalBody form');if(!f)return showToast(msg);el=document.createElement('div');el.id='formError';el.className='alert alert-danger';el.setAttribute('role','alert');f.prepend(el);}
    el.textContent=msg;el.scrollIntoView({block:'nearest'});
  }
  function confirmAction(title,message,onConfirm,confirmLabel='Confirmar'){
    openModal(title,`<p>${message}</p><div class="form-actions"><button type="button" class="btn-secondary" id="cfNo">Cancelar</button> <button type="button" class="btn-primary" id="cfYes">${confirmLabel}</button></div>`);
    document.getElementById('cfNo').onclick=closeModal;
    document.getElementById('cfYes').onclick=()=>{closeModal();onConfirm();};
    document.getElementById('cfNo').focus();
  }
  function notify(type,text,opts={}){
    state.notifications=state.notifications||[];
    state.notifications.unshift({id:crypto.randomUUID(),schoolId:sid(),type,text,studentId:opts.studentId||null,date:new Date().toISOString(),read:false});
    if(state.notifications.length>400) state.notifications.length=400;
  }
  function exportCsv(name,rows){
    const csv=rows.map(r=>r.map(c=>`"${String(c??'').replace(/"/g,'""')}"`).join(';')).join('\n');
    const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'});
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(a.href),500);
    showToast('Arquivo CSV gerado.');logAudit('Relatórios','Exportação',name);
  }
  function paginate(list,key){
    window.__pg=window.__pg||{};
    const st=window.__pg[key]=window.__pg[key]||{page:1,size:10};
    const pages=Math.max(1,Math.ceil(list.length/st.size));
    if(st.page>pages) st.page=pages;
    return {slice:list.slice((st.page-1)*st.size,st.page*st.size),st,pages,total:list.length};
  }
  function paginationHtml(p,key){
    return `<div class="pagination"><label>Registros por página <select class="pg-size" data-key="${key}">${[10,25,50,100].map(n=>`<option ${n===p.st.size?'selected':''}>${n}</option>`).join('')}</select></label><span>${p.total} registro(s) · página ${p.st.page} de ${p.pages}</span><button type="button" class="small-button pg-prev" data-key="${key}" ${p.st.page<=1?'disabled':''} aria-label="Página anterior"><i class="fa-solid fa-chevron-left"></i></button><button type="button" class="small-button pg-next" data-key="${key}" ${p.st.page>=p.pages?'disabled':''} aria-label="Próxima página"><i class="fa-solid fa-chevron-right"></i></button></div>`;
  }
  function bindPagination(key,rerender){
    document.querySelectorAll(`.pg-size[data-key="${key}"]`).forEach(s=>s.onchange=()=>{window.__pg[key].size=Number(s.value);window.__pg[key].page=1;rerender();});
    document.querySelectorAll(`.pg-prev[data-key="${key}"]`).forEach(b=>b.onclick=()=>{window.__pg[key].page--;rerender();});
    document.querySelectorAll(`.pg-next[data-key="${key}"]`).forEach(b=>b.onclick=()=>{window.__pg[key].page++;rerender();});
  }
  const validCpf=v=>!v||/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(v.trim());
  const validEmail=v=>!v||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const validPhone=v=>!v||/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/.test(v.trim());
  const maskCpf=v=>v?String(v).replace(/^(\d{3}).?(\d{3}).?(\d{3})-?(\d{2})$/,'***.***.***-$4'):'—';
  function optionsHtml(list,selected,placeholder){return (placeholder!==undefined?`<option value="">${placeholder}</option>`:'')+list.map(o=>{const v=typeof o==='object'?o.value:o;const l=typeof o==='object'?o.label:o;return `<option value="${escapeHtml(v)}" ${String(v)===String(selected)?'selected':''}>${escapeHtml(l)}</option>`;}).join('');}

  // ----- Alunos -----
  function visibleStudents(){
    let list=(state.students||[]).filter(s=>s.schoolId===sid());
    if(state.role==='professor'){
      const classIds=new Set(assignmentsForCurrentUser().map(a=>a.classId));
      list=list.filter(s=>classIds.has(s.classId));
    }
    return list;
  }
  function renderStudents(){
    if(!can('alunos','view')){renderAccessDenied('Alunos');return;}
    window.__stf=window.__stf||{q:'',classId:'',status:''};
    const classes=(state.classes||[]).filter(c=>c.schoolId===sid());
    content.innerHTML=`${pageHeader('Alunos','Cadastro completo, vínculo com responsáveis e turma, situação escolar e acompanhamento.',can('alunos','create')?'<button class="btn-primary" id="newStudent"><i class="fa-solid fa-plus"></i> Novo aluno</button>':'')}
      <div class="filter-bar"><label for="stQ" class="sr-only">Buscar</label><input id="stQ" type="search" placeholder="Buscar por nome, matrícula ou CPF" value="${escapeHtml(window.__stf.q)}"><label for="stClass" class="sr-only">Turma</label><select id="stClass"><option value="">Todas as turmas</option>${classes.map(c=>`<option value="${c.id}" ${window.__stf.classId===c.id?'selected':''}>${escapeHtml(classLabel(c))}</option>`).join('')}</select><label for="stStatus" class="sr-only">Situação</label><select id="stStatus"><option value="">Todas as situações</option>${['Ativo','Inativo','Transferido','Arquivado'].map(s=>`<option ${window.__stf.status===s?'selected':''}>${s}</option>`).join('')}</select><button type="button" class="btn-secondary" id="stClear">Limpar filtros</button></div>
      <div class="table-card"><div id="stTable"></div></div>`;
    const draw=()=>drawStudentsTable();
    document.getElementById('stQ').oninput=e=>{window.__stf.q=e.target.value;if(window.__pg?.students)window.__pg.students.page=1;draw();};
    document.getElementById('stClass').onchange=e=>{window.__stf.classId=e.target.value;draw();};
    document.getElementById('stStatus').onchange=e=>{window.__stf.status=e.target.value;draw();};
    document.getElementById('stClear').onclick=()=>{window.__stf={q:'',classId:'',status:''};renderStudents();};
    document.getElementById('newStudent')?.addEventListener('click',()=>openStudentEditor());
    draw();
  }
  function drawStudentsTable(){
    const f=window.__stf;const q=f.q.trim().toLowerCase();
    let list=visibleStudents();
    if(q) list=list.filter(s=>[s.name,s.socialName,s.registration,s.cpf].some(v=>String(v||'').toLowerCase().includes(q)));
    if(f.classId) list=list.filter(s=>s.classId===f.classId);
    if(f.status) list=list.filter(s=>(s.status||'Ativo')===f.status);
    list.sort((a,b)=>a.name.localeCompare(b.name));
    const p=paginate(list,'students');
    const box=document.getElementById('stTable');
    if(!box) return;
    box.innerHTML=`<div class="table-wrap"><table><thead><tr><th>Aluno</th><th>Matrícula</th><th>Turma</th><th>Frequência</th><th>Média geral</th><th>Situação</th><th>Ações</th></tr></thead><tbody>${p.slice.length?p.slice.map(s=>{const o=studentOverall(s);const attBad=o.att.pct!==null&&o.att.pct<MIN_ATTENDANCE;return `<tr><td><strong>${escapeHtml(s.socialName||s.name)}</strong>${s.socialName?`<br><small class="muted">${escapeHtml(s.name)}</small>`:''}</td><td>${escapeHtml(s.registration||'-')}</td><td>${escapeHtml(classLabel(classById(s.classId)))}</td><td>${o.att.pct===null?'—':`<span class="badge ${attBad?'badge-red':'badge-green'}">${String(o.att.pct).replace('.',',')}%${attBad?' ⚠':''}</span>`}</td><td>${fmtNum(o.media)}</td><td>${badge(s.status||'Ativo',STUDENT_STATUS_BADGE)}</td><td><button type="button" class="small-button st-view" data-id="${s.id}" title="Ver ficha" aria-label="Ver ficha de ${escapeHtml(s.name)}"><i class="fa-solid fa-eye"></i></button> ${can('alunos','edit')?`<button type="button" class="small-button st-edit" data-id="${s.id}" title="Editar" aria-label="Editar ${escapeHtml(s.name)}"><i class="fa-solid fa-pen"></i></button> `:''}${can('boletim','view')?`<button type="button" class="small-button st-card" data-id="${s.id}" title="Boletim" aria-label="Boletim de ${escapeHtml(s.name)}"><i class="fa-solid fa-file-lines"></i></button>`:''}</td></tr>`;}).join(''):`<tr><td colspan="7"><div class="empty-state">Nenhum aluno encontrado.${can('alunos','create')?' <button type="button" class="btn-primary" id="emptyNewStudent">+ Cadastrar aluno</button>':''}</div></td></tr>`}</tbody></table></div>${paginationHtml(p,'students')}`;
    box.querySelectorAll('.st-view').forEach(b=>b.onclick=()=>openStudentView(b.dataset.id));
    box.querySelectorAll('.st-edit').forEach(b=>b.onclick=()=>openStudentEditor(b.dataset.id));
    box.querySelectorAll('.st-card').forEach(b=>b.onclick=()=>{window.__rcStudent=b.dataset.id;const item=(roles[state.role].menu.find(x=>x[1]==='reportCard'));if(item)navigate('reportCard');else renderReportCard();});
    document.getElementById('emptyNewStudent')?.addEventListener('click',()=>openStudentEditor());
    bindPagination('students',drawStudentsTable);
  }
  function openStudentView(id){
    const s=studentById(id);if(!s)return;
    const c=classById(s.classId);
    const gs=(s.guardians||[]).map(g=>({g:guardianById(g.guardianId),k:g.kinship})).filter(x=>x.g);
    const sensitive=can('aee','view');
    const row=(l,v)=>`<div><span>${l}</span><strong>${escapeHtml(v||'—')}</strong></div>`;
    openModal(`Ficha do aluno — ${s.name}`,`<div class="detail-grid">${row('Nome social',s.socialName)}${row('Matrícula',s.registration)}${row('Nascimento',s.birthDate?formatDate(s.birthDate):'')}${row('CPF',can('alunos','edit')?s.cpf:maskCpf(s.cpf))}${row('Sexo',s.gender)}${row('Naturalidade',s.birthplace)}${row('Filiação',[s.mother,s.father].filter(Boolean).join(' / '))}${row('Endereço',[s.street,s.number,s.neighborhood,s.city&&`${s.city}/${s.uf||''}`].filter(Boolean).join(', '))}${row('Contato',[s.cellphone||s.phone,s.email].filter(Boolean).join(' · '))}${row('Turma',classLabel(c))}${row('Turno',c?.shift)}${row('Situação',s.status||'Ativo')}${row('Escola anterior',s.previousSchool)}${row('Data da matrícula',s.enrollmentDate?formatDate(s.enrollmentDate):'')}</div><h4>Responsáveis</h4>${gs.length?`<ul class="plain-list">${gs.map(x=>`<li><strong>${escapeHtml(x.g.name)}</strong> (${escapeHtml(x.k||'Responsável')}) — ${escapeHtml(x.g.phone||'sem telefone')}</li>`).join('')}</ul>`:'<p class="muted">Nenhum responsável vinculado.</p>'}${s.emergencyContact?`<p><strong>Contato de emergência:</strong> ${escapeHtml(s.emergencyContact)}</p>`:''}${s.pickupAuthorized?`<p><strong>Autorizados a retirar:</strong> ${escapeHtml(s.pickupAuthorized)}</p>`:''}${sensitive?`<h4>Dados educacionais (restrito)</h4><p><strong>AEE:</strong> ${s.aee==='Sim'?'Sim':'Não'} ${s.aeeNotes?'— '+escapeHtml(s.aeeNotes):''}</p><p><strong>Observações pedagógicas:</strong> ${escapeHtml(s.pedagogicalNotes||'—')}</p>`:''}<h4>Histórico de alterações</h4>${(s.history||[]).length?`<ul class="plain-list">${s.history.slice().reverse().slice(0,8).map(h=>`<li>${formatDate(h.date)} — ${escapeHtml(h.text)} <small class="muted">(${escapeHtml(h.by||'')})</small></li>`).join('')}</ul>`:'<p class="muted">Sem alterações registradas.</p>'}<div class="form-actions"><button type="button" class="btn-secondary" id="svClose">Fechar</button></div>`);
    document.getElementById('svClose').onclick=closeModal;
  }
  function openStudentEditor(id=null){
    const school=schoolForCurrent();
    if(!school){showToast('Cadastre uma escola primeiro.');return;}
    const action=id?'edit':'create';
    if(!can('alunos',action)){denyToast(action);return;}
    const s=id?studentById(id):{};
    const classes=state.classes.filter(c=>c.schoolId===school.id);
    const guardians=state.guardians.filter(g=>g.schoolId===school.id);
    const gl=(s.guardians||[]);
    const occupancy=c=>{const n=(state.students||[]).filter(x=>x.classId===c.id&&activeStudent(x)&&x.id!==id).length;return `${classLabel(c)} (${n}/${c.vacancies||'?'} alunos)`;};
    const inp=(idn,label,val,extra='')=>`<div><label for="${idn}">${label}</label><input id="${idn}" value="${escapeHtml(val||'')}" ${extra}></div>`;
    const sel=(idn,label,opts,val)=>`<div><label for="${idn}">${label}</label><select id="${idn}">${optionsHtml(opts,val)}</select></div>`;
    const kin=['Mãe','Pai','Avó/Avô','Tio/Tia','Responsável legal','Outro'];
    openModal(id?`Alterar aluno — ${escapeHtml(s.name)}`:'Novo aluno',`<form id="studentForm" class="form-card" style="border:none;padding:0;max-width:none" novalidate>
      <fieldset><legend>Identificação</legend><div class="form-grid">
        <div class="full"><label for="st_name">Nome completo *</label><input id="st_name" value="${escapeHtml(s.name||'')}" required></div>
        ${inp('st_social','Nome social',s.socialName)}${inp('st_birth','Data de nascimento *',s.birthDate,'type="date"')}
        ${inp('st_cpf','CPF',s.cpf,'placeholder="000.000.000-00"')}${inp('st_rg','RG',s.rg)}
        ${sel('st_gender','Sexo',['','Feminino','Masculino','Outro / não informado'],s.gender)}${inp('st_nat','Nacionalidade',s.nationality||'Brasileira')}
        ${inp('st_birthplace','Naturalidade',s.birthplace)}${inp('st_reg','Matrícula',s.registration,id?'':'placeholder="Gerada automaticamente se vazia"')}
        ${inp('st_mother','Filiação — mãe',s.mother)}${inp('st_father','Filiação — pai',s.father)}
      </div></fieldset>
      <fieldset><legend>Endereço</legend><div class="form-grid">
        ${inp('st_cep','CEP',s.cep,'placeholder="00000-000"')}${inp('st_street','Rua',s.street)}${inp('st_number','Número',s.number)}${inp('st_comp','Complemento',s.complement)}${inp('st_neigh','Bairro',s.neighborhood)}${inp('st_city','Cidade',s.city||school.city)}${inp('st_uf','Estado',s.uf||school.state,'maxlength="2"')}
      </div></fieldset>
      <fieldset><legend>Contatos</legend><div class="form-grid">${inp('st_phone','Telefone',s.phone,'placeholder="(79) 3000-0000"')}${inp('st_cell','Celular',s.cellphone,'placeholder="(79) 99999-0000"')}<div class="full"><label for="st_email">E-mail</label><input id="st_email" type="email" value="${escapeHtml(s.email||'')}"></div></div></fieldset>
      <fieldset><legend>Vida escolar</legend><div class="form-grid">
        <div class="full"><label for="st_class">Turma</label><select id="st_class"><option value="">Sem turma</option>${classes.map(c=>`<option value="${c.id}" ${s.classId===c.id?'selected':''}>${escapeHtml(occupancy(c))}</option>`).join('')}</select></div>
        ${sel('st_status','Situação',['Ativo','Inativo','Transferido','Arquivado'],s.status||'Ativo')}${sel('st_modal','Modalidade',['Regular','EJA','Educação Especial'],s.modality||'Regular')}
        ${inp('st_prev','Escola anterior',s.previousSchool)}${inp('st_enroll','Data da matrícula',s.enrollmentDate||todayIso(),'type="date"')}
      </div></fieldset>
      <fieldset><legend>Responsáveis</legend><div class="form-grid">
        ${sel('st_g1','Responsável 1',[{value:'',label:'— nenhum —'},...guardians.map(g=>({value:g.id,label:g.name}))],gl[0]?.guardianId)}${sel('st_k1','Parentesco 1',kin,gl[0]?.kinship||'Mãe')}
        ${sel('st_g2','Responsável 2',[{value:'',label:'— nenhum —'},...guardians.map(g=>({value:g.id,label:g.name}))],gl[1]?.guardianId)}${sel('st_k2','Parentesco 2',kin,gl[1]?.kinship||'Pai')}
        ${inp('st_emerg','Contato de emergência',s.emergencyContact)}${inp('st_pick','Autorizados a retirar o aluno',s.pickupAuthorized)}
      </div>${guardians.length?'':'<p class="muted">Nenhum responsável cadastrado. Cadastre em Pessoas → Responsáveis.</p>'}</fieldset>
      ${can('aee','view')?`<fieldset><legend>Dados educacionais (restrito)</legend><div class="form-grid">${sel('st_aee','Atendimento Educacional Especializado (AEE)',['Não','Sim'],s.aee||'Não')}<div class="full"><label for="st_aeenotes">Necessidades / acompanhamento</label><textarea id="st_aeenotes" rows="2">${escapeHtml(s.aeeNotes||'')}</textarea></div><div class="full"><label for="st_ped">Observações pedagógicas</label><textarea id="st_ped" rows="2">${escapeHtml(s.pedagogicalNotes||'')}</textarea></div></div></fieldset>`:''}
      <div class="form-actions"><button type="button" class="btn-secondary" id="stCancel">Cancelar</button> <button class="btn-primary">Salvar aluno</button></div></form>`);
    document.getElementById('stCancel').onclick=closeModal;
    document.getElementById('st_name').focus();
    document.getElementById('studentForm').onsubmit=e=>{
      e.preventDefault();
      const v=k=>document.getElementById(k)?.value.trim();
      const data={name:v('st_name'),socialName:v('st_social'),birthDate:v('st_birth'),cpf:v('st_cpf'),rg:v('st_rg'),gender:v('st_gender'),nationality:v('st_nat'),birthplace:v('st_birthplace'),mother:v('st_mother'),father:v('st_father'),cep:v('st_cep'),street:v('st_street'),number:v('st_number'),complement:v('st_comp'),neighborhood:v('st_neigh'),city:v('st_city'),uf:v('st_uf').toUpperCase(),phone:v('st_phone'),cellphone:v('st_cell'),email:v('st_email'),classId:v('st_class')||null,status:v('st_status'),modality:v('st_modal'),previousSchool:v('st_prev'),enrollmentDate:v('st_enroll'),emergencyContact:v('st_emerg'),pickupAuthorized:v('st_pick')};
      if(document.getElementById('st_aee')){data.aee=v('st_aee');data.aeeNotes=v('st_aeenotes');data.pedagogicalNotes=v('st_ped');}
      if(!data.name) return formError('Informe o nome completo do aluno.');
      if(!data.birthDate) return formError('Informe a data de nascimento.');
      if(new Date(data.birthDate)>new Date()) return formError('A data de nascimento não pode ser futura.');
      if(!validCpf(data.cpf)) return formError('CPF em formato inválido. Use 000.000.000-00.');
      if(!validEmail(data.email)) return formError('E-mail inválido.');
      if(!validPhone(data.phone)||!validPhone(data.cellphone)) return formError('Telefone em formato inválido. Ex.: (79) 99999-0000.');
      const others=state.students.filter(x=>x.schoolId===school.id&&x.id!==id);
      const cpfDigits=d=>String(d||'').replace(/\D/g,'');
      if(data.cpf&&others.some(x=>cpfDigits(x.cpf)===cpfDigits(data.cpf))) return formError('Já existe um aluno cadastrado com este CPF.');
      let reg=v('st_reg');
      if(reg&&others.some(x=>x.registration===reg)) return formError('Já existe um aluno com esta matrícula.');
      if(!reg) reg=id?s.registration:'ALU-'+String(2000+state.students.filter(x=>x.schoolId===school.id).length+Math.floor(Math.random()*50));
      data.registration=reg;
      const g1=v('st_g1'),g2=v('st_g2');
      if(g1&&g1===g2) return formError('O mesmo responsável não pode ser informado duas vezes.');
      const newGuardians=[];if(g1)newGuardians.push({guardianId:g1,kinship:v('st_k1')});if(g2)newGuardians.push({guardianId:g2,kinship:v('st_k2')});
      const cls=classById(data.classId);
      if(cls&&data.status==='Ativo'){
        const n=state.students.filter(x=>x.classId===cls.id&&activeStudent(x)&&x.id!==id).length;
        if(n>=(cls.vacancies||Infinity)) return formError(`A turma ${classLabel(cls)} está cheia (${n}/${cls.vacancies}). Escolha outra turma ou amplie as vagas.`);
      }
      data.className=cls?cls.name:'Sem vínculo';
      const now=todayIso();
      if(id){
        const changes=[];
        if((s.classId||null)!==data.classId) changes.push(`Turma: ${classLabel(classById(s.classId))} → ${classLabel(cls)}`);
        if((s.status||'Ativo')!==data.status) changes.push(`Situação: ${s.status||'Ativo'} → ${data.status}`);
        s.history=s.history||[];
        changes.forEach(t=>s.history.push({date:now,text:t,by:state.user}));
        Object.assign(s,data,{guardians:newGuardians});
        logAudit('Alunos','Alteração',`${s.name}${changes.length?' — '+changes.join('; '):''}`);
      } else {
        const ns={id:crypto.randomUUID(),schoolId:school.id,...data,guardians:newGuardians,history:[{date:now,text:`Aluno cadastrado${cls?' na turma '+classLabel(cls):''}`,by:state.user}]};
        state.students.push(ns);
        logAudit('Alunos','Criação',`${ns.name} (${ns.registration})`);
        notify('matricula',`Aluno ${ns.name} cadastrado e vinculado${cls?' à turma '+classLabel(cls):''}.`,{studentId:ns.id});
      }
      save();closeModal();renderStudents();showToast('Aluno salvo. Turma, boletim, portais e relatórios já refletem a alteração.');
    };
  }

  // ----- Responsáveis -----
  function renderGuardians(){
    if(!can('responsaveis','view')){renderAccessDenied('Responsáveis');return;}
    window.__gf=window.__gf||{q:''};
    content.innerHTML=`${pageHeader('Responsáveis','Cadastro de responsáveis e vínculo com um ou mais alunos.',can('responsaveis','create')?'<button class="btn-primary" id="newGuardian"><i class="fa-solid fa-plus"></i> Novo responsável</button>':'')}<div class="filter-bar"><label for="gQ" class="sr-only">Buscar</label><input id="gQ" type="search" placeholder="Buscar por nome, CPF ou aluno" value="${escapeHtml(window.__gf.q)}"><button type="button" class="btn-secondary" id="gClear">Limpar filtros</button></div><div class="table-card"><div id="gTable"></div></div>`;
    const draw=()=>{
      const q=window.__gf.q.trim().toLowerCase();
      let list=(state.guardians||[]).filter(g=>g.schoolId===sid());
      const kidsOf=g=>childrenOfGuardian(g.id);
      if(q) list=list.filter(g=>g.name.toLowerCase().includes(q)||String(g.cpf||'').includes(q)||kidsOf(g).some(k=>k.name.toLowerCase().includes(q)));
      list.sort((a,b)=>a.name.localeCompare(b.name));
      const p=paginate(list,'guardians');
      const canEdit=can('responsaveis','edit');
      document.getElementById('gTable').innerHTML=`<div class="table-wrap"><table><thead><tr><th>Responsável</th><th>CPF</th><th>Contato</th><th>Filhos vinculados</th><th>Situação</th><th>Ação</th></tr></thead><tbody>${p.slice.length?p.slice.map(g=>`<tr><td><strong>${escapeHtml(g.name)}</strong></td><td>${canEdit?escapeHtml(g.cpf||'—'):maskCpf(g.cpf)}</td><td>${escapeHtml(g.phone||'—')}<br><small class="muted">${escapeHtml(g.email||'')}</small></td><td>${kidsOf(g).map(k=>escapeHtml(k.name)+' <small class="muted">('+escapeHtml(k.className||'')+')</small>').join('<br>')||'<span class="muted">Nenhum</span>'}</td><td>${badge(g.status||'Ativo',{Ativo:'badge-green',Inativo:'badge-gray'})}</td><td>${canEdit?`<button type="button" class="small-button g-edit" data-id="${g.id}" aria-label="Editar ${escapeHtml(g.name)}"><i class="fa-solid fa-pen"></i></button>`:'<span class="muted">Somente leitura</span>'}</td></tr>`).join(''):`<tr><td colspan="6"><div class="empty-state">Nenhum responsável encontrado.</div></td></tr>`}</tbody></table></div>${paginationHtml(p,'guardians')}`;
      document.querySelectorAll('.g-edit').forEach(b=>b.onclick=()=>openGuardianEditor(b.dataset.id));
      bindPagination('guardians',draw);
    };
    document.getElementById('gQ').oninput=e=>{window.__gf.q=e.target.value;draw();};
    document.getElementById('gClear').onclick=()=>{window.__gf={q:''};renderGuardians();};
    document.getElementById('newGuardian')?.addEventListener('click',()=>openGuardianEditor());
    draw();
  }
  function openGuardianEditor(id=null){
    const action=id?'edit':'create';
    if(!can('responsaveis',action)){denyToast(action);return;}
    const school=schoolForCurrent();if(!school)return;
    const g=id?guardianById(id):{};
    openModal(id?`Alterar responsável — ${escapeHtml(g.name)}`:'Novo responsável',`<form id="guardianForm" class="form-card" style="border:none;padding:0;max-width:none" novalidate><div class="form-grid"><div class="full"><label for="g_name">Nome completo *</label><input id="g_name" value="${escapeHtml(g.name||'')}" required></div><div><label for="g_cpf">CPF *</label><input id="g_cpf" value="${escapeHtml(g.cpf||'')}" placeholder="000.000.000-00"></div><div><label for="g_phone">Telefone / celular *</label><input id="g_phone" value="${escapeHtml(g.phone||'')}" placeholder="(79) 99999-0000"></div><div class="full"><label for="g_email">E-mail</label><input id="g_email" type="email" value="${escapeHtml(g.email||'')}"></div><div><label for="g_emerg">Contato de emergência</label><select id="g_emerg">${optionsHtml(['Sim','Não'],g.emergency||'Sim')}</select></div><div><label for="g_pick">Autorizado a retirar o aluno</label><select id="g_pick">${optionsHtml(['Sim','Não'],g.canPickup||'Sim')}</select></div><div><label for="g_status">Situação</label><select id="g_status">${optionsHtml(['Ativo','Inativo'],g.status||'Ativo')}</select></div></div><div class="form-actions"><button type="button" class="btn-secondary" id="gCancel">Cancelar</button> <button class="btn-primary">Salvar responsável</button></div></form>`);
    document.getElementById('gCancel').onclick=closeModal;
    document.getElementById('g_name').focus();
    document.getElementById('guardianForm').onsubmit=e=>{
      e.preventDefault();
      const v=k=>document.getElementById(k).value.trim();
      const data={name:v('g_name'),cpf:v('g_cpf'),phone:v('g_phone'),email:v('g_email'),emergency:v('g_emerg'),canPickup:v('g_pick'),status:v('g_status')};
      if(!data.name) return formError('Informe o nome do responsável.');
      if(!data.cpf) return formError('Informe o CPF do responsável.');
      if(!validCpf(data.cpf)) return formError('CPF em formato inválido. Use 000.000.000-00.');
      if(!data.phone) return formError('Informe um telefone de contato.');
      if(!validPhone(data.phone)) return formError('Telefone em formato inválido. Ex.: (79) 99999-0000.');
      if(!validEmail(data.email)) return formError('E-mail inválido.');
      const dig=d=>String(d||'').replace(/\D/g,'');
      if(state.guardians.some(x=>x.schoolId===school.id&&x.id!==id&&dig(x.cpf)===dig(data.cpf))) return formError('Já existe um responsável com este CPF.');
      if(id){Object.assign(g,data);logAudit('Responsáveis','Alteração',data.name);}
      else{state.guardians.push({id:crypto.randomUUID(),schoolId:school.id,...data});logAudit('Responsáveis','Criação',data.name);}
      save();closeModal();renderGuardians();showToast('Responsável salvo. Vincule-o a um aluno na ficha do aluno.');
    };
  }

  // ----- Professores e distribuição -----
  function renderTeachers(){
    if(!can('professores','view')){renderAccessDenied('Professores');return;}
    const list=(state.teachers||[]).filter(t=>t.schoolId===sid()).sort((a,b)=>a.name.localeCompare(b.name));
    const asg=t=>(state.teacherAssignments||[]).filter(a=>a.teacherId===t.id);
    content.innerHTML=`${pageHeader('Professores','Cadastro funcional, formação, vínculo e turmas/disciplinas atribuídas.',can('professores','create')?'<button class="btn-primary" id="newTeacher"><i class="fa-solid fa-plus"></i> Novo professor</button>':'')}<div class="table-card"><div class="table-wrap"><table><thead><tr><th>Professor</th><th>Matrícula funcional</th><th>Vínculo</th><th>Formação</th><th>Atribuições</th><th>Carga</th><th>Situação</th><th>Ação</th></tr></thead><tbody>${list.length?list.map(t=>{const a=asg(t);const load=a.reduce((x,y)=>x+(Number(y.weeklyClasses)||0),0);return `<tr><td><strong>${escapeHtml(t.name)}</strong><br><small class="muted">${escapeHtml(t.email||'')}</small></td><td>${escapeHtml(t.registration||'—')}</td><td>${escapeHtml(t.bond||'—')}</td><td>${escapeHtml(t.formation||'—')}</td><td>${a.length?a.map(x=>escapeHtml(x.subject)+' · '+escapeHtml(classById(x.classId)?.grade.replace(' do Ensino','')||'')+' '+escapeHtml(classById(x.classId)?.name||'')).join('<br>'):'<span class="muted">Sem atribuição</span>'}</td><td>${load} aulas/sem</td><td>${badge(t.status||'Ativo',{Ativo:'badge-green',Afastado:'badge-yellow',Inativo:'badge-gray'})}</td><td>${can('professores','edit')?`<button type="button" class="small-button t-edit" data-id="${t.id}" aria-label="Editar ${escapeHtml(t.name)}"><i class="fa-solid fa-pen"></i></button>`:'<span class="muted">Somente leitura</span>'}</td></tr>`;}).join(''):'<tr><td colspan="8"><div class="empty-state">Nenhum professor cadastrado.</div></td></tr>'}</tbody></table></div></div>`;
    document.getElementById('newTeacher')?.addEventListener('click',()=>openTeacherEditor());
    document.querySelectorAll('.t-edit').forEach(b=>b.onclick=()=>openTeacherEditor(b.dataset.id));
  }
  function openTeacherEditor(id=null){
    const action=id?'edit':'create';
    if(!can('professores',action)){denyToast(action);return;}
    const school=schoolForCurrent();if(!school)return;
    const t=id?teacherById(id):{};
    const inp=(idn,label,val,extra='')=>`<div><label for="${idn}">${label}</label><input id="${idn}" value="${escapeHtml(val||'')}" ${extra}></div>`;
    openModal(id?`Alterar professor — ${escapeHtml(t.name)}`:'Novo professor',`<form id="teacherForm" class="form-card" style="border:none;padding:0;max-width:none" novalidate><div class="form-grid"><div class="full"><label for="t_name">Nome completo *</label><input id="t_name" value="${escapeHtml(t.name||'')}" required></div>${inp('t_reg','Matrícula funcional',t.registration,'placeholder="Gerada se vazia"')}${inp('t_cpf','CPF',t.cpf,'placeholder="000.000.000-00"')}${inp('t_email','E-mail institucional',t.email,'type="email"')}${inp('t_phone','Contato',t.phone)}${inp('t_form','Formação',t.formation)}<div><label for="t_bond">Vínculo</label><select id="t_bond">${optionsHtml(['Efetivo','Temporário','Contratado','Substituto','Cedido'],t.bond||'Efetivo')}</select></div>${inp('t_hours','Carga horária contratada (h/sem)',t.contractHours||20,'type="number" min="1" max="60"')}<div><label for="t_status">Situação</label><select id="t_status">${optionsHtml(['Ativo','Afastado','Inativo'],t.status||'Ativo')}</select></div></div><div class="form-actions"><button type="button" class="btn-secondary" id="tCancel">Cancelar</button> <button class="btn-primary">Salvar professor</button></div></form>`);
    document.getElementById('tCancel').onclick=closeModal;document.getElementById('t_name').focus();
    document.getElementById('teacherForm').onsubmit=e=>{
      e.preventDefault();const v=k=>document.getElementById(k).value.trim();
      const data={name:v('t_name'),registration:v('t_reg'),cpf:v('t_cpf'),email:v('t_email'),phone:v('t_phone'),formation:v('t_form'),bond:v('t_bond'),contractHours:Number(v('t_hours'))||0,status:v('t_status')};
      if(!data.name) return formError('Informe o nome do professor.');
      if(!validCpf(data.cpf)) return formError('CPF em formato inválido.');
      if(!validEmail(data.email)) return formError('E-mail inválido.');
      if(!data.registration) data.registration='PROF-'+(1100+state.teachers.length);
      if(state.teachers.some(x=>x.schoolId===school.id&&x.id!==id&&x.registration===data.registration)) return formError('Já existe um professor com esta matrícula funcional.');
      if(id){Object.assign(t,data);logAudit('Professores','Alteração',data.name);}
      else{state.teachers.push({id:crypto.randomUUID(),schoolId:school.id,classId:null,className:'Sem vínculo',...data});logAudit('Professores','Criação',data.name);}
      save();closeModal();renderTeachers();showToast('Professor salvo.');
    };
  }
  function renderAssignments(){
    if(!can('professores','view')){renderAccessDenied('Distribuição de professores');return;}
    const list=(state.teacherAssignments||[]).filter(a=>a.schoolId===sid());
    const canEdit=can('professores','edit');
    content.innerHTML=`${pageHeader('Distribuição de professores','Atribua professor, disciplina e turma. O professor passa a ver a turma no portal e a lançar diário, frequência e notas.',canEdit?'<button class="btn-primary" id="newAsg"><i class="fa-solid fa-plus"></i> Nova atribuição</button>':'')}<div class="table-card"><div class="table-wrap"><table><thead><tr><th>Professor</th><th>Disciplina</th><th>Turma</th><th>Turno</th><th>Aulas semanais</th><th>Ação</th></tr></thead><tbody>${list.length?list.map(a=>{const c=classById(a.classId);return `<tr><td><strong>${escapeHtml(teacherById(a.teacherId)?.name||'—')}</strong></td><td>${escapeHtml(a.subject)}</td><td>${escapeHtml(classLabel(c))}</td><td>${escapeHtml(c?.shift||'—')}</td><td>${a.weeklyClasses}</td><td>${canEdit?`<button type="button" class="small-button asg-del" data-id="${a.id}" aria-label="Remover atribuição"><i class="fa-solid fa-trash"></i></button>`:'—'}</td></tr>`;}).join(''):'<tr><td colspan="6"><div class="empty-state">Nenhuma atribuição cadastrada.</div></td></tr>'}</tbody></table></div></div>`;
    document.getElementById('newAsg')?.addEventListener('click',openAssignmentEditor);
    document.querySelectorAll('.asg-del').forEach(b=>b.onclick=()=>{const a=state.teacherAssignments.find(x=>x.id===b.dataset.id);if(!a)return;confirmAction('Remover atribuição',`Remover ${escapeHtml(a.subject)} de ${escapeHtml(teacherById(a.teacherId)?.name||'')} na turma ${escapeHtml(classLabel(classById(a.classId)))}? Diários e notas já lançados são preservados, mas o professor deixa de vê-los em seu portal.`,()=>{state.teacherAssignments=state.teacherAssignments.filter(x=>x.id!==a.id);logAudit('Distribuição','Remoção',`${a.subject} — ${teacherById(a.teacherId)?.name}`);save();renderAssignments();showToast('Atribuição removida.');},'Remover');});
  }
  function openAssignmentEditor(){
    if(!can('professores','edit')){denyToast('edit');return;}
    const school=schoolForCurrent();
    const teachers=state.teachers.filter(t=>t.schoolId===school.id&&(t.status||'Ativo')==='Ativo');
    const classes=state.classes.filter(c=>c.schoolId===school.id);
    if(!teachers.length||!classes.length){showToast('Cadastre professores e turmas antes de distribuir.');return;}
    const subjOpts=cid=>optionsHtml((classById(cid)?.subjects||[]).map(s=>s.name),'');
    openModal('Nova atribuição',`<form id="asgForm" class="form-card" style="border:none;padding:0;max-width:none" novalidate><div class="form-grid"><div class="full"><label for="a_teacher">Professor *</label><select id="a_teacher">${optionsHtml(teachers.map(t=>({value:t.id,label:t.name})),'')}</select></div><div class="full"><label for="a_class">Turma *</label><select id="a_class">${optionsHtml(classes.map(c=>({value:c.id,label:classLabel(c)+' · '+c.shift})),'')}</select></div><div><label for="a_subject">Disciplina *</label><select id="a_subject">${subjOpts(classes[0].id)}</select></div><div><label for="a_hours">Aulas semanais *</label><input id="a_hours" type="number" min="1" max="10" value="2"></div></div><div class="form-actions"><button type="button" class="btn-secondary" id="aCancel">Cancelar</button> <button class="btn-primary">Atribuir</button></div></form>`);
    document.getElementById('aCancel').onclick=closeModal;
    document.getElementById('a_class').onchange=e=>{document.getElementById('a_subject').innerHTML=subjOpts(e.target.value);};
    document.getElementById('asgForm').onsubmit=e=>{
      e.preventDefault();
      const tid=document.getElementById('a_teacher').value,cid=document.getElementById('a_class').value,subject=document.getElementById('a_subject').value,hours=Number(document.getElementById('a_hours').value);
      if(!subject) return formError('Selecione a disciplina.');
      if(!hours||hours<1) return formError('Informe as aulas semanais.');
      if(state.teacherAssignments.some(a=>a.classId===cid&&a.subject===subject)) return formError(`A disciplina ${subject} já tem professor nesta turma (${teacherById(state.teacherAssignments.find(a=>a.classId===cid&&a.subject===subject).teacherId)?.name}).`);
      const c=classById(cid);
      const sameShiftLoad=state.teacherAssignments.filter(a=>a.teacherId===tid&&classById(a.classId)?.shift===c.shift).reduce((x,y)=>x+y.weeklyClasses,0);
      const maxSlots=timeSlots.length*weekdays.length;
      if(sameShiftLoad+hours>maxSlots) return formError(`Conflito de horário: o professor ficaria com ${sameShiftLoad+hours} aulas no turno ${c.shift}, acima dos ${maxSlots} horários disponíveis na semana.`);
      const total=state.teacherAssignments.filter(a=>a.teacherId===tid).reduce((x,y)=>x+y.weeklyClasses,0)+hours;
      const contract=teacherById(tid)?.contractHours;
      if(contract&&total>contract) return formError(`Carga excede a contratada: ${total} aulas/sem para ${contract}h contratadas.`);
      state.teacherAssignments.push({id:crypto.randomUUID(),schoolId:school.id,teacherId:tid,classId:cid,subject,weeklyClasses:hours,weights:{av1:1,av2:1,trabalho:1}});
      logAudit('Distribuição','Atribuição',`${teacherById(tid)?.name} — ${subject} — ${classLabel(c)}`);
      save();closeModal();renderAssignments();showToast('Atribuição criada. O professor já enxerga a turma no portal.');
    };
  }

  // ----- Diário de classe -----
  function renderDiaryBook(){
    if(!can('diario','view')){renderAccessDenied('Diário de classe');return;}
    const asg=assignmentsForCurrentUser();
    const canEdit=can('diario','create');
    const head=pageHeader('Diário de classe','Registre o conteúdo ministrado e a chamada de cada aula.');
    if(!asg.length){content.innerHTML=`${head}<div class="empty-state">Nenhuma turma/disciplina atribuída${state.role==='professor'?' a você':''}. A Secretaria pode atribuir em Pessoas → Distribuição de professores.</div>`;return;}
    if(!asg.find(a=>a.id===window.__dbAsg)) window.__dbAsg=asg[0].id;
    if(!window.__dbDate) window.__dbDate=todayIso();
    const a=asg.find(x=>x.id===window.__dbAsg);
    const studs=studentsOfClass(a.classId);
    const existing=(state.lessonRecords||[]).find(r=>r.classId===a.classId&&r.subject===a.subject&&r.date===window.__dbDate)||null;
    const statusOf=sId=>existing?.attendance?.find(x=>x.studentId===sId)?.status||'Presente';
    const recs=(state.lessonRecords||[]).filter(r=>r.classId===a.classId&&r.subject===a.subject).sort((x,y)=>y.date.localeCompare(x.date));
    const pct=r=>{const n=(r.attendance||[]).length;const p=(r.attendance||[]).filter(x=>x.status==='Presente'||x.status==='Falta Justificada').length;return n?Math.round(p/n*100):0;};
    content.innerHTML=`${head}<div class="filter-bar"><label for="dbAsg"><strong>Turma / disciplina</strong></label><select id="dbAsg">${asg.map(x=>`<option value="${x.id}" ${x.id===a.id?'selected':''}>${escapeHtml(assignmentLabel(x))}</option>`).join('')}</select><label for="dbDate"><strong>Data</strong></label><input id="dbDate" type="date" value="${window.__dbDate}"></div>
    ${canEdit?`<form id="diaryForm" class="card" novalidate><div class="card-title"><div><h3>${existing?'Aula registrada — editar':'Nova aula'} · ${formatDate(window.__dbDate)}</h3><span>${studs.length} alunos na turma</span></div></div>
      <div class="form-grid"><div class="full"><label for="d_title">Conteúdo ministrado (título) *</label><input id="d_title" value="${escapeHtml(existing?.title||'')}" required></div><div class="full"><label for="d_desc">Descrição</label><textarea id="d_desc" rows="2">${escapeHtml(existing?.description||'')}</textarea></div><div><label for="d_meth">Metodologia</label><input id="d_meth" value="${escapeHtml(existing?.methodology||'')}"></div><div><label for="d_notes">Observações</label><input id="d_notes" value="${escapeHtml(existing?.notes||'')}"></div></div>
      <h4>Chamada</h4><div class="table-wrap"><table><thead><tr><th>Aluno</th><th>Presente</th><th>Falta</th><th>Falta justificada</th></tr></thead><tbody>${studs.length?studs.map(s=>{const st=statusOf(s.id);return `<tr><td>${escapeHtml(s.socialName||s.name)}</td>${['Presente','Falta','Falta Justificada'].map(o=>`<td style="text-align:center"><input type="radio" name="att_${s.id}" value="${o}" ${st===o?'checked':''} aria-label="${o} — ${escapeHtml(s.name)}"></td>`).join('')}</tr>`;}).join(''):'<tr><td colspan="4"><div class="empty-state">Nenhum aluno ativo nesta turma.</div></td></tr>'}</tbody></table></div>
      <div class="form-actions"><button class="btn-primary" ${studs.length?'':'disabled'}>${existing?'Atualizar aula':'Salvar aula'}</button></div></form>`:'<div class="alert alert-info">Seu perfil pode consultar os registros, mas não lançar aulas.</div>'}
    <div class="card"><div class="card-title"><div><h3>Aulas registradas</h3><span>${recs.length} aula(s) · presença média ${recs.length?Math.round(recs.reduce((x,r)=>x+pct(r),0)/recs.length):0}%</span></div></div><div class="table-wrap"><table><thead><tr><th>Data</th><th>Conteúdo</th><th>Presença</th><th>Ação</th></tr></thead><tbody>${recs.length?recs.slice(0,15).map(r=>`<tr><td>${formatDate(r.date)}</td><td>${escapeHtml(r.title)}</td><td>${pct(r)}%</td><td><button type="button" class="small-button dr-view" data-id="${r.id}" aria-label="Ver aula de ${formatDate(r.date)}"><i class="fa-solid fa-eye"></i></button>${canEdit?` <button type="button" class="small-button dr-edit" data-date="${r.date}" aria-label="Editar aula"><i class="fa-solid fa-pen"></i></button>`:''}</td></tr>`).join(''):'<tr><td colspan="4"><div class="empty-state">Nenhuma aula registrada para esta turma/disciplina.</div></td></tr>'}</tbody></table></div></div>`;
    document.getElementById('dbAsg').onchange=e=>{window.__dbAsg=e.target.value;renderDiaryBook();};
    document.getElementById('dbDate').onchange=e=>{window.__dbDate=e.target.value||todayIso();renderDiaryBook();};
    document.querySelectorAll('.dr-edit').forEach(b=>b.onclick=()=>{window.__dbDate=b.dataset.date;renderDiaryBook();});
    document.querySelectorAll('.dr-view').forEach(b=>b.onclick=()=>{
      const r=state.lessonRecords.find(x=>x.id===b.dataset.id);if(!r)return;
      openModal(`Aula de ${formatDate(r.date)} — ${r.subject}`,`<p><strong>Conteúdo:</strong> ${escapeHtml(r.title)}</p><p>${escapeHtml(r.description||'')}</p><p><strong>Metodologia:</strong> ${escapeHtml(r.methodology||'—')}</p><p><strong>Observações:</strong> ${escapeHtml(r.notes||'—')}</p><div class="table-wrap"><table><thead><tr><th>Aluno</th><th>Frequência</th></tr></thead><tbody>${(r.attendance||[]).map(x=>`<tr><td>${escapeHtml(studentById(x.studentId)?.name||'—')}</td><td>${badge(x.status,{Presente:'badge-green',Falta:'badge-red','Falta Justificada':'badge-yellow'})}</td></tr>`).join('')}</tbody></table></div><div class="form-actions"><button type="button" class="btn-secondary" id="drClose">Fechar</button></div>`);
      document.getElementById('drClose').onclick=closeModal;
    });
    document.getElementById('diaryForm')?.addEventListener('submit',ev=>{
      ev.preventDefault();
      const title=document.getElementById('d_title').value.trim();
      if(!title){showToast('Informe o conteúdo ministrado.');document.getElementById('d_title').focus();return;}
      if(window.__dbDate>todayIso()){showToast('Não é possível registrar aula em data futura.');return;}
      const attendance=studs.map(s=>({studentId:s.id,status:document.querySelector(`input[name="att_${s.id}"]:checked`)?.value||'Presente'}));
      const rec=existing||{id:crypto.randomUUID(),schoolId:sid(),classId:a.classId,subject:a.subject,date:window.__dbDate,teacherId:a.teacherId};
      const previous=existing?JSON.parse(JSON.stringify(existing.attendance||[])):[];
      Object.assign(rec,{title,description:document.getElementById('d_desc').value.trim(),methodology:document.getElementById('d_meth').value.trim(),notes:document.getElementById('d_notes').value.trim(),attendance});
      if(!existing) state.lessonRecords.push(rec);
      attendance.forEach(x=>{const before=previous.find(p=>p.studentId===x.studentId)?.status;if(x.status==='Falta'&&before!=='Falta'){const s=studentById(x.studentId);notify('frequencia',`${s?.name} faltou à aula de ${a.subject} em ${formatDate(rec.date)}.`,{studentId:x.studentId});}});
      logAudit('Diário',existing?'Alteração de frequência':'Lançamento de frequência',`${classLabel(classById(a.classId))} · ${a.subject} · ${formatDate(rec.date)} — ${attendance.filter(x=>x.status==='Presente').length} presentes, ${attendance.filter(x=>x.status!=='Presente').length} ausências`);
      save();renderDiaryBook();showToast('Aula salva. Frequência já atualizada nos portais, boletim e relatórios.');
    });
  }

  // ----- Frequência -----
  function renderAttendance(){
    if(!can('frequencia','view')){renderAccessDenied('Frequência');return;}
    const kid=selectedChild();
    if(state.role==='aluno'||state.role==='responsavel'){
      if(!kid){content.innerHTML=`${pageHeader('Frequência','')}<div class="empty-state">Nenhum aluno vinculado a esta conta.</div>`;return;}
      const c=classById(kid.classId);
      const subjects=(c?.subjects||[]).map(s=>s.name);
      const total=attendanceStats(kid.id,kid.classId,null);
      content.innerHTML=`${pageHeader('Frequência',`Acompanhamento de presença de ${escapeHtml(kid.name)}.`)}${childSwitcherHtml()}${total.pct!==null&&total.pct<MIN_ATTENDANCE?`<div class="alert alert-danger" role="alert"><i class="fa-solid fa-triangle-exclamation"></i> <div><strong>Frequência abaixo do esperado:</strong> ${escapeHtml(kid.name)} está com ${String(total.pct).replace('.',',')}% (mínimo de ${MIN_ATTENDANCE}%).</div></div>`:''}<div class="stat-grid">${statCard('Frequência geral',total.pct===null?'—':String(total.pct).replace('.',',')+'%','fa-clipboard-check')}${statCard('Aulas registradas',total.total,'fa-chalkboard')}${statCard('Faltas',total.fal,'fa-user-xmark')}${statCard('Faltas justificadas',total.just,'fa-file-medical')}</div><div class="table-card"><div class="table-wrap"><table><thead><tr><th>Disciplina</th><th>Aulas</th><th>Presenças</th><th>Faltas</th><th>Justificadas</th><th>Frequência</th></tr></thead><tbody>${subjects.map(sn=>{const st=attendanceStats(kid.id,kid.classId,sn);const bad=st.pct!==null&&st.pct<MIN_ATTENDANCE;return `<tr><td>${escapeHtml(sn)}</td><td>${st.total}</td><td>${st.pres}</td><td>${st.fal}</td><td>${st.just}</td><td>${st.pct===null?'—':`<span class="badge ${bad?'badge-red':'badge-green'}">${String(st.pct).replace('.',',')}%${bad?' — abaixo do limite':''}</span>`}</td></tr>`;}).join('')}</tbody></table></div></div>`;
      bindChildSwitcher(renderAttendance);
      return;
    }
    const asg=assignmentsForCurrentUser();
    const classes=state.role==='professor'?[...new Set(asg.map(a=>a.classId))].map(classById).filter(Boolean):(state.classes||[]).filter(c=>c.schoolId===sid());
    if(!classes.length){content.innerHTML=`${pageHeader('Frequência','')}<div class="empty-state">Nenhuma turma disponível.</div>`;return;}
    window.__af=window.__af||{classId:'',subject:'',onlyLow:false,q:''};
    if(!classes.find(c=>c.id===window.__af.classId)) window.__af.classId=classes[0].id;
    const f=window.__af;
    const subjectsAll=state.role==='professor'?asg.filter(a=>a.classId===f.classId).map(a=>a.subject):(classById(f.classId)?.subjects||[]).map(s=>s.name);
    if(f.subject&&!subjectsAll.includes(f.subject)) f.subject='';
    content.innerHTML=`${pageHeader('Frequência','Percentual de presença por aluno, calculado a partir das chamadas registradas no diário.',`<button type="button" class="btn-secondary" id="atPrint"><i class="fa-solid fa-print"></i> Imprimir relatório</button>${can('frequencia','export')?' <button type="button" class="btn-secondary" id="atCsv"><i class="fa-solid fa-file-csv"></i> Exportar CSV</button>':''}`)}
    <div class="filter-bar"><label for="atClass" class="sr-only">Turma</label><select id="atClass">${classes.map(c=>`<option value="${c.id}" ${c.id===f.classId?'selected':''}>${escapeHtml(classLabel(c))}</option>`).join('')}</select><label for="atSubj" class="sr-only">Disciplina</label><select id="atSubj"><option value="">Todas as disciplinas</option>${subjectsAll.map(s=>`<option ${s===f.subject?'selected':''}>${escapeHtml(s)}</option>`).join('')}</select><label for="atQ" class="sr-only">Aluno</label><input id="atQ" type="search" placeholder="Filtrar aluno" value="${escapeHtml(f.q)}"><label><input type="checkbox" id="atLow" ${f.onlyLow?'checked':''}> Somente abaixo do limite</label><button type="button" class="btn-secondary" id="atClear">Limpar filtros</button></div>
    <div id="atTable" class="table-card printable-area"></div>`;
    const rows=()=>{
      let list=studentsOfClass(f.classId).map(s=>({s,st:attendanceStats(s.id,f.classId,f.subject||null)}));
      if(f.q.trim()) list=list.filter(x=>x.s.name.toLowerCase().includes(f.q.trim().toLowerCase()));
      if(f.onlyLow) list=list.filter(x=>x.st.pct!==null&&x.st.pct<MIN_ATTENDANCE);
      return list;
    };
    const draw=()=>{
      const list=rows();
      const low=list.filter(x=>x.st.pct!==null&&x.st.pct<MIN_ATTENDANCE).length;
      document.getElementById('atTable').innerHTML=`${low?`<div class="alert alert-danger" role="alert"><i class="fa-solid fa-triangle-exclamation"></i> <div><strong>Frequência abaixo do limite:</strong> ${low} aluno(s) em acompanhamento (mínimo ${MIN_ATTENDANCE}%).</div></div>`:''}<div class="table-wrap"><table><thead><tr><th>Aluno</th><th>Aulas</th><th>Presenças</th><th>Faltas</th><th>Justificadas</th><th>Frequência</th><th>Situação</th></tr></thead><tbody>${list.length?list.map(x=>{const bad=x.st.pct!==null&&x.st.pct<MIN_ATTENDANCE;return `<tr><td>${escapeHtml(x.s.name)}</td><td>${x.st.total}</td><td>${x.st.pres}</td><td>${x.st.fal}</td><td>${x.st.just}</td><td>${x.st.pct===null?'—':String(x.st.pct).replace('.',',')+'%'}</td><td>${x.st.pct===null?badge('Sem registros',{}):bad?badge('Em acompanhamento',{'Em acompanhamento':'badge-red'}):badge('Regular',{Regular:'badge-green'})}</td></tr>`;}).join(''):'<tr><td colspan="7"><div class="empty-state">Nenhum aluno encontrado para os filtros.</div></td></tr>'}</tbody></table></div>`;
    };
    document.getElementById('atClass').onchange=e=>{f.classId=e.target.value;f.subject='';renderAttendance();};
    document.getElementById('atSubj').onchange=e=>{f.subject=e.target.value;draw();};
    document.getElementById('atQ').oninput=e=>{f.q=e.target.value;draw();};
    document.getElementById('atLow').onchange=e=>{f.onlyLow=e.target.checked;draw();};
    document.getElementById('atClear').onclick=()=>{window.__af={classId:f.classId,subject:'',onlyLow:false,q:''};renderAttendance();};
    document.getElementById('atPrint').onclick=()=>printArea();
    document.getElementById('atCsv')?.addEventListener('click',()=>exportCsv(`frequencia_${classById(f.classId)?.name||'turma'}.csv`,[['Aluno','Aulas','Presenças','Faltas','Justificadas','Frequência %'],...rows().map(x=>[x.s.name,x.st.total,x.st.pres,x.st.fal,x.st.just,x.st.pct??''])]));
    draw();
  }
  function printArea(){document.body.classList.add('print-area');window.print();setTimeout(()=>document.body.classList.remove('print-area'),500);}

  // ----- Notas (diário de notas) -----
  function renderGradebook(){
    if(!can('notas','view')){renderAccessDenied('Notas');return;}
    const asg=assignmentsForCurrentUser();
    const canEdit=can('notas','edit');
    const head=pageHeader('Notas','Lançamento de avaliações por turma, disciplina e período. A média é calculada automaticamente.');
    if(!asg.length){content.innerHTML=`${head}<div class="empty-state">Nenhuma turma/disciplina atribuída${state.role==='professor'?' a você':''}. A Secretaria pode atribuir em Pessoas → Distribuição de professores.</div>`;return;}
    if(!asg.find(a=>a.id===window.__gbAsg)) window.__gbAsg=asg[0].id;
    if(!PERIODS.includes(window.__gbPeriod)) window.__gbPeriod=PERIODS[0];
    const a=asg.find(x=>x.id===window.__gbAsg),period=window.__gbPeriod;
    a.weights=a.weights||{av1:1,av2:1,trabalho:1};
    const studs=studentsOfClass(a.classId);
    const FIELDS=[['av1','Avaliação 1'],['av2','Avaliação 2'],['trabalho','Trabalho'],['recuperacao','Recuperação']];
    const inputs=(s,g)=>FIELDS.map(([f,l])=>`<td><input type="number" class="gb-in" min="0" max="10" step="0.1" data-s="${s.id}" data-f="${f}" value="${g[f]??''}" ${canEdit?'':'disabled'} aria-label="${l} de ${escapeHtml(s.name)}"></td>`).join('');
    content.innerHTML=`${head}<div class="filter-bar"><label for="gbAsg"><strong>Turma / disciplina</strong></label><select id="gbAsg">${asg.map(x=>`<option value="${x.id}" ${x.id===a.id?'selected':''}>${escapeHtml(assignmentLabel(x))}</option>`).join('')}</select><label for="gbPer"><strong>Período</strong></label><select id="gbPer">${PERIODS.map(p=>`<option ${p===period?'selected':''}>${p}</option>`).join('')}</select></div>
    <div class="card"><div class="card-title"><div><h3>Pesos das avaliações</h3><span>Média ponderada de Avaliação 1, Avaliação 2 e Trabalho. Com recuperação, a nova média é (média + recuperação) ÷ 2 quando maior. Aprovado ≥ ${PASS_GRADE}; recuperação entre ${RECOVERY_MIN} e ${PASS_GRADE-0.1}; reprovado abaixo de ${RECOVERY_MIN}.</span></div></div><div class="filter-bar">${[['av1','Peso Av. 1'],['av2','Peso Av. 2'],['trabalho','Peso Trabalho']].map(([k,l])=>`<label for="w_${k}">${l}</label><input id="w_${k}" class="w-in" data-k="${k}" type="number" min="0" max="10" step="0.5" value="${a.weights[k]}" style="width:80px" ${canEdit?'':'disabled'}>`).join('')}</div></div>
    <div class="table-card"><div class="table-wrap"><table><thead><tr><th>Aluno</th>${FIELDS.map(([,l])=>`<th>${l}</th>`).join('')}<th>Média</th><th>Situação</th></tr></thead><tbody>${studs.length?studs.map(s=>{const g=findGrade(a.classId,a.subject,period,s.id)||{};const m=gradeMedia(g,a.weights);const sit=gradeSituation(g,m);return `<tr data-row="${s.id}"><td>${escapeHtml(s.name)}</td>${inputs(s,g)}<td class="gb-media">${fmtNum(m)}</td><td class="gb-sit">${badge(sit,SITUATION_BADGE)}</td></tr>`;}).join(''):'<tr><td colspan="7"><div class="empty-state">Nenhum aluno ativo nesta turma.</div></td></tr>'}</tbody></table></div></div>
    ${canEdit&&studs.length?'<div class="form-actions"><button type="button" class="btn-primary" id="gbSave"><i class="fa-solid fa-floppy-disk"></i> Salvar notas</button></div>':''}`;
    document.getElementById('gbAsg').onchange=e=>{window.__gbAsg=e.target.value;renderGradebook();};
    document.getElementById('gbPer').onchange=e=>{window.__gbPeriod=e.target.value;renderGradebook();};
    document.querySelectorAll('.w-in').forEach(i=>i.onchange=()=>{const v=Number(i.value);if(isNaN(v)||v<0||v>10){showToast('Peso inválido (0 a 10).');i.value=a.weights[i.dataset.k];return;}a.weights[i.dataset.k]=v;logAudit('Notas','Alteração de pesos',`${assignmentLabel(a)} — ${i.dataset.k}=${v}`);save();renderGradebook();});
    const collect=s=>{const o={};FIELDS.forEach(([f])=>{const el=document.querySelector(`.gb-in[data-s="${s}"][data-f="${f}"]`);o[f]=el.value===''?null:Number(el.value);});return o;};
    const refreshRow=sId=>{const row=document.querySelector(`tr[data-row="${sId}"]`);const g=collect(sId);const m=gradeMedia(g,a.weights);row.querySelector('.gb-media').textContent=fmtNum(m);row.querySelector('.gb-sit').innerHTML=badge(gradeSituation(g,m),SITUATION_BADGE);};
    document.querySelectorAll('.gb-in').forEach(i=>i.oninput=()=>{const v=i.value;const bad=v!==''&&(isNaN(Number(v))||Number(v)<0||Number(v)>10);i.classList.toggle('invalid',bad);i.setAttribute('aria-invalid',bad?'true':'false');if(!bad)refreshRow(i.dataset.s);});
    document.getElementById('gbSave')?.addEventListener('click',()=>{
      if(document.querySelector('.gb-in.invalid')){showToast('Existem notas inválidas. Use valores entre 0 e 10.');return;}
      const changes=[];
      studs.forEach(s=>{const now=collect(s.id);const old=findGrade(a.classId,a.subject,period,s.id)||{};FIELDS.forEach(([f,l])=>{const from=old[f]??null;if(from!==now[f])changes.push({s,f,l,from,to:now[f]});});});
      if(!changes.length){showToast('Nenhuma alteração para salvar.');return;}
      const apply=()=>{
        const stamp=new Date().toISOString();
        studs.forEach(s=>{
          const now=collect(s.id);let g=findGrade(a.classId,a.subject,period,s.id);
          const diff=changes.filter(c=>c.s.id===s.id);if(!diff.length)return;
          if(!g){g={id:crypto.randomUUID(),schoolId:sid(),classId:a.classId,subject:a.subject,period,studentId:s.id,av1:null,av2:null,trabalho:null,recuperacao:null,history:[]};state.grades.push(g);}
          g.history=g.history||[];
          diff.forEach(c=>g.history.push({date:stamp,by:state.user,field:c.f,from:c.from,to:c.to}));
          Object.assign(g,now);
          notify('nota',`Nova nota lançada em ${a.subject} (${period}) para ${s.name}.`,{studentId:s.id});
        });
        changes.slice(0,25).forEach(c=>logAudit('Notas',c.from!==null?'Alteração de nota':'Lançamento de nota',`${c.s.name} — ${a.subject} (${period}) — ${c.l}: ${fmtNum(c.from)} → ${fmtNum(c.to)}`));
        save();renderGradebook();showToast(`${changes.length} nota(s) salva(s). Boletim e portais atualizados.`);
      };
      const overwrites=changes.filter(c=>c.from!==null);
      if(overwrites.length) confirmAction('Confirmar alteração de notas',`Você está alterando ${overwrites.length} nota(s) já lançada(s). O histórico da alteração será registrado na auditoria. Deseja continuar?`,apply,'Alterar notas'); else apply();
    });
  }

  // ----- Boletim -----
  function reportCardStudent(){
    const kid=selectedChild();if(kid) return kid;
    if(state.role==='aluno'||state.role==='responsavel') return null;
    const list=visibleStudents().filter(activeStudent).sort((a,b)=>a.name.localeCompare(b.name));
    if(window.__rcStudent&&list.find(s=>s.id===window.__rcStudent)) return studentById(window.__rcStudent);
    window.__rcStudent=list[0]?.id;return studentById(window.__rcStudent)||null;
  }
  function renderReportCard(){
    if(!can('boletim','view')){renderAccessDenied('Boletim');return;}
    const staff=state.role!=='aluno'&&state.role!=='responsavel';
    const s=reportCardStudent();
    const school=schoolForCurrent();
    let picker='';
    if(staff){
      const list=visibleStudents().filter(activeStudent).sort((a,b)=>a.name.localeCompare(b.name));
      picker=`<div class="filter-bar"><label for="rcStudent"><strong>Aluno</strong></label><select id="rcStudent">${list.map(x=>`<option value="${x.id}" ${s&&x.id===s.id?'selected':''}>${escapeHtml(x.name)} — ${escapeHtml(classLabel(classById(x.classId)))}</option>`).join('')}</select></div>`;
    } else picker=childSwitcherHtml();
    const head=pageHeader('Boletim escolar','Notas por período, frequência e resultado por disciplina.','<button type="button" class="btn-secondary" id="rcPrint"><i class="fa-solid fa-print"></i> Imprimir boletim</button>');
    if(!s){content.innerHTML=`${head}${picker}<div class="empty-state">Nenhum aluno disponível para exibir o boletim.</div>`;return;}
    const c=classById(s.classId);
    const subjects=(c?.subjects||[]).map(x=>x.name);
    let anyReprov=false,anyRec=false,allDone=subjects.length>0;
    const rows=subjects.map(sn=>{
      const ms=PERIODS.map(p=>periodMedia(s.id,c.id,sn,p));
      const fm=finalMedia(s.id,c.id,sn);
      const filled=ms.filter(m=>m!==null).length;
      const att=attendanceStats(s.id,c.id,sn);
      let sit='Em andamento';
      if(filled===4){const last=findGrade(c.id,sn,PERIODS[3],s.id);sit=gradeSituation(last,fm);} else allDone=false;
      if(sit==='Reprovado')anyReprov=true;if(sit==='Recuperação')anyRec=true;
      if(filled<4&&fm!==null&&fm<RECOVERY_MIN)sit='Recuperação';
      return `<tr><td>${escapeHtml(sn)}</td>${ms.map(m=>`<td>${fmtNum(m)}</td>`).join('')}<td><strong>${fmtNum(fm)}</strong></td><td>${att.pct===null?'—':String(att.pct).replace('.',',')+'%'}</td><td>${badge(sit,SITUATION_BADGE)}</td></tr>`;
    });
    const o=studentOverall(s);
    const result=!allDone?'Em andamento':anyReprov?'Reprovado':anyRec?'Recuperação':'Aprovado';
    const code='SIGED-'+(school?.inep||'0000')+'-'+String(s.registration||'').replace(/\D/g,'')+'-'+new Date().getFullYear();
    content.innerHTML=`${head}${picker}${o.att.pct!==null&&o.att.pct<MIN_ATTENDANCE?`<div class="alert alert-danger" role="alert"><i class="fa-solid fa-triangle-exclamation"></i> <div><strong>Atenção:</strong> frequência geral de ${String(o.att.pct).replace('.',',')}%, abaixo do mínimo de ${MIN_ATTENDANCE}%.</div></div>`:''}
    <div class="report-card-doc" id="reportCardDoc"><div class="rc-head"><div><h2>${escapeHtml(school?.name||'Escola')}</h2><p>${escapeHtml(school?.address||'')} — ${escapeHtml(school?.city||'')}/${escapeHtml(school?.state||'')}${school?.inep?' · INEP '+escapeHtml(school.inep):''}</p></div><div class="rc-title"><strong>BOLETIM ESCOLAR</strong><span>Ano letivo ${c?.year||new Date().getFullYear()}</span></div></div>
    <div class="rc-student"><div><span>Aluno</span><strong>${escapeHtml(s.name)}</strong></div><div><span>Matrícula</span><strong>${escapeHtml(s.registration||'—')}</strong></div><div><span>Turma</span><strong>${escapeHtml(classLabel(c))}</strong></div><div><span>Turno</span><strong>${escapeHtml(c?.shift||'—')}</strong></div></div>
    <div class="table-wrap"><table class="rc-table"><thead><tr><th>Disciplina</th>${PERIODS.map(p=>`<th>${p}</th>`).join('')}<th>Média final</th><th>Frequência</th><th>Situação</th></tr></thead><tbody>${rows.length?rows.join(''):'<tr><td colspan="8"><div class="empty-state">Aluno sem turma/matriz curricular.</div></td></tr>'}</tbody></table></div>
    <div class="rc-foot"><div><span>Média geral</span><strong>${fmtNum(o.media)}</strong></div><div><span>Frequência geral</span><strong>${o.att.pct===null?'—':String(o.att.pct).replace('.',',')+'%'}</strong></div><div><span>Resultado</span><strong>${result}</strong></div></div>
    <p class="rc-code">Código de validação: <strong>${code}</strong> · Emitido em ${new Date().toLocaleDateString('pt-BR')} · Documento gerado pelo SIGED (simulação de QR Code: <span class="fake-qr" aria-hidden="true">▚▞▚▞</span>)</p></div>`;
    document.getElementById('rcStudent')?.addEventListener('change',e=>{window.__rcStudent=e.target.value;renderReportCard();});
    bindChildSwitcher(renderReportCard);
    document.getElementById('rcPrint').onclick=()=>{logAudit('Boletim','Emissão',`Boletim de ${s.name}`);document.body.classList.add('print-report');window.print();setTimeout(()=>document.body.classList.remove('print-report'),500);};
  }


  // ----- Acompanhamento pedagógico: Central Inteligente de Acompanhamento do Aluno -----
  // Toda a análise é calculada a partir dos dados já existentes (notas, frequência/diário, ocorrências).
  // Persistência própria em state.followUps (casos de acompanhamento) — nenhum outro módulo é alterado.
  const CI_LEVELS=[
    {key:'normal',label:'Normal',emoji:'🟢',cls:'ci-l0',min:0},
    {key:'atencao',label:'Atenção',emoji:'🟡',cls:'ci-l1',min:25},
    {key:'intensivo',label:'Acompanhamento intensivo',emoji:'🟠',cls:'ci-l2',min:50},
    {key:'imediata',label:'Atenção imediata',emoji:'🔴',cls:'ci-l3',min:70}
  ];
  // Pesos do índice de atenção (somam 100). Cada componente vale 0–100 e entra proporcionalmente ao peso.
  const CI_COMPONENTS=[
    {key:'freq',label:'Frequência',icon:'fa-calendar-check',weight:30,rule:'0% com frequência ≥ 85%; cresce até 100% quando a frequência chega a 55% ou menos.'},
    {key:'desemp',label:'Desempenho',icon:'fa-chart-column',weight:30,rule:'0% com média geral ≥ 7,0; cresce até 100% quando a média chega a 4,0 ou menos.'},
    {key:'evol',label:'Evolução',icon:'fa-arrow-trend-down',weight:15,rule:'Mede a piora recente: queda da média entre os últimos bimestres (100% = queda de 2 pontos) ou queda da frequência recente (100% = queda de 30 p.p.). Melhora não pontua.'},
    {key:'recup',label:'Recuperações',icon:'fa-rotate',weight:15,rule:'Disciplinas com média abaixo de 6,0: 1 = 40%, 2 = 70%, 3 ou mais = 100%.'},
    {key:'ocorr',label:'Ocorrências',icon:'fa-clipboard-list',weight:10,rule:'Ocorrências do aluno ainda não resolvidas: 1 = 40%, 2 = 70%, 3 ou mais = 100%.'}
  ];
  const ciClamp=(v,a=0,b=100)=>Math.max(a,Math.min(b,v));
  const ciPct=n=>n===null||n===undefined?'—':String(n).replace('.',',')+'%';
  const ciDateTime=iso=>{try{return new Date(iso).toLocaleString('pt-BR',{dateStyle:'short',timeStyle:'short'});}catch{return '';}};
  const ciStatusEmoji=score=>score<25?'🟢':score<50?'⚠️':score<75?'🟠':'🔴';
  const ciCases=()=>{state.followUps=state.followUps||[];return state.followUps;};
  const ciNum=n=>{const v=fmtNum(n);return v===fmtNum(PASS_GRADE)&&n!==null&&Number(n)<PASS_GRADE?Number(n).toFixed(2).replace('.',','):v;};
  const ciMean=arr=>arr.length?arr.reduce((a,b)=>a+b,0)/arr.length:null;

  function ciAttendanceSeries(s){
    const recs=(state.lessonRecords||[]).filter(r=>r.schoolId===sid()&&r.classId===s.classId).slice().sort((a,b)=>String(a.date).localeCompare(String(b.date)));
    const entries=[];
    recs.forEach(r=>{const e=(r.attendance||[]).find(x=>x.studentId===s.id);if(e)entries.push({date:r.date,ok:e.status!=='Falta'});});
    const pctOf=arr=>arr.length?Math.round(arr.filter(x=>x.ok).length/arr.length*1000)/10:null;
    let trend=null;
    if(entries.length>=12){
      const k=Math.max(4,Math.floor(entries.length/3));
      const recent=pctOf(entries.slice(-k)),earlier=pctOf(entries.slice(0,entries.length-k));
      trend={recent,earlier,drop:Math.round((earlier-recent)*10)/10};
    }
    const chunks=[];
    if(entries.length>=6){const n=Math.min(6,Math.floor(entries.length/2));for(let i=0;i<n;i++)chunks.push(pctOf(entries.slice(Math.floor(i*entries.length/n),Math.floor((i+1)*entries.length/n))));}
    return {entries,trend,series:chunks};
  }

  // Análise completa de um aluno: indicadores, alertas de mudança, índice de atenção, nível e explicações.
  function ciAnalyze(s){
    const o=studentOverall(s),cls=classById(s.classId);
    const subjects=(cls?.subjects||[]).map(sub=>{
      const per=PERIODS.map(p=>periodMedia(s.id,cls.id,sub.name,p));
      const vals=per.filter(v=>v!==null);
      const last=vals.length?vals[vals.length-1]:null,prev=vals.length>1?vals[vals.length-2]:null;
      const asg=(state.teacherAssignments||[]).find(a=>a.classId===cls.id&&a.subject===sub.name);
      const t=asg?teacherById(asg.teacherId):null;
      return {name:sub.name,per,fin:finalMedia(s.id,cls.id,sub.name),last,prev,delta:(last!==null&&prev!==null)?last-prev:null,teacher:t?.name||''};
    });
    const media=o.media,freq=o.att.pct;
    const belowAvg=subjects.filter(x=>x.fin!==null&&x.fin<PASS_GRADE).sort((a,b)=>a.fin-b.fin);
    const recCount=belowAvg.length;
    const deltas=subjects.filter(x=>x.delta!==null).map(x=>x.delta);
    const avgDelta=ciMean(deltas);
    const att=ciAttendanceSeries(s);
    const occ=(state.occurrences||[]).filter(x=>x.schoolId===sid()&&(x.studentId===s.id||(!x.studentId&&x.studentName===s.name))&&x.status!=='Resolvida');
    // períodos com dados -> média por bimestre (para o gráfico e para a consistência da evolução)
    const periodSeries=PERIODS.map((p,pi)=>{const vs=subjects.map(x=>x.per[pi]).filter(v=>v!==null);return vs.length?{period:p,value:ciMean(vs),n:vs.length}:null;}).filter(Boolean);

    // Alertas de mudança (comparação do aluno com o próprio histórico)
    const alerts=[];
    const dropSubs=subjects.filter(x=>x.delta!==null&&x.delta<=-1&&x.last<7).sort((a,b)=>a.delta-b.delta);
    dropSubs.slice(0,3).forEach(x=>alerts.push({key:'queda:'+x.name,kind:'queda',title:`Queda de desempenho em ${x.name}`,text:`A média em ${x.name} caiu de ${fmtNum(x.prev)} para ${fmtNum(x.last)} entre os dois últimos bimestres lançados.`}));
    if(!dropSubs.length&&avgDelta!==null&&avgDelta<=-0.7&&media!==null&&media<7.5)
      alerts.push({key:'queda:geral',kind:'queda',title:'Queda de desempenho detectada',text:`A média do aluno caiu ${fmtNum(Math.abs(avgDelta))} ponto(s), em média, nas últimas avaliações.`});
    if(att.trend&&att.trend.drop>=15&&att.trend.recent<85)
      alerts.push({key:'faltas',kind:'faltas',title:'Aumento de faltas detectado',text:`A frequência recente está em ${ciPct(att.trend.recent)}, contra ${ciPct(att.trend.earlier)} no período anterior (queda de ${String(att.trend.drop).replace('.',',')} p.p.).`});

    // Componentes do índice (0–100 cada)
    const sc={};
    sc.freq=freq===null?0:ciClamp((85-freq)/30*100);
    sc.desemp=media===null?0:ciClamp((7-media)/3*100);
    const gradeDrop=avgDelta!==null&&avgDelta<0?ciClamp(-avgDelta/2*100):0;
    const attDrop=att.trend&&att.trend.drop>0?ciClamp(att.trend.drop/30*100):0;
    sc.evol=Math.max(gradeDrop,attDrop);
    sc.recup=[0,40,70,100][Math.min(3,recCount)];
    sc.ocorr=[0,40,70,100][Math.min(3,occ.length)];
    const detail={
      freq:freq===null?'Sem registros de frequência':`${ciPct(freq)} (limite ${MIN_ATTENDANCE}%)`,
      desemp:media===null?'Sem notas lançadas':`Média geral ${fmtNum(media)} (mínimo ${fmtNum(PASS_GRADE)})`,
      evol:alerts.length?alerts.map(x=>x.title).join('; '):(avgDelta!==null&&avgDelta>=0.3?'Notas em alta nas últimas avaliações':'Sem piora recente'),
      recup:recCount?`${recCount} disciplina(s) abaixo da média: ${belowAvg.slice(0,3).map(x=>x.name).join(', ')}${recCount>3?'…':''}`:'Nenhuma disciplina abaixo da média',
      ocorr:occ.length?`${occ.length} ocorrência(s) não resolvida(s)`:'Nenhuma ocorrência em aberto'
    };
    const comps=CI_COMPONENTS.map(c=>({...c,score:Math.round(sc[c.key]),points:Math.round(sc[c.key]*c.weight/100*10)/10,detail:detail[c.key],emoji:ciStatusEmoji(sc[c.key])}));
    const index=Math.round(comps.reduce((a,c)=>a+sc[c.key]*c.weight/100,0));

    // Nível: faixas do índice + regras de prioridade
    let levelIdx=CI_LEVELS.reduce((acc,l,i)=>index>=l.min?i:acc,0);
    const floorNotes=[];
    const fLow=freq!==null&&freq<MIN_ATTENDANCE,mLow=media!==null&&media<PASS_GRADE;
    if(fLow&&mLow&&levelIdx<2){levelIdx=2;floorNotes.push('Regra de prioridade: frequência e média abaixo do mínimo ao mesmo tempo elevam o nível para, no mínimo, acompanhamento intensivo.');}
    if(((freq!==null&&freq<60&&mLow)||(media!==null&&media<4&&fLow))&&levelIdx<3){levelIdx=3;floorNotes.push('Regra de prioridade: frequência muito baixa (< 60%) ou média crítica (< 4,0), combinada com o outro indicador abaixo do mínimo, eleva o nível para atenção imediata.');}

    // Motivos (curtos, para chips) e explicação (longa, "por que este nível")
    const short=[],why=[],cats=[];
    if(fLow){short.push('Frequência abaixo do limite');why.push(`Frequência de ${ciPct(freq)}, abaixo do limite de ${MIN_ATTENDANCE}%.`);cats.push('freq');}
    else if(freq!==null&&freq<85){why.push(`Frequência de ${ciPct(freq)}, acima do limite, mas próxima dele.`);}
    if(mLow){short.push('Média geral baixa');why.push(`Média geral ${ciNum(media)}, abaixo de ${fmtNum(PASS_GRADE)}${belowAvg.length?` (mais baixas: ${belowAvg.slice(0,3).map(x=>`${x.name} ${fmtNum(x.fin)}`).join(', ')})`:''}.`);cats.push('desemp');}
    if(recCount>=2){short.push(`${recCount} disciplinas abaixo da média`);cats.push('recup');}
    else if(recCount===1){why.push(`Disciplina abaixo da média: ${belowAvg[0].name} (${fmtNum(belowAvg[0].fin)}).`);}
    if(recCount>=2)why.push(`${recCount} disciplinas com média abaixo de ${fmtNum(PASS_GRADE)}: ${belowAvg.slice(0,4).map(x=>x.name).join(', ')}.`);
    alerts.forEach(x=>{short.push(x.kind==='faltas'?'Aumento de faltas':x.title);why.push(x.text);});
    if(alerts.length)cats.push('mudanca');
    if(occ.length){short.push(`${occ.length} ocorrência(s) em aberto`);why.push(`${occ.length} ocorrência(s) registrada(s) ainda não resolvida(s).`);cats.push('ocorr');}
    floorNotes.forEach(n=>why.push(n));

    const trigger=levelIdx>=1||fLow||mLow||recCount>=2||(alerts.length>0&&((media!==null&&media<6.5)||(freq!==null&&freq<80)));
    return {s,cls,subjects,media,freq,att:o.att,attTrend:att.trend,attSeries:att.series,belowAvg,recCount,avgDelta,alerts,occ,periodSeries,comps,index,levelIdx,level:CI_LEVELS[levelIdx],short,why,cats,trigger};
  }
  const ciSnapshot=a=>({date:new Date().toISOString(),media:a.media,freq:a.freq,recCount:a.recCount,index:a.index,levelIdx:a.levelIdx});

  // Evolução: compara a situação atual com a foto tirada quando o aluno entrou em acompanhamento.
  function ciEvolution(a,base){
    if(!base)return {state:'stable',dMedia:null,dFreq:null,dIndex:0};
    const dMedia=(a.media!==null&&base.media!==null)?a.media-base.media:null;
    const dFreq=(a.freq!==null&&base.freq!==null)?Math.round((a.freq-base.freq)*10)/10:null;
    const dIndex=a.index-base.index;
    const worse=dIndex>=10||(dMedia!==null&&dMedia<=-0.5)||(dFreq!==null&&dFreq<=-5);
    const better=!worse&&((dMedia!==null&&dMedia>=0.5)||(dFreq!==null&&dFreq>=5)||dIndex<=-15)&&(dMedia===null||dMedia>-0.3)&&(dFreq===null||dFreq>-2);
    return {state:worse?'negative':better?'positive':'stable',dMedia,dFreq,dIndex};
  }
  // Sugestão de encerramento: só quando a melhora é consistente (vários indicadores, mais de um bimestre).
  function ciClosure(a,c){
    const ps=a.periodSeries;const lastTwoOk=ps.length>=2&&ps[ps.length-1].value>=PASS_GRADE&&ps[ps.length-2].value>=PASS_GRADE;
    const recentOk=!a.attTrend||a.attTrend.recent>=MIN_ATTENDANCE;
    const improved=!!c.baseline&&a.index<c.baseline.index;
    const checks=[
      {ok:a.media!==null&&a.media>=PASS_GRADE,text:'Média geral igual ou acima de 6,0'},
      {ok:a.freq!==null&&a.freq>=MIN_ATTENDANCE&&recentOk,text:'Frequência geral e recente acima do limite'},
      {ok:a.recCount===0,text:'Nenhuma disciplina abaixo da média'},
      {ok:lastTwoOk,text:'Média dos dois últimos bimestres lançados ≥ 6,0'},
      {ok:a.alerts.length===0&&a.occ.length===0,text:'Sem alertas de queda/faltas nem ocorrências em aberto'},
      {ok:a.levelIdx===0&&improved,text:'Índice de atenção voltou ao nível Normal e melhorou desde a entrada'}
    ];
    return {ok:checks.every(x=>x.ok),checks,sig:`${fmtNum(a.media)}|${a.freq}`};
  }
  function ciSuggestions(s,a){
    const out=[];
    const low=a.freq!==null&&a.freq<MIN_ATTENDANCE,drop=a.alerts.some(x=>x.kind==='faltas');
    const gs=(s.guardians||[]).map(g=>guardianById(g.guardianId)).filter(Boolean);
    const gTxt=gs.length?` Responsável: ${gs.map(g=>g.name+(g.phone?' — '+g.phone:'')).join('; ')}.`:'';
    if(low||drop){
      out.push({key:'contato',icon:'fa-phone',text:'Contatar o responsável',detail:`Frequência ${ciPct(a.freq)}${drop?', com queda recente':''}.${gTxt}`});
      out.push({key:'agenda',icon:'fa-calendar-plus',text:'Agendar acompanhamento com o aluno e a família',detail:'Definir metas e uma data de retorno para reavaliar a frequência.'});
    }
    const subs=[];
    a.belowAvg.slice(0,2).forEach(x=>subs.push(x));
    a.subjects.filter(x=>x.delta!==null&&x.delta<=-1&&x.last<7).slice(0,2).forEach(x=>{if(!subs.find(y=>y.name===x.name))subs.push(x);});
    subs.slice(0,3).forEach(x=>{
      out.push({key:'reforco:'+x.name,icon:'fa-book-open-reader',text:`Encaminhar para reforço em ${escapeHtml(x.name)}`,detail:`Média ${fmtNum(x.fin)}${x.delta!==null&&x.delta<=-1?`, com queda de ${fmtNum(Math.abs(x.delta))} ponto(s) no último bimestre`:''}.`});
      out.push({key:'prof:'+x.name,icon:'fa-chalkboard-user',text:`Conversar com o(a) professor(a) de ${x.name}${x.teacher?' ('+x.teacher+')':''}`,detail:'Entender o que mudou em sala e combinar atividades de recuperação.'});
    });
    if(a.recCount>=1)out.push({key:'recup',icon:'fa-rotate',text:'Organizar plano de recuperação',detail:`Disciplinas: ${a.belowAvg.slice(0,4).map(x=>x.name).join(', ')}.`});
    if(a.occ.length)out.push({key:'ocorr',icon:'fa-clipboard-list',text:'Revisar ocorrência(s) em aberto com a coordenação',detail:`${a.occ.length} ocorrência(s) sem resolução.`});
    if(a.levelIdx>=3)out.push({key:'conselho',icon:'fa-users-rectangle',text:'Levar o caso ao conselho de classe',detail:'Nível de atenção imediata: envolver a equipe pedagógica.'});
    return out;
  }
  function ciPush(c,type,text){c.events=c.events||[];c.events.push({at:new Date().toISOString(),type,text});}

  // Ciclo automático: detecta -> abre acompanhamento -> monitora -> detecta evolução -> sugere encerramento (nunca encerra sozinho).
  function ciSync(){
    const cases=ciCases();let changes=0,dirty=false;
    const studs=(state.students||[]).filter(s=>s.schoolId===sid()&&activeStudent(s)&&s.classId);
    studs.forEach(s=>{
      const a=ciAnalyze(s);
      const mine=cases.filter(x=>x.studentId===s.id&&x.schoolId===sid());
      let c=mine.find(x=>x.status==='Ativo');
      const lastClosed=mine.filter(x=>x.status==='Encerrado').sort((x,y)=>String(y.closedAt||'').localeCompare(String(x.closedAt||'')))[0];
      const now=new Date().toISOString();
      if(!c){
        if(!a.trigger)return;
        if(lastClosed&&a.index<(lastClosed.closedIndex??0)+15)return;
        c={id:crypto.randomUUID(),schoolId:sid(),studentId:s.id,status:'Ativo',openedAt:now,auto:true,ack:false,entryReasons:a.short.slice(),baseline:ciSnapshot(a),levelIdx:a.levelIdx,index:a.index,alertKeys:a.alerts.map(x=>x.key),evoState:'stable',closeSuggestedAt:null,closeDismissedSig:null,suggestions:[],events:[],reentry:!!lastClosed};
        ciPush(c,lastClosed?'reabertura':'entrada',`${lastClosed?'Voltou':'Entrou'} em acompanhamento automaticamente. Motivos: ${a.short.join(' + ')||'indicadores abaixo do esperado'}.`);
        ciPush(c,'nivel',`Nível de atenção inicial: ${a.level.emoji} ${a.level.label} (índice ${a.index}%).`);
        a.alerts.forEach(x=>ciPush(c,'alerta',`${x.title}. ${x.text}`));
        cases.push(c);changes++;dirty=true;
      }else if(c.status==='Ativo'){
        if(a.levelIdx!==c.levelIdx){
          const from=CI_LEVELS[c.levelIdx];
          ciPush(c,'nivel',`Nível de atenção alterado: ${from.emoji} ${from.label} → ${a.level.emoji} ${a.level.label} (índice ${a.index}%).${a.short[0]?' Principal motivo: '+a.short[0]+'.':''}`);
          c.lastLevelChange={at:now,from:c.levelIdx,to:a.levelIdx};c.levelIdx=a.levelIdx;changes++;dirty=true;
        }
        if(c.index!==a.index){c.index=a.index;dirty=true;}
        const known=new Set(c.alertKeys||[]);
        a.alerts.forEach(x=>{if(!known.has(x.key)){ciPush(c,'alerta',`${x.title}. ${x.text}`);changes++;dirty=true;}});
        const keys=a.alerts.map(x=>x.key);
        if(JSON.stringify(keys)!==JSON.stringify(c.alertKeys||[])){c.alertKeys=keys;dirty=true;}
        const ev=ciEvolution(a,c.baseline);
        if(ev.state!==c.evoState){
          if(ev.state==='positive')ciPush(c,'evolucao','🟢 Evolução positiva detectada em relação ao início do acompanhamento.');
          else if(ev.state==='negative')ciPush(c,'evolucao','🔴 Piora detectada em relação ao início do acompanhamento.');
          else ciPush(c,'evolucao','Situação voltou a ficar estável em relação ao início do acompanhamento.');
          c.evoState=ev.state;changes++;dirty=true;
        }
        const cl=ciClosure(a,c);
        if(cl.ok&&!c.closeSuggestedAt){c.closeSuggestedAt=now;ciPush(c,'sugestao_encerramento','🟢 O aluno apresentou evolução consistente. Sistema sugere revisar ou encerrar o acompanhamento (aguardando decisão do usuário).');changes++;dirty=true;}
        else if(!cl.ok&&c.closeSuggestedAt){c.closeSuggestedAt=null;c.closeDismissedSig=null;dirty=true;}
      }
      if(c&&c.status==='Ativo'){
        const gen=ciSuggestions(s,a);c.suggestions=c.suggestions||[];
        const before=JSON.stringify(c.suggestions);
        gen.forEach(g=>{const ex=c.suggestions.find(x=>x.key===g.key);if(!ex)c.suggestions.push({...g,status:'pendente'});else if(ex.status==='pendente'){ex.detail=g.detail;ex.text=g.text;}});
        c.suggestions=c.suggestions.filter(x=>x.status!=='pendente'||gen.some(g=>g.key===x.key));
        if(JSON.stringify(c.suggestions)!==before)dirty=true;
      }
    });
    if(dirty)save();
    return changes;
  }

  // ----- componentes visuais -----
  function ciSpark(vals,{min=0,max=10,color='currentColor',w=130,h=40}={}){
    const n=vals.length;
    const pts=vals.map((v,i)=>v===null?null:[n>1?4+i*(w-8)/(n-1):w/2,h-5-((ciClamp(v,min,max)-min)/(max-min))*(h-10)]).filter(Boolean);
    if(!pts.length)return '<span class="muted">—</span>';
    return `<svg class="ci-spark" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true"><polyline fill="none" stroke="${color}" stroke-width="2" points="${pts.map(p=>p.join(',')).join(' ')}" stroke-linecap="round" stroke-linejoin="round"/>${pts.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="2.6" fill="${color}"/>`).join('')}</svg>`;
  }
  const ciRing=(a,big)=>`<div class="ci-ring ${a.level.cls}${big?' ci-ring-lg':''}" style="--v:${a.index}" role="img" aria-label="Índice de atenção ${a.index}%"><span>${a.index}%</span></div>`;
  const ciLevelBadge=l=>`<span class="ci-level ${l.cls}">${l.emoji} ${l.label}</span>`;
  const ciCompChips=a=>`<div class="ci-comps">${a.comps.map(c=>`<span class="ci-comp" title="${escapeHtml(c.detail)}">${c.label} ${c.emoji}</span>`).join('')}</div>`;
  function ciDelta(d,unit,dec=1){
    if(d===null||d===undefined)return '<span class="muted">—</span>';
    if(Math.abs(d)<(unit==='pp'?0.5:0.05))return '<span class="ci-d-flat">= sem variação</span>';
    const up=d>0;const v=unit==='pp'?String(Math.abs(Math.round(d*10)/10)).replace('.',',')+' p.p.':fmtNum(Math.abs(d));
    return `<span class="${up?'ci-d-up':'ci-d-down'}">${up?'▲':'▼'} ${v}</span>`;
  }
  function ciEvoLine(a,c){
    const ev=ciEvolution(a,c.baseline);
    const label=ev.state==='positive'?'<span class="ci-tag ci-tag-good"><i class="fa-solid fa-arrow-trend-up"></i> 🟢 Evolução positiva detectada</span>':ev.state==='negative'?'<span class="ci-tag ci-tag-bad"><i class="fa-solid fa-arrow-trend-down"></i> 🔴 Piora detectada</span>':'<span class="ci-tag ci-tag-flat">Situação estável</span>';
    return {ev,label};
  }

  function ciRowsForCurrent(){
    const visible=new Set(visibleStudents().filter(activeStudent).map(s=>s.id));
    return ciCases().filter(c=>c.schoolId===sid()&&visible.has(c.studentId)).map(c=>{const s=studentById(c.studentId);return s?{c,s,a:ciAnalyze(s)}:null;}).filter(Boolean);
  }
  function ciRecentLevelUp(c){return !!c.lastLevelChange&&c.lastLevelChange.to>c.lastLevelChange.from&&(Date.now()-new Date(c.lastLevelChange.at).getTime())<14*864e5;}
  function ciGroups(rows){
    const active=rows.filter(r=>r.c.status==='Ativo');
    return {
      imediata:active.filter(r=>r.a.levelIdx===3),
      acomp:active.filter(r=>r.a.levelIdx!==3),
      mudancas:active.filter(r=>r.a.alerts.length||ciRecentLevelUp(r.c)),
      evolucao:active.filter(r=>ciEvolution(r.a,r.c.baseline).state==='positive'||r.c.closeSuggestedAt)
    };
  }

  function renderAtRisk(){
    if(!can('coordenacao','view')){renderAccessDenied('Alunos em acompanhamento');return;}
    ciSync();
    window.__ci=window.__ci||{q:'',classId:'',level:'',view:'ativos',focus:''};
    const F=window.__ci;
    const rows=ciRowsForCurrent();
    const groups=ciGroups(rows);
    const visibleAll=visibleStudents().filter(activeStudent);
    const dist=[0,0,0,0];visibleAll.forEach(s=>{if(s.classId)dist[ciAnalyze(s).levelIdx]++;});
    const distTotal=dist.reduce((a,b)=>a+b,0)||1;
    const activeRows=rows.filter(r=>r.c.status==='Ativo');
    const catCount={freq:0,desemp:0,recup:0,mudanca:0,ocorr:0};activeRows.forEach(r=>r.a.cats.forEach(k=>catCount[k]++));
    const catLabels={freq:'Frequência',desemp:'Desempenho',recup:'Disciplinas abaixo da média',mudanca:'Mudanças recentes',ocorr:'Ocorrências'};
    const catMax=Math.max(1,...Object.values(catCount));
    const fresh=activeRows.filter(r=>r.c.auto&&!r.c.ack);
    const closures=activeRows.filter(r=>r.c.closeSuggestedAt&&r.c.closeDismissedSig!==ciClosure(r.a,r.c).sig);
    const canAct=can('coordenacao','create'),canEdit=can('coordenacao','edit');
    const classes=[...new Set(rows.map(r=>r.s.classId))].map(id=>classById(id)).filter(Boolean);

    let list=rows.filter(r=>F.view==='todos'||(F.view==='encerrados'?r.c.status==='Encerrado':r.c.status==='Ativo'));
    if(F.q)list=list.filter(r=>r.s.name.toLowerCase().includes(F.q.toLowerCase()));
    if(F.classId)list=list.filter(r=>r.s.classId===F.classId);
    if(F.level!=='')list=list.filter(r=>String(r.a.levelIdx)===String(F.level));
    if(F.focus)list=list.filter(r=>groups[F.focus].includes(r));
    list.sort((x,y)=>(x.c.status===y.c.status?0:x.c.status==='Ativo'?-1:1)||y.a.index-x.a.index);
    const pg=paginate(list,'ciCases');

    const kpis=[
      {k:'imediata',icon:'fa-triangle-exclamation',title:'Atenção imediata',emoji:'🔴',cls:'ci-l3',hint:'Índice ≥ 70% ou regra de prioridade'},
      {k:'acomp',icon:'fa-hand-holding-heart',title:'Em acompanhamento',emoji:'🟠',cls:'ci-l2',hint:'Casos ativos nos demais níveis'},
      {k:'mudancas',icon:'fa-wave-square',title:'Mudanças recentes',emoji:'🟡',cls:'ci-l1',hint:'Quedas, faltas ou piora de nível'},
      {k:'evolucao',icon:'fa-arrow-trend-up',title:'Evolução positiva',emoji:'🟢',cls:'ci-l0',hint:'Melhora desde a entrada'}
    ];
    const kpiHtml=kpis.map((k,i)=>{
      const items=groups[k.k];
      return `<button type="button" class="ci-kpi ${k.cls}${F.focus===k.k?' active':''}" data-focus="${k.k}" style="animation-delay:${i*60}ms" aria-pressed="${F.focus===k.k}">
        <span class="ci-kpi-icon"><i class="fa-solid ${k.icon}"></i></span>
        <span class="ci-kpi-body"><span class="ci-kpi-title">${k.emoji} ${escapeHtml(k.title)}</span><strong>${items.length}</strong>
        <span class="ci-kpi-names">${items.length?items.slice(0,3).map(r=>escapeHtml(r.s.name.split(' ')[0])).join(', ')+(items.length>3?` +${items.length-3}`:''):'Nenhum aluno no momento'}</span>
        <small>${k.hint}</small></span></button>`;
    }).join('');

    const distHtml=`<div class="ci-stack" role="img" aria-label="Distribuição dos alunos por nível de atenção">${dist.map((n,i)=>n?`<span class="${CI_LEVELS[i].cls}" style="width:${n/distTotal*100}%" title="${CI_LEVELS[i].label}: ${n}">${n}</span>`:'').join('')}</div>
      <div class="ci-legend">${CI_LEVELS.map((l,i)=>`<span><i class="${l.cls}"></i>${l.label} <b>${dist[i]}</b></span>`).join('')}</div>`;
    const catHtml=Object.keys(catCount).map(k=>`<div class="ci-hbar"><span>${catLabels[k]}</span><div><i style="width:${catCount[k]/catMax*100}%"></i></div><b>${catCount[k]}</b></div>`).join('');

    const freshHtml=fresh.length?`<div class="ci-banner ci-banner-warn" role="status"><div class="ci-banner-head"><strong><i class="fa-solid fa-bolt"></i> Novos alunos detectados automaticamente (${fresh.length})</strong><button type="button" class="small-button" id="ciAck"><i class="fa-solid fa-check"></i> Entendi</button></div>
      ${fresh.slice(0,4).map(r=>`<p>⚠️ <strong>${escapeHtml(r.s.name)}</strong> ${r.c.reentry?'voltou para':'entrou em'} acompanhamento automaticamente.<br><span>Motivos: ${escapeHtml(((r.c.entryReasons&&r.c.entryReasons.length?r.c.entryReasons:r.a.short)).join(' + ')||'indicadores abaixo do esperado')}.</span></p>`).join('')}${fresh.length>4?`<p class="muted">… e mais ${fresh.length-4} aluno(s).</p>`:''}</div>`:'';
    const closeHtml=closures.length?`<div class="ci-banner ci-banner-good" role="status"><strong><i class="fa-solid fa-flag-checkered"></i> Sugestão de encerramento (${closures.length})</strong>
      ${closures.map(r=>`<div class="ci-close-row"><div><p>🟢 <strong>${escapeHtml(r.s.name)}</strong> apresentou evolução consistente.</p><span>Deseja revisar ou encerrar o acompanhamento? O sistema nunca encerra sozinho.</span></div><button type="button" class="small-button ci-open" data-id="${r.s.id}"><i class="fa-solid fa-eye"></i> Revisar</button></div>`).join('')}</div>`:'';

    const cards=pg.slice.map((r,i)=>{
      const {c,s,a}=r;const {ev,label}=ciEvoLine(a,c);const closed=c.status==='Encerrado';
      return `<article class="ci-card ${a.level.cls}${closed?' ci-closed':''}" style="animation-delay:${Math.min(i,8)*40}ms">
        <div class="ci-card-top">${ciRing(a)}<div class="ci-id"><strong>${escapeHtml(s.name)}</strong><span>${escapeHtml(classLabel(classById(s.classId)))}</span>${closed?'<span class="ci-level ci-l0">Encerrado</span>':ciLevelBadge(a.level)}</div></div>
        <div class="ci-reasons">${(a.short.length?a.short:['Sem alertas no momento']).slice(0,4).map(t=>`<span>${escapeHtml(t)}</span>`).join('')}</div>
        ${ciCompChips(a)}
        <div class="ci-mini-evo"><div><small>Entrada</small><b>${fmtNum(c.baseline?.media)}</b> · ${ciPct(c.baseline?.freq)}</div><i class="fa-solid fa-arrow-right"></i><div><small>Atual</small><b>${fmtNum(a.media)}</b> · ${ciPct(a.freq)}</div>${closed?'':label}</div>
        ${!closed&&c.closeSuggestedAt&&c.closeDismissedSig!==ciClosure(a,c).sig?'<div class="ci-ribbon"><i class="fa-solid fa-flag-checkered"></i> Sugestão de encerramento</div>':''}
        <div class="ci-card-foot"><button type="button" class="small-button ci-open" data-id="${s.id}"><i class="fa-solid fa-diagram-project"></i> Abrir acompanhamento</button>${canAct&&!closed?`<button type="button" class="small-button ar-add" data-id="${s.id}"><i class="fa-solid fa-plus"></i> Registrar ação</button>`:''}</div>
      </article>`;
    }).join('');

    content.innerHTML=`<div class="ci-root">${pageHeader('Central Inteligente de Acompanhamento','O sistema analisa notas, frequência, recuperações e ocorrências, abre o acompanhamento sozinho e monitora a evolução. Ferramenta de apoio pedagógico — não é um diagnóstico e nunca encerra um caso sem a sua confirmação.',`<button type="button" class="btn-secondary" id="ciRefresh"><i class="fa-solid fa-rotate"></i> Reanalisar</button>${can('coordenacao','export')?'<button type="button" class="btn-secondary" id="ciExport"><i class="fa-solid fa-file-csv"></i> Exportar CSV</button>':''}`)}
      ${freshHtml}${closeHtml}
      <div class="ci-kpis">${kpiHtml}</div>
      <div class="ci-panels">
        <div class="card ci-panel"><div class="card-title"><div><h3>Nível de atenção da escola</h3><span>${visibleAll.length} aluno(s) analisado(s) automaticamente</span></div></div>${distHtml}</div>
        <div class="card ci-panel"><div class="card-title"><div><h3>O que mais pesa nos casos ativos</h3><span>Quantidade de alunos por tipo de motivo</span></div></div>${activeRows.length?catHtml:'<p class="muted">Sem casos ativos.</p>'}</div>
      </div>
      <details class="ci-how"><summary><i class="fa-solid fa-circle-question"></i> Como o índice de atenção é calculado</summary>
        <div class="ci-how-body"><p>O índice (0–100%) é a soma ponderada de cinco componentes, todos calculados a partir dos dados do sistema:</p>
        <ul>${CI_COMPONENTS.map(c=>`<li><strong>${c.label} (peso ${c.weight}%)</strong> — ${c.rule}</li>`).join('')}</ul>
        <p><strong>Níveis:</strong> 🟢 Normal (0–24%) · 🟡 Atenção (25–49%) · 🟠 Acompanhamento intensivo (50–69%) · 🔴 Atenção imediata (70–100%).</p>
        <p><strong>Regras de prioridade:</strong> frequência e média abaixo do mínimo ao mesmo tempo elevam o nível para, no mínimo, intensivo; frequência &lt; 60% (ou média &lt; 4,0) junto com o outro indicador abaixo do mínimo leva à atenção imediata.</p>
        <p><strong>Entrada automática:</strong> nível acima de Normal, frequência &lt; ${MIN_ATTENDANCE}%, média &lt; ${fmtNum(PASS_GRADE)}, 2 ou mais disciplinas abaixo da média, ou alerta de queda/faltas combinado com desempenho ou frequência já fragilizados. <strong>Mudanças</strong> comparam o aluno com o próprio histórico (últimos bimestres e frequência recente × anterior). Atividades não entregues ainda não existem no sistema e, por isso, não entram no cálculo.</p></div></details>
      <div class="filter-bar ci-filters" role="search">
        <input type="search" id="ciQ" placeholder="Buscar aluno..." aria-label="Buscar aluno" value="${escapeHtml(F.q)}">
        <select id="ciClass" aria-label="Filtrar por turma">${optionsHtml(classes.map(c=>({value:c.id,label:classLabel(c)})),F.classId,'Todas as turmas')}</select>
        <select id="ciLevel" aria-label="Filtrar por nível">${optionsHtml(CI_LEVELS.slice(1).map((l,i)=>({value:i+1,label:`${l.emoji} ${l.label}`})),F.level,'Todos os níveis')}</select>
        <select id="ciView" aria-label="Situação do acompanhamento">${optionsHtml([{value:'ativos',label:'Acompanhamentos ativos'},{value:'encerrados',label:'Encerrados'},{value:'todos',label:'Todos'}],F.view)}</select>
        ${F.focus?`<button type="button" class="small-button" id="ciClearFocus"><i class="fa-solid fa-xmark"></i> Limpar destaque</button>`:''}
      </div>
      ${list.length?`<div class="ci-grid">${cards}</div>${paginationHtml(pg,'ciCases')}`:`<div class="empty-state">${rows.length?'Nenhum aluno encontrado para os filtros selecionados.':'🟢 Nenhum aluno em acompanhamento no momento. A análise automática continua monitorando notas e frequência.'}</div>`}
    </div>`;

    const rerender=()=>renderAtRisk();
    bindPagination('ciCases',rerender);
    content.querySelectorAll('.ci-kpi').forEach(b=>b.onclick=()=>{F.focus=F.focus===b.dataset.focus?'':b.dataset.focus;F.view='ativos';window.__pg&&window.__pg.ciCases&&(window.__pg.ciCases.page=1);rerender();});
    document.getElementById('ciClearFocus')?.addEventListener('click',()=>{F.focus='';rerender();});
    let t;document.getElementById('ciQ').oninput=e=>{clearTimeout(t);const v=e.target.value;t=setTimeout(()=>{F.q=v;if(window.__pg&&window.__pg.ciCases)window.__pg.ciCases.page=1;rerender();const q=document.getElementById('ciQ');q.focus();q.setSelectionRange(v.length,v.length);},250);};
    [['ciClass','classId'],['ciLevel','level'],['ciView','view']].forEach(([id,k])=>document.getElementById(id).onchange=e=>{F[k]=e.target.value;if(window.__pg&&window.__pg.ciCases)window.__pg.ciCases.page=1;rerender();});
    document.getElementById('ciRefresh').onclick=()=>{const n=ciSync();rerender();showToast(n?`Análise atualizada: ${n} novidade(s) detectada(s).`:'Análise atualizada: nenhuma mudança nova.');};
    document.getElementById('ciExport')?.addEventListener('click',()=>exportCsv('acompanhamento_alunos.csv',[['Aluno','Turma','Situação','Nível','Índice de atenção (%)','Média geral','Frequência (%)','Motivos','Entrada no acompanhamento']].concat(list.map(r=>[r.s.name,classLabel(classById(r.s.classId)),r.c.status,r.a.level.label,r.a.index,fmtNum(r.a.media),r.a.freq??'',r.a.short.join(' + '),formatDate((r.c.openedAt||'').slice(0,10))]))));
    document.getElementById('ciAck')?.addEventListener('click',()=>{fresh.forEach(r=>r.c.ack=true);save();rerender();});
    content.querySelectorAll('.ci-open').forEach(b=>b.onclick=()=>openCaseDetail(b.dataset.id));
    content.querySelectorAll('.ar-add').forEach(b=>b.onclick=()=>openTrackingEditor(b.dataset.id));
  }

  // ----- detalhe do acompanhamento de um aluno -----
  function ciTimeline(c,s){
    const icons={entrada:'fa-door-open',reabertura:'fa-rotate-left',alerta:'fa-bell',nivel:'fa-layer-group',acao:'fa-clipboard-check',sugestao:'fa-lightbulb',evolucao:'fa-arrow-trend-up',sugestao_encerramento:'fa-flag-checkered',encerramento:'fa-circle-check',revisao:'fa-eye'};
    const ev=(c.events||[]).map(e=>({at:e.at,type:e.type,text:e.text}));
    (state.trackingRecords||[]).filter(t=>t.studentId===s.id&&t.schoolId===sid()).forEach(t=>ev.push({at:t.at||`${t.date}T12:00:00`,type:'acao',text:`Ação registrada${t.actionType?' ('+t.actionType+')':''}: ${t.notes}${t.responsible?' — '+t.responsible:''}`}));
    ev.sort((x,y)=>String(y.at).localeCompare(String(x.at)));
    return `<ol class="ci-timeline">${ev.map(e=>`<li class="ci-t-${e.type}"><span class="ci-t-dot"><i class="fa-solid ${icons[e.type]||'fa-circle'}"></i></span><div><time>${ciDateTime(e.at)}</time><p>${escapeHtml(e.text)}</p></div></li>`).join('')||'<li class="muted">Sem eventos.</li>'}</ol>`;
  }
  function openCaseDetail(studentId,keepScroll){
    const s=studentById(studentId);if(!s)return;
    const c=ciCases().find(x=>x.studentId===studentId&&x.schoolId===sid()&&x.status==='Ativo')||ciCases().filter(x=>x.studentId===studentId&&x.schoolId===sid()).sort((x,y)=>String(y.openedAt).localeCompare(String(x.openedAt)))[0];
    if(!c){showToast('Este aluno não possui acompanhamento aberto.');return;}
    const a=ciAnalyze(s);const closed=c.status==='Encerrado';
    const {ev,label}=ciEvoLine(a,c);const cl=ciClosure(a,c);
    const canAct=can('coordenacao','create'),canEdit=can('coordenacao','edit');
    const showClose=!closed&&c.closeSuggestedAt&&c.closeDismissedSig!==cl.sig;
    const prevScroll=keepScroll?document.querySelector('#modal .modal-box')?.scrollTop:0;
    const periodVals=PERIODS.map((p,i)=>{const x=a.periodSeries.find(y=>y.period===p);return x?x.value:null;});
    const b=c.baseline||{};
    const sugHtml=(c.suggestions||[]).length?(c.suggestions||[]).map(x=>{
      const txt=escapeHtml(x.editedText||x.text);
      const st=x.status==='pendente'?'':`<span class="ci-tag ${x.status==='ignorada'?'ci-tag-flat':'ci-tag-good'}">${x.status==='aceita'?'Aceita':x.status==='realizada'?'Realizada':'Ignorada'}</span>`;
      const btns=!canAct||closed?'':x.status==='pendente'?`<button type="button" class="small-button ci-sg" data-k="${escapeHtml(x.key)}" data-a="aceitar"><i class="fa-solid fa-check"></i> Aceitar</button><button type="button" class="small-button ci-sg" data-k="${escapeHtml(x.key)}" data-a="editar"><i class="fa-solid fa-pen"></i> Editar</button><button type="button" class="small-button ci-sg" data-k="${escapeHtml(x.key)}" data-a="ignorar"><i class="fa-solid fa-ban"></i> Ignorar</button>`:x.status==='aceita'?`<button type="button" class="small-button ci-sg" data-k="${escapeHtml(x.key)}" data-a="realizada"><i class="fa-solid fa-circle-check"></i> Marcar como realizada</button>`:x.status==='ignorada'?`<button type="button" class="small-button ci-sg" data-k="${escapeHtml(x.key)}" data-a="reabrir"><i class="fa-solid fa-rotate-left"></i> Reconsiderar</button>`:'';
      return `<div class="ci-sug ci-sug-${x.status}"><span class="ci-sug-icon"><i class="fa-solid ${x.icon||'fa-lightbulb'}"></i></span><div class="ci-sug-body"><strong>${txt}</strong> ${st}<p>${escapeHtml(x.detail||'')}</p></div><div class="ci-sug-actions">${btns}</div></div>`;
    }).join(''):'<p class="muted">Nenhuma sugestão no momento: os indicadores não apontam ações específicas.</p>';
    const subjRows=a.subjects.map(x=>`<tr><td>${escapeHtml(x.name)}${x.teacher?`<br><small class="muted">${escapeHtml(x.teacher)}</small>`:''}</td>${x.per.map(v=>`<td>${fmtNum(v)}</td>`).join('')}<td><span class="badge ${x.fin===null?'badge-gray':x.fin>=PASS_GRADE?'badge-green':x.fin>=RECOVERY_MIN?'badge-yellow':'badge-red'}">${fmtNum(x.fin)}</span></td><td>${x.delta===null?'—':ciDelta(x.delta,'nota')}</td></tr>`).join('');
    openModal(`Acompanhamento — ${escapeHtml(s.name)}`,`<div class="ci-detail">
      <div class="ci-d-head ${a.level.cls}">${ciRing(a,true)}<div><h3>${escapeHtml(s.name)}</h3><p class="muted">${escapeHtml(classLabel(classById(s.classId)))} · Matrícula ${escapeHtml(s.registration||'—')}</p>
        <div>${closed?'<span class="ci-level ci-l0">Acompanhamento encerrado</span>':ciLevelBadge(a.level)} ${closed?'':label}</div>
        <p class="muted">${closed?`Encerrado em ${formatDate((c.closedAt||'').slice(0,10))}`:`Em acompanhamento desde ${formatDate((c.openedAt||'').slice(0,10))}${c.auto?' (entrada automática)':''}`}</p></div></div>
      ${showClose?`<div class="ci-banner ci-banner-good"><strong>🟢 O aluno apresentou evolução consistente.</strong><p>Deseja revisar ou encerrar o acompanhamento? O sistema só encerra com a sua confirmação.</p><ul class="ci-checks">${cl.checks.map(x=>`<li>✔ ${escapeHtml(x.text)}</li>`).join('')}</ul>${canEdit?`<div class="form-actions"><button type="button" class="btn-secondary" id="ciKeep">Manter acompanhamento</button><button type="button" class="btn-primary" id="ciCloseBtn">Encerrar acompanhamento…</button></div>`:''}</div>`:''}
      ${closed&&canEdit?`<div class="form-actions"><button type="button" class="btn-secondary" id="ciReopen"><i class="fa-solid fa-rotate-left"></i> Reabrir acompanhamento</button></div>`:''}
      ${a.alerts.length&&!closed?`<div class="ci-sec"><h4>Mudanças detectadas</h4>${a.alerts.map(x=>`<div class="ci-alert ci-alert-${x.kind}"><span>${x.kind==='faltas'?'⚠️':'📉'}</span><div><strong>${escapeHtml(x.title)}</strong><p>${escapeHtml(x.text)}</p></div></div>`).join('')}</div>`:''}
      <div class="ci-sec"><h4>Por que este nível?</h4><p>${a.level.emoji} <strong>${a.level.label}</strong> — índice de atenção <strong>${a.index}%</strong>.</p><ul class="ci-why">${a.why.length?a.why.map(w=>`<li>${escapeHtml(w)}</li>`).join(''):'<li>Nenhum indicador fora do esperado no momento.</li>'}</ul></div>
      <div class="ci-sec"><h4>Índice de atenção: ${a.index}% ${a.level.emoji}</h4>
        <div class="ci-breakdown">${a.comps.map(x=>`<div class="ci-br"><span><i class="fa-solid ${x.icon}"></i> ${x.label} ${x.emoji}</span><div class="ci-bar"><i class="${CI_LEVELS[x.score>=75?3:x.score>=50?2:x.score>=25?1:0].cls}" style="width:${x.score}%"></i></div><b>${x.score}%</b><small>${escapeHtml(x.detail)} · peso ${x.weight}% → ${String(x.points).replace('.',',')} pt</small></div>`).join('')}</div></div>
      <div class="ci-sec"><h4>Evolução automática</h4>
        <div class="ci-evo-grid"><div class="ci-evo-box"><small>Antes do acompanhamento</small><p>Média: <b>${fmtNum(b.media)}</b></p><p>Frequência: <b>${ciPct(b.freq)}</b></p><p>Índice: <b>${b.index??'—'}%</b></p></div>
        <div class="ci-evo-arrow"><i class="fa-solid fa-arrow-right"></i></div>
        <div class="ci-evo-box ci-evo-now"><small>Atual</small><p>Média: <b>${fmtNum(a.media)}</b> ${ciDelta(ev.dMedia,'nota')}</p><p>Frequência: <b>${ciPct(a.freq)}</b> ${ciDelta(ev.dFreq,'pp')}</p><p>Índice: <b>${a.index}%</b> ${ev.dIndex?`<span class="${ev.dIndex<0?'ci-d-up':'ci-d-down'}">${ev.dIndex<0?'▼':'▲'} ${Math.abs(ev.dIndex)} pt</span>`:''}</p></div></div>
        <p>${ev.state==='positive'?'🟢 <strong>Evolução positiva detectada.</strong>':ev.state==='negative'?'🔴 <strong>Piora detectada</strong> em relação à entrada.':'Situação estável em relação à entrada no acompanhamento.'}</p>
        <div class="ci-sparks"><div><small>Média por bimestre${a.periodSeries.length&&a.periodSeries[a.periodSeries.length-1].n<a.subjects.length?' (último parcial)':''}</small>${ciSpark(periodVals,{min:0,max:10,color:'var(--primary)'})}<span class="muted">${periodVals.filter(v=>v!==null).map(fmtNum).join(' → ')||'—'}</span></div>
        <div><small>Frequência ao longo das aulas</small>${ciSpark(a.attSeries,{min:40,max:100,color:'#0d9488'})}<span class="muted">${a.attSeries.length?a.attSeries.map(v=>ciPct(v)).join(' → '):'Poucos registros'}</span></div></div></div>
      <div class="ci-sec"><h4>Disciplinas</h4><div class="table-wrap"><table><thead><tr><th>Disciplina</th>${PERIODS.map(p=>`<th>${p.slice(0,2)}º B</th>`).join('')}<th>Média</th><th>Tendência</th></tr></thead><tbody>${subjRows}</tbody></table></div></div>
      ${closed?'':`<div class="ci-sec"><h4>🤖 Sugestões automáticas</h4>${sugHtml}</div>`}
      <div class="ci-sec"><h4>Linha do tempo</h4>${ciTimeline(c,s)}</div>
      ${!closed&&canAct?`<div class="form-actions"><button type="button" class="btn-secondary" id="ciCloseBtn2"><i class="fa-solid fa-flag-checkered"></i> Encerrar acompanhamento…</button><button type="button" class="btn-primary" id="ciAddAction"><i class="fa-solid fa-plus"></i> Registrar ação</button></div>`:''}
    </div>`);
    if(keepScroll&&prevScroll){const mb=document.querySelector('#modal .modal-box');if(mb)mb.scrollTop=prevScroll;}
    const refresh=()=>{save();renderAtRisk();openCaseDetail(studentId,true);};
    document.querySelectorAll('.ci-sg').forEach(btn=>btn.onclick=()=>{
      const sg=(c.suggestions||[]).find(x=>x.key===btn.dataset.k);if(!sg)return;const act=btn.dataset.a;
      if(act==='editar'){
        openModal(`Editar sugestão — ${escapeHtml(s.name)}`,`<form id="ciEditForm" class="form-card" style="border:none;padding:0" novalidate><label for="ci_txt">Ação a realizar *</label><textarea id="ci_txt" rows="3" required>${escapeHtml(sg.editedText||sg.text)}</textarea><div class="form-actions"><button type="button" class="btn-secondary" id="ciEditCancel">Cancelar</button> <button class="btn-primary">Aceitar com edição</button></div></form>`);
        document.getElementById('ciEditCancel').onclick=()=>openCaseDetail(studentId);
        document.getElementById('ciEditForm').onsubmit=e=>{e.preventDefault();const v=document.getElementById('ci_txt').value.trim();if(!v)return formError('Descreva a ação.');sg.editedText=v;sg.status='aceita';sg.decidedAt=new Date().toISOString();ciPush(c,'sugestao',`Sugestão editada e aceita por ${state.user||'usuário'}: ${v}`);logAudit('Acompanhamento','Sugestão editada',`${s.name} — ${v.slice(0,60)}`);refresh();};
        return;
      }
      const t=sg.editedText||sg.text;
      if(act==='aceitar'){sg.status='aceita';ciPush(c,'sugestao',`Sugestão aceita por ${state.user||'usuário'}: ${t}`);logAudit('Acompanhamento','Sugestão aceita',`${s.name} — ${t.slice(0,60)}`);}
      else if(act==='ignorar'){sg.status='ignorada';ciPush(c,'sugestao',`Sugestão ignorada por ${state.user||'usuário'}: ${t}`);}
      else if(act==='reabrir'){sg.status='pendente';ciPush(c,'sugestao',`Sugestão reconsiderada: ${t}`);}
      else if(act==='realizada'){sg.status='realizada';state.trackingRecords.push({id:crypto.randomUUID(),schoolId:sid(),studentId,date:todayIso(),at:new Date().toISOString(),reasons:a.short,notes:t,actionType:'Sugestão do sistema',responsible:state.user||'',status:'Em acompanhamento'});logAudit('Acompanhamento','Ação realizada',`${s.name} — ${t.slice(0,60)}`);}
      sg.decidedAt=new Date().toISOString();refresh();
    });
    document.getElementById('ciKeep')?.addEventListener('click',()=>{c.closeDismissedSig=cl.sig;ciPush(c,'revisao',`Sugestão de encerramento revisada por ${state.user||'usuário'}: acompanhamento mantido.`);refresh();});
    const askClose=()=>{
      if(!canEdit){denyToast('edit');return;}
      openModal(`Encerrar acompanhamento — ${escapeHtml(s.name)}`,`<form id="ciCloseForm" class="form-card" style="border:none;padding:0" novalidate><p>O acompanhamento só será encerrado após a sua confirmação. O histórico completo é mantido e o aluno volta a ser monitorado automaticamente.</p><label for="ci_note">Observação de encerramento (opcional)</label><textarea id="ci_note" rows="3"></textarea><div class="form-actions"><button type="button" class="btn-secondary" id="ciCloseNo">Cancelar</button> <button class="btn-primary">Confirmar encerramento</button></div></form>`);
      document.getElementById('ciCloseNo').onclick=()=>openCaseDetail(studentId);
      document.getElementById('ciCloseForm').onsubmit=e=>{e.preventDefault();const note=document.getElementById('ci_note').value.trim();c.status='Encerrado';c.closedAt=new Date().toISOString();c.closedIndex=a.index;c.closedBy=state.user||'';ciPush(c,'encerramento',`Acompanhamento encerrado por ${state.user||'usuário'}.${note?' Observação: '+note:''}`);logAudit('Acompanhamento','Encerramento',s.name);save();renderAtRisk();openCaseDetail(studentId);showToast('Acompanhamento encerrado.');};
    };
    document.getElementById('ciCloseBtn')?.addEventListener('click',askClose);
    document.getElementById('ciCloseBtn2')?.addEventListener('click',askClose);
    document.getElementById('ciReopen')?.addEventListener('click',()=>{
      const exists=ciCases().find(x=>x.studentId===studentId&&x.status==='Ativo');if(exists){showToast('Já existe um acompanhamento ativo para este aluno.');return;}
      c.status='Ativo';c.closedAt=null;c.ack=true;c.closeSuggestedAt=null;c.closeDismissedSig=null;c.baseline=ciSnapshot(a);c.evoState='stable';ciPush(c,'reabertura',`Acompanhamento reaberto por ${state.user||'usuário'}.`);logAudit('Acompanhamento','Reabertura',s.name);refresh();
    });
    document.getElementById('ciAddAction')?.addEventListener('click',()=>openTrackingEditor(studentId));
  }

  function openTrackingEditor(studentId){
    if(!can('coordenacao','create')){denyToast('create');return;}
    const s=studentById(studentId);
    openModal(`Registrar ação — ${escapeHtml(s.name)}`,`<form id="trkForm" class="form-card" style="border:none;padding:0" novalidate><label for="trk_type">Tipo de ação</label><select id="trk_type">${optionsHtml(['Contato com o responsável','Reforço escolar','Conversa com professor','Reunião / atendimento','Plano de recuperação','Outra'],'Contato com o responsável')}</select><label for="trk_notes">Ação realizada / observações *</label><textarea id="trk_notes" rows="4" required></textarea><label for="trk_resp">Responsável pelo acompanhamento</label><input id="trk_resp" value="${escapeHtml(state.user||'')}"><div class="form-actions"><button type="button" class="btn-secondary" id="trkCancel">Cancelar</button> <button class="btn-primary">Salvar</button></div></form>`);
    document.getElementById('trkCancel').onclick=closeModal;
    document.getElementById('trkForm').onsubmit=e=>{
      e.preventDefault();
      const notes=document.getElementById('trk_notes').value.trim();
      if(!notes)return formError('Descreva a ação realizada.');
      state.trackingRecords.push({id:crypto.randomUUID(),schoolId:sid(),studentId,date:todayIso(),at:new Date().toISOString(),reasons:riskReasons(s),notes,actionType:document.getElementById('trk_type').value,responsible:document.getElementById('trk_resp').value.trim(),status:'Em acompanhamento'});
      logAudit('Acompanhamento','Registro',`${s.name} — ${notes.slice(0,60)}`);
      save();closeModal();renderAtRisk();showToast('Ação de acompanhamento registrada.');
    };
  }

  // ----- Censo Escolar (validação) -----

  // ===== DIES — Departamento de Inspeção Escolar =====
  // Dados em: state.diesInspections, diesIrregularities, diesDocuments, diesComplaints, diesNotifications, diesConfig.
  // Nenhum registro é excluído; mudanças ficam no histórico do próprio registro e na Auditoria do SIGED.
  const dE=escapeHtml;
  const DIES_TYPES=['Inspeção de rotina','Inspeção especial','Inspeção motivada por denúncia','Inspeção documental','Inspeção de acompanhamento de irregularidades'];
  const DIES_RESULTS=['Regular','Regular com pendências','Irregular'];
  const DIES_ANSWERS=['Conforme','Não conforme','Não aplicável','Pendente de verificação'];
  const DIES_DOC_CATS=['Ato autorizativo','Documento institucional','Ata de resultado final','Histórico escolar','Certificado','Declaração','Registro de matrícula/transferência','Outro'];
  const DIES_CK_CATS=['Documentação e regularidade','Funcionamento acadêmico','Estrutura e condições de funcionamento'];
  const DIES_IRR_CATS=[...DIES_CK_CATS,'Registros acadêmicos','Outra'];
  const DIES_BADGE={'Agendada':'badge-blue','Em andamento':'badge-yellow','Concluída':'badge-green','Cancelada':'badge-gray','Atrasada':'badge-red','Aberta':'badge-red','Notificada':'badge-yellow','Aguardando correção':'badge-yellow','Em análise':'badge-blue','Resolvida':'badge-green','Encerrada':'badge-gray','Prazo vencido':'badge-red','Vencido':'badge-red','A vencer':'badge-yellow','Vigente':'badge-green','Sem validade':'badge-gray','Pendente de envio':'badge-yellow','Recebido':'badge-blue','Conferido':'badge-green','Correção solicitada':'badge-red','Regular':'badge-green','Regular com pendências':'badge-yellow','Com pendências':'badge-yellow','Irregular':'badge-red','Sem avaliação':'badge-gray','Recebida':'badge-blue','Em apuração':'badge-yellow','Arquivada':'badge-gray','Conforme':'badge-green','Não conforme':'badge-red','Não aplicável':'badge-gray','Pendente de verificação':'badge-yellow'};
  const DIES_CK_DEFAULT=[
    ['Documentação e regularidade','Autorização de funcionamento'],['Documentação e regularidade','Documentos institucionais'],['Documentação e regularidade','Registros e atas escolares'],['Documentação e regularidade','Históricos escolares'],['Documentação e regularidade','Certificados e declarações'],['Documentação e regularidade','Registros de transferência'],['Documentação e regularidade','Organização dos arquivos escolares'],
    ['Funcionamento acadêmico','Calendário escolar'],['Funcionamento acadêmico','Cumprimento dos dias letivos previstos'],['Funcionamento acadêmico','Diários de classe'],['Funcionamento acadêmico','Registros de frequência'],['Funcionamento acadêmico','Lançamento de notas'],['Funcionamento acadêmico','Resultados finais'],['Funcionamento acadêmico','Consistência entre diários, atas e históricos'],
    ['Estrutura e condições de funcionamento','Condições dos espaços físicos'],['Estrutura e condições de funcionamento','Acessibilidade'],['Estrutura e condições de funcionamento','Condições de funcionamento'],['Estrutura e condições de funcionamento','Pendências de manutenção relevantes para a inspeção']
  ];
  // Configuração: prazos e checklist. Nenhum item vem marcado como obrigatório: a Coordenação define conforme a rede e as normas.
  function diesCfg(){
    if(!state.diesConfig){
      state.diesConfig={warnDays:30,alertDays:7,deadlineDays:30,intervalMonths:12,
        checklist:DIES_CK_DEFAULT.map(([category,text],i)=>({id:'ck'+(i+1),category,text,active:true,requiredFor:[]}))};
    }
    return state.diesConfig;
  }
  function dToday(){return todayIso();}
  function dAdd(iso,n){const d=new Date(iso+'T12:00:00');d.setDate(d.getDate()+n);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
  function dDiff(a,b){return Math.round((new Date(b+'T12:00:00')-new Date(a+'T12:00:00'))/864e5);}
  function dHist(rec,text){rec.history=rec.history||[];rec.history.push({at:new Date().toISOString(),user:state.user,text});}
  function dHistHtml(rec){return `<div class="timeline">${(rec.history||[]).slice().reverse().map(h=>`<div><b>${new Date(h.at).toLocaleString('pt-BR')}</b>${dE(h.user||'')} — ${dE(h.text)}</div>`).join('')||'<div>Sem registros.</div>'}</div>`;}
  function dSchool(id){return state.schools.find(s=>s.id===id);}
  function dSchoolName(id){return dSchool(id)?.name||'—';}
  function dNet(s){return s?.dependency==='Privada'?'Privada':'Pública';}
  function dResetPg(k){window.__pg=window.__pg||{};if(window.__pg[k])window.__pg[k].page=1;}
  function dCan(a){return can('dies',a);}
  function dRow(l,v){return `<div><b>${l}</b><span>${dE(v||'—')}</span></div>`;}
  function dSection(t){return `<h3 style="margin:20px 0 8px">${t}</h3>`;}

  // ----- anexos (PDF/PNG/JPG, até 2 MB, 3 por vez; ficam em dataURL no localStorage, como no resto do SIGED) -----
  function dAttachField(id,label='Anexos (PDF, PNG ou JPG, até 2 MB cada)'){return `<div class="full"><label>${label}</label><input type="file" id="${id}" multiple accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"></div>`;}
  function dReadFiles(inputId){
    const files=[...(document.getElementById(inputId)?.files||[])];
    if(files.length>3) return Promise.reject(new Error('Anexe no máximo 3 arquivos por vez.'));
    const ok=['application/pdf','image/png','image/jpeg'];
    for(const f of files){
      if(!ok.includes(f.type)) return Promise.reject(new Error(`"${f.name}": tipo não permitido (use PDF, PNG ou JPG).`));
      if(f.size>2*1024*1024) return Promise.reject(new Error(`"${f.name}" excede o limite de 2 MB.`));
    }
    return Promise.all(files.map(f=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res({id:crypto.randomUUID(),name:f.name,type:f.type,size:f.size,data:r.result,at:new Date().toISOString(),by:state.user});r.onerror=()=>rej(new Error('Falha ao ler o arquivo.'));r.readAsDataURL(f);})));
  }
  function dAttachList(list){return (list||[]).length?`<ul style="padding-left:18px">${list.map(a=>`<li><a href="${a.data}" download="${dE(a.name)}">${dE(a.name)}</a> <small class="muted">(${Math.round(a.size/1024)} KB · ${dE(a.by||'')})</small></li>`).join('')}</ul>`:'<p class="muted">Nenhum arquivo anexado.</p>';}

  // ----- regras de situação -----
  function diesOpenIrr(r){return r.status!=='Resolvida'&&r.status!=='Encerrada';}
  function diesIrrOverdue(r){return ['Notificada','Aguardando correção'].includes(r.status)&&!!r.deadline&&r.deadline<dToday();}
  function diesIrrLabel(r){return diesIrrOverdue(r)?'Prazo vencido':r.status;}
  function diesInspStatus(i){return i.status==='Agendada'&&i.plannedDate<dToday()?'Atrasada':i.status;}
  function diesDocValidity(d){if(!d.validityDate)return 'Sem validade';const t=dToday();if(d.validityDate<t)return 'Vencido';return dDiff(t,d.validityDate)<=diesCfg().warnDays?'A vencer':'Vigente';}
  function diesDocPending(d){return d.status==='Pendente de envio'||d.status==='Correção solicitada';}
  // Regularidade = regras explícitas (não depende só de existir inspeção):
  //  Irregular: irregularidade em aberto com prazo vencido OU última inspeção concluída com resultado "Irregular".
  //  Com pendências: irregularidade em aberto, documento vencido/pendente OU última inspeção "Regular com pendências".
  //  Regular: sem nenhuma das anteriores E última inspeção concluída com resultado "Regular".
  //  Sem avaliação: sem inspeção concluída e sem pendências registradas.
  function diesSchoolStats(id){
    const insp=(state.diesInspections||[]).filter(i=>i.schoolId===id);
    const done=insp.filter(i=>i.status==='Concluída').sort((a,b)=>(b.doneDate||'').localeCompare(a.doneDate||''));
    const next=insp.filter(i=>i.status==='Agendada'||i.status==='Em andamento').sort((a,b)=>a.plannedDate.localeCompare(b.plannedDate))[0];
    const irr=(state.diesIrregularities||[]).filter(r=>r.schoolId===id&&diesOpenIrr(r));
    const docs=(state.diesDocuments||[]).filter(d=>d.schoolId===id);
    const expired=docs.filter(d=>diesDocValidity(d)==='Vencido'),pend=docs.filter(diesDocPending),overdue=irr.filter(diesIrrOverdue);
    const last=done[0];const reasons=[];let level='Sem avaliação';
    if(overdue.length) reasons.push(`${overdue.length} irregularidade(s) com prazo vencido`);
    if(last&&last.result==='Irregular') reasons.push('Última inspeção concluída com resultado "Irregular"');
    if(reasons.length) level='Irregular';
    else{
      if(irr.length) reasons.push(`${irr.length} irregularidade(s) em aberto`);
      if(expired.length) reasons.push(`${expired.length} documento(s) vencido(s)`);
      if(pend.length) reasons.push(`${pend.length} documento(s) pendente(s) de envio/correção`);
      if(last&&last.result==='Regular com pendências') reasons.push('Última inspeção concluída com pendências');
      if(reasons.length) level='Com pendências';
      else if(last&&last.result==='Regular') level='Regular';
    }
    const needs=!next&&(!last||dDiff(last.doneDate,dToday())>diesCfg().intervalMonths*30);
    return {level,reasons,last,next,openIrr:irr,expired,pend,docs,insp,needsInspection:needs,pendCount:irr.length+new Set([...expired,...pend]).size};
  }

  // ----- notificações internas (geradas a partir de datas reais quando as telas do DIES são abertas; não há envio externo) -----
  function diesSync(){
    const list=state.diesNotifications=state.diesNotifications||[];const has=new Set(list.map(n=>n.key));const cfg=diesCfg();const t=dToday();let added=0;
    const add=(key,type,text)=>{if(has.has(key))return;has.add(key);added++;list.unshift({id:crypto.randomUUID(),key,type,text,recipient:'Equipe DIES',date:new Date().toISOString(),read:false});};
    (state.diesInspections||[]).forEach(i=>{
      const nm=`${i.protocol} — ${dSchoolName(i.schoolId)}`;
      if(i.status==='Agendada'&&i.plannedDate>=t&&dDiff(t,i.plannedDate)<=cfg.alertDays) add(`insp-prox:${i.id}`,'Inspeção próxima',`Inspeção ${nm} prevista para ${formatDate(i.plannedDate)}.`);
      if(i.status==='Agendada'&&i.plannedDate<t) add(`insp-atras:${i.id}`,'Inspeção atrasada',`Inspeção ${nm} estava prevista para ${formatDate(i.plannedDate)} e não foi iniciada.`);
      if(i.status==='Em andamento') add(`rel-pend:${i.id}`,'Relatório pendente',`Inspeção ${nm} está em andamento: checklist e resultado ainda não concluídos.`);
    });
    (state.diesDocuments||[]).forEach(d=>{
      const v=diesDocValidity(d),nm=`${d.title} (${dSchoolName(d.schoolId)})`;
      if(v==='Vencido') add(`doc-venc:${d.id}:${d.validityDate}`,'Documento vencido',`Documento ${nm} venceu em ${formatDate(d.validityDate)}.`);
      if(v==='A vencer') add(`doc-prox:${d.id}:${d.validityDate}`,'Documento a vencer',`Documento ${nm} vence em ${formatDate(d.validityDate)}.`);
    });
    (state.diesIrregularities||[]).forEach(r=>{
      const nm=`${r.protocol} — ${dSchoolName(r.schoolId)}`;
      if(r.status==='Aberta') add(`irr-nova:${r.id}`,'Irregularidade registrada',`Irregularidade ${nm} registrada e ainda não notificada à escola.`);
      if(['Notificada','Aguardando correção'].includes(r.status)&&r.deadline){
        if(r.deadline<t) add(`irr-venc:${r.id}:${r.deadline}`,'Prazo vencido',`Prazo de regularização de ${nm} venceu em ${formatDate(r.deadline)}.`);
        else if(dDiff(t,r.deadline)<=cfg.alertDays) add(`irr-prazo:${r.id}:${r.deadline}`,'Prazo próximo',`Prazo de regularização de ${nm} termina em ${formatDate(r.deadline)}.`);
      }
      if(r.status==='Em análise') add(`irr-resp:${r.id}:${r.responseAt||''}`,'Resposta aguardando análise',`Há resposta da escola aguardando análise em ${nm}.`);
    });
    if(added) save();
    return added;
  }
  function diesUnread(){return (state.diesNotifications||[]).filter(n=>!n.read).length;}

  // ----- painel inicial -----
  function dBars(items){
    const max=Math.max(1,...items.map(i=>i.value));
    return items.some(i=>i.value)?`<div class="dies-bars">${items.map(i=>`<div class="dies-bar"><span class="dies-bar-l" title="${dE(i.label)}">${dE(i.label)}</span><div class="dies-bar-t"><div class="dies-bar-f" style="width:${Math.round(i.value/max*100)}%"></div></div><b>${i.value}</b></div>`).join('')}</div>`:'<p class="muted">Sem dados suficientes ainda.</p>';
  }
  function dMonths(n){const out=[],d=new Date();for(let k=n-1;k>=0;k--){const x=new Date(d.getFullYear(),d.getMonth()-k,1);out.push({key:`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}`,label:x.toLocaleDateString('pt-BR',{month:'short',year:'2-digit'})});}return out;}
  function renderDiesDashboard(){
    diesSync();
    const insp=state.diesInspections||[],irr=state.diesIrregularities||[],docs=state.diesDocuments||[];
    const stats=state.schools.map(s=>({s,st:diesSchoolStats(s.id)}));
    const lvl=l=>stats.filter(x=>x.st.level===l).length;
    const ic=st=>insp.filter(i=>diesInspStatus(i)===st).length;
    const dv=v=>docs.filter(d=>diesDocValidity(d)===v).length;
    const empty=!insp.length&&!irr.length&&!docs.length;
    const months=dMonths(6);
    const perMonth=(list,field)=>months.map(m=>({label:m.label,value:list.filter(x=>(x[field]||'').slice(0,7)===m.key).length}));
    const byCity={};stats.forEach(x=>{const c=x.s.city||'Sem município';byCity[c]=(byCity[c]||0)+x.st.pendCount;});
    const withDeadline=irr.filter(r=>r.deadline);
    const onTime=withDeadline.filter(r=>r.resolvedDate&&r.resolvedDate<=r.deadline).length,late=withDeadline.filter(r=>r.resolvedDate&&r.resolvedDate>r.deadline).length;
    const overdueOpen=withDeadline.filter(r=>diesOpenIrr(r)&&diesIrrOverdue(r)).length,openOk=withDeadline.filter(r=>diesOpenIrr(r)&&!diesIrrOverdue(r)).length;
    const prio=[];
    irr.filter(r=>diesOpenIrr(r)&&diesIrrOverdue(r)).forEach(r=>prio.push({sev:0,text:`Prazo vencido: ${r.protocol} — ${dSchoolName(r.schoolId)}`,page:'diesIrreg'}));
    docs.filter(d=>diesDocValidity(d)==='Vencido').forEach(d=>prio.push({sev:1,text:`Documento vencido: ${d.title} — ${dSchoolName(d.schoolId)}`,page:'diesDocs'}));
    insp.filter(i=>diesInspStatus(i)==='Atrasada').forEach(i=>prio.push({sev:1,text:`Inspeção atrasada: ${i.protocol} — ${dSchoolName(i.schoolId)}`,page:'dies'}));
    irr.filter(r=>r.status==='Aberta').forEach(r=>prio.push({sev:2,text:`Irregularidade ainda não notificada: ${r.protocol} — ${dSchoolName(r.schoolId)}`,page:'diesIrreg'}));
    irr.filter(r=>r.status==='Em análise').forEach(r=>prio.push({sev:2,text:`Resposta da escola aguardando análise: ${r.protocol}`,page:'diesIrreg'}));
    docs.filter(d=>diesDocValidity(d)==='A vencer').forEach(d=>prio.push({sev:3,text:`Documento a vencer em ${formatDate(d.validityDate)}: ${d.title} — ${dSchoolName(d.schoolId)}`,page:'diesDocs'}));
    stats.filter(x=>x.st.needsInspection).forEach(x=>prio.push({sev:3,text:`Escola sem inspeção recente: ${x.s.name}`,page:'diesSchools'}));
    prio.sort((a,b)=>a.sev-b.sev);
    const recent=(state.auditLog||[]).filter(a=>a.module==='DIES').slice(0,8);
    const panel=(t,body)=>`<div class="card"><div class="card-title"><div><h3>${t}</h3></div></div>${body}</div>`;
    content.innerHTML=`${pageHeader('Painel do DIES','Resumo da regularidade da rede escolar, calculado com os registros do sistema.',dCan('create')?'<button class="btn-primary" id="dpNew"><i class="fa-solid fa-plus"></i> Nova inspeção</button>':'')}
      ${empty?'<div class="alert alert-info"><b>Nenhum registro do DIES ainda.</b> Os indicadores abaixo estão zerados. Comece cadastrando os documentos das escolas (menu “Documentos escolares”) ou agendando a primeira inspeção (menu “Inspeções”).</div>':''}
      <div class="stat-grid">
        ${statCard('Escolas cadastradas',state.schools.length,'fa-school')}
        ${statCard('Escolas regulares',lvl('Regular'),'fa-circle-check')}
        ${statCard('Escolas com pendências',lvl('Com pendências')+lvl('Irregular'),'fa-flag')}
        ${statCard('Escolas a inspecionar',stats.filter(x=>x.st.needsInspection).length,'fa-binoculars')}
        ${statCard('Inspeções agendadas',ic('Agendada'),'fa-calendar-check')}
        ${statCard('Inspeções realizadas',ic('Concluída'),'fa-clipboard-check')}
        ${statCard('Inspeções atrasadas',ic('Atrasada'),'fa-triangle-exclamation')}
        ${statCard('Notificações não lidas',diesUnread(),'fa-bell')}
        ${statCard('Documentos vencidos',dv('Vencido'),'fa-file-circle-xmark')}
        ${statCard('Documentos a vencer',dv('A vencer'),'fa-hourglass-half')}
        ${statCard('Irregularidades em aberto',irr.filter(diesOpenIrr).length,'fa-circle-exclamation')}
        ${statCard('Irregularidades resolvidas',irr.filter(r=>!diesOpenIrr(r)).length,'fa-check-double')}
      </div>
      <div class="dies-grid">
        ${panel('Pendências prioritárias',prio.length?`<div class="timeline">${prio.slice(0,8).map(p=>`<div><button class="small-button dp-go" data-page="${p.page}" title="Abrir"><i class="fa-solid fa-arrow-right"></i></button> ${dE(p.text)}</div>`).join('')}</div>`:'<p class="muted">Nenhuma pendência no momento.</p>')}
        ${panel('Atividades recentes',recent.length?`<div class="timeline">${recent.map(a=>`<div><b>${new Date(a.when).toLocaleString('pt-BR')}</b>${dE(a.action)} — ${dE(a.summary)}</div>`).join('')}</div>`:'<p class="muted">Nenhuma atividade do DIES registrada.</p>')}
        ${panel('Inspeções realizadas por mês',dBars(perMonth(insp.filter(i=>i.status==='Concluída'),'doneDate')))}
        ${panel('Irregularidades por categoria',dBars(DIES_IRR_CATS.map(c=>({label:c,value:irr.filter(r=>r.category===c).length}))))}
        ${panel('Situação de regularidade das escolas',dBars(['Regular','Com pendências','Irregular','Sem avaliação'].map(l=>({label:l,value:lvl(l)}))))}
        ${panel('Pendências por município',dBars(Object.entries(byCity).map(([label,value])=>({label,value}))))}
        ${panel('Irregularidades resolvidas por mês',dBars(perMonth(irr.filter(r=>r.resolvedDate),'resolvedDate')))}
        ${panel('Cumprimento dos prazos',dBars([{label:'Resolvidas no prazo',value:onTime},{label:'Resolvidas fora do prazo',value:late},{label:'Em aberto, no prazo',value:openOk},{label:'Em aberto, prazo vencido',value:overdueOpen}]))}
      </div>`;
    document.getElementById('dpNew')?.addEventListener('click',()=>openDiesInspEditor());
    document.querySelectorAll('.dp-go').forEach(b=>b.onclick=()=>navigate(b.dataset.page));
  }

  // ----- escolas -----
  function renderDiesSchools(){
    diesSync();
    const f=window.__dsf=window.__dsf||{q:'',city:'',net:'',level:''};
    const cities=[...new Set(state.schools.map(s=>s.city).filter(Boolean))].sort();
    content.innerHTML=`${pageHeader('Escolas','Instituições cadastradas no SIGED e situação de regularidade de cada uma.')}
      <div class="alert alert-info"><b>Como a regularidade é calculada:</b> <i>Irregular</i> = irregularidade em aberto com prazo vencido ou última inspeção concluída como “Irregular”; <i>Com pendências</i> = irregularidade em aberto, documento vencido/pendente ou última inspeção “Regular com pendências”; <i>Regular</i> = sem pendências e última inspeção concluída como “Regular”; <i>Sem avaliação</i> = nenhuma inspeção concluída e nenhuma pendência. Os prazos usados estão em “Checklist e prazos”.</div>
      <div class="table-card"><div style="display:flex;gap:10px;flex-wrap:wrap;padding:16px">
        <input id="dsQ" type="search" placeholder="Buscar por nome ou código (INEP)" value="${dE(f.q)}" style="flex:1;min-width:200px">
        <select id="dsCity">${optionsHtml(cities,f.city,'Todos os municípios')}</select>
        <select id="dsNet">${optionsHtml(['Pública','Privada'],f.net,'Todas as redes')}</select>
        <select id="dsLevel">${optionsHtml(['Regular','Com pendências','Irregular','Sem avaliação'],f.level,'Toda regularidade')}</select>
      </div><div id="dsTbl"></div></div>`;
    const draw=()=>{
      const q=f.q.trim().toLowerCase();
      const list=state.schools.map(s=>({s,st:diesSchoolStats(s.id)})).filter(x=>(!q||[x.s.name,x.s.fantasyName,x.s.inep].some(v=>String(v||'').toLowerCase().includes(q)))&&(!f.city||x.s.city===f.city)&&(!f.net||dNet(x.s)===f.net)&&(!f.level||x.st.level===f.level)).sort((a,b)=>a.s.name.localeCompare(b.s.name));
      const p=paginate(list,'dsch');
      document.getElementById('dsTbl').innerHTML=`<div class="table-wrap"><table><thead><tr><th>Escola</th><th>Código (INEP)</th><th>Município</th><th>Rede</th><th>Regularidade</th><th>Última inspeção</th><th>Próxima</th><th>Pendências</th><th>Ações</th></tr></thead><tbody>${p.slice.length?p.slice.map(x=>`<tr><td><strong>${dE(x.s.name)}</strong></td><td>${dE(x.s.inep||'—')}</td><td>${dE(x.s.city||'—')}${x.s.state?'/'+dE(x.s.state):''}</td><td>${dNet(x.s)}</td><td>${badge(x.st.level,DIES_BADGE)}</td><td>${x.st.last?formatDate(x.st.last.doneDate):'—'}</td><td>${x.st.next?formatDate(x.st.next.plannedDate):'—'}</td><td>${x.st.pendCount}</td><td><button class="small-button ds-view" data-id="${x.s.id}" title="Detalhes"><i class="fa-solid fa-eye"></i></button></td></tr>`).join(''):`<tr><td colspan="9"><div class="empty-state" style="border:none">${state.schools.length?'Nenhuma escola encontrada com esses filtros.':'Nenhuma escola cadastrada no SIGED.'}</div></td></tr>`}</tbody></table></div>${paginationHtml(p,'dsch')}`;
      bindPagination('dsch',draw);
      document.querySelectorAll('.ds-view').forEach(b=>b.onclick=()=>openDiesSchool(b.dataset.id));
    };
    document.getElementById('dsQ').oninput=e=>{f.q=e.target.value;dResetPg('dsch');draw();};
    document.getElementById('dsCity').onchange=e=>{f.city=e.target.value;dResetPg('dsch');draw();};
    document.getElementById('dsNet').onchange=e=>{f.net=e.target.value;dResetPg('dsch');draw();};
    document.getElementById('dsLevel').onchange=e=>{f.level=e.target.value;dResetPg('dsch');draw();};
    draw();
  }
  function dMiniTable(headers,rows,empty){return `<div class="table-card"><div class="table-wrap"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join(''):`<tr><td colspan="${headers.length}" class="muted">${empty}</td></tr>`}</tbody></table></div></div>`;}
  function openDiesSchool(id,tab='geral'){
    const s=dSchool(id);if(!s)return;const st=diesSchoolStats(id);
    const tabs=[['geral','Dados gerais'],['docs','Documentação'],['insp','Inspeções'],['irr','Irregularidades'],['hist','Histórico'],['rel','Relatórios']];
    let body='';
    if(tab==='geral'){
      body=`<div class="detail-grid">${dRow('Instituição',s.name)}${dRow('Código (INEP)',s.inep)}${dRow('CNPJ',s.cnpj)}${dRow('Endereço',[s.address,s.number,s.neighborhood].filter(Boolean).join(', '))}${dRow('Município/UF',[s.city,s.state].filter(Boolean).join('/'))}${dRow('Telefone',s.phone)}${dRow('E-mail',s.email)}${dRow('Diretor/responsável',[s.managerName,s.managerRole].filter(Boolean).join(' — '))}${dRow('Rede',`${dNet(s)}${s.dependency?' ('+s.dependency+')':''}`)}${dRow('Etapas e modalidades',(s.stagesOffered||[]).join('; '))}${dRow('Turnos',(s.shifts||[]).join(', '))}${dRow('Situação cadastral',s.operatingStatus)}${dRow('Última inspeção',st.last?formatDate(st.last.doneDate)+' — '+st.last.result:'')}${dRow('Próxima inspeção',st.next?formatDate(st.next.plannedDate):'')}${dRow('Pendências em aberto',String(st.pendCount))}</div>
        ${dSection('Situação de regularidade')}<p>${badge(st.level,DIES_BADGE)}</p>${st.reasons.length?`<ul style="padding-left:18px">${st.reasons.map(r=>`<li>${dE(r)}</li>`).join('')}</ul>`:'<p class="muted">Nenhuma pendência registrada.</p>'}
        <p class="muted">Autorizações de funcionamento: registre-as em “Documentos escolares” (categoria Ato autorizativo).</p>
        ${dCan('create')?'<div class="form-actions"><button class="btn-primary" id="dsSchInsp"><i class="fa-solid fa-calendar-plus"></i> Agendar inspeção</button></div>':''}`;
    }else if(tab==='docs'){
      body=`${dCan('create')?'<div class="form-actions" style="margin-top:0"><button class="btn-primary" id="dsSchDoc"><i class="fa-solid fa-plus"></i> Registrar documento</button></div>':''}`+dMiniTable(['Documento','Categoria','Validade','Situação'],st.docs.map(d=>[dE(d.title),dE(d.category),d.validityDate?formatDate(d.validityDate):'Sem validade',badge(d.status,DIES_BADGE)+' '+badge(diesDocValidity(d),DIES_BADGE)]),'Nenhum documento registrado para esta escola.');
    }else if(tab==='insp'){
      body=dMiniTable(['Protocolo','Tipo','Data prevista','Situação','Resultado'],st.insp.sort((a,b)=>b.plannedDate.localeCompare(a.plannedDate)).map(i=>[dE(i.protocol),dE(i.type),formatDate(i.plannedDate),badge(diesInspStatus(i),DIES_BADGE),dE(i.result||'—')]),'Nenhuma inspeção registrada para esta escola.');
    }else if(tab==='irr'){
      const l=(state.diesIrregularities||[]).filter(r=>r.schoolId===id);
      body=dMiniTable(['Protocolo','Categoria','Prazo','Situação'],l.map(r=>[dE(r.protocol),dE(r.category),r.deadline?formatDate(r.deadline):'—',badge(diesIrrLabel(r),DIES_BADGE)]),'Nenhuma irregularidade registrada para esta escola.');
    }else if(tab==='hist'){
      const ev=[];
      st.insp.forEach(i=>(i.history||[]).forEach(h=>ev.push({...h,ref:i.protocol})));
      (state.diesIrregularities||[]).filter(r=>r.schoolId===id).forEach(r=>(r.history||[]).forEach(h=>ev.push({...h,ref:r.protocol})));
      st.docs.forEach(d=>(d.history||[]).forEach(h=>ev.push({...h,ref:d.title})));
      ev.sort((a,b)=>b.at.localeCompare(a.at));
      body=ev.length?`<div class="timeline">${ev.map(h=>`<div><b>${new Date(h.at).toLocaleString('pt-BR')}</b>${dE(h.ref)} · ${dE(h.user||'')} — ${dE(h.text)}</div>`).join('')}</div>`:'<p class="muted">Sem histórico registrado.</p>';
    }else{
      body=`<p class="muted">Gere os relatórios desta escola (abre uma janela de impressão; escolha “Salvar como PDF”) ou baixe em CSV.</p><div class="form-actions" style="justify-content:flex-start;flex-wrap:wrap"><button class="btn-secondary dsr" data-r="regularidade" data-f="print"><i class="fa-solid fa-file-pdf"></i> Regularidade — PDF</button><button class="btn-secondary dsr" data-r="regularidade" data-f="csv"><i class="fa-solid fa-file-csv"></i> Regularidade — CSV</button><button class="btn-secondary dsr" data-r="historico" data-f="print"><i class="fa-solid fa-file-pdf"></i> Histórico de inspeções — PDF</button><button class="btn-secondary dsr" data-r="historico" data-f="csv"><i class="fa-solid fa-file-csv"></i> Histórico de inspeções — CSV</button></div>`;
    }
    openModal(s.name,`<div class="calendar-tabs">${tabs.map(t=>`<button type="button" class="calendar-tab ${t[0]===tab?'active':''}" data-tab="${t[0]}">${t[1]}</button>`).join('')}</div>${body}`);
    document.querySelectorAll('#modalBody .calendar-tab').forEach(b=>b.onclick=()=>openDiesSchool(id,b.dataset.tab));
    document.getElementById('dsSchInsp')?.addEventListener('click',()=>openDiesInspEditor({schoolId:id}));
    document.getElementById('dsSchDoc')?.addEventListener('click',()=>openDiesDocEditor(null,{schoolId:id}));
    document.querySelectorAll('#modalBody .dsr').forEach(b=>b.onclick=()=>diesOutputReport(b.dataset.r,{school:id},b.dataset.f));
  }

  // ----- impressão / PDF (abre janela de impressão do navegador; escolha "Salvar como PDF") -----
  function dPrintHtml(title,body){
    const w=window.open('','_blank');
    if(!w){showToast('Permita pop-ups do navegador para gerar o PDF.');return;}
    w.document.write(`<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><title>${dE(title)}</title><style>body{font-family:Arial,Helvetica,sans-serif;color:#1e293b;margin:32px;font-size:13px}.hd{border-bottom:3px solid #1d4ed8;padding-bottom:10px;margin-bottom:16px}.hd h1{margin:0;font-size:20px;color:#1d4ed8}.hd p{margin:2px 0;color:#475569}h2{font-size:16px;margin:18px 0 6px}table{width:100%;border-collapse:collapse;margin:8px 0}th,td{border:1px solid #cbd5e1;padding:6px 8px;text-align:left;vertical-align:top}th{background:#eff6ff}.meta td{border:none;padding:2px 8px 2px 0}.ft{margin-top:24px;color:#64748b;font-size:11px;border-top:1px solid #cbd5e1;padding-top:8px}@media print{body{margin:14mm}}</style></head><body>${body}<div class="ft">Documento gerado pelo SIGED — DIES em ${new Date().toLocaleString('pt-BR')} por ${dE(state.user||'')}. Contém dados do sistema; não substitui documento oficial emitido pelo órgão competente.</div><script>window.onload=function(){window.print()}<\/script></body></html>`);
    w.document.close();
  }
  function dDocHead(title,extra=''){return `<div class="hd"><h1>SIGED — Departamento de Inspeção Escolar (DIES)</h1><p><b>${dE(title)}</b></p><p>Emitido em ${new Date().toLocaleString('pt-BR')} por ${dE(state.user||'')}</p>${extra}</div>`;}
  function dPrintTable(headers,rows){return `<table><thead><tr>${headers.map(h=>`<th>${dE(h)}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.map(r=>`<tr>${r.map(c=>`<td>${dE(c)}</td>`).join('')}</tr>`).join(''):`<tr><td colspan="${headers.length}">Sem registros.</td></tr>`}</tbody></table>`;}

  // ----- checklist da inspeção -----
  function dSnapshot(i){
    const net=dNet(dSchool(i.schoolId));
    i.checklistItems=diesCfg().checklist.filter(c=>c.active).map(c=>({id:c.id,category:c.category,text:c.text,required:(c.requiredFor||[]).includes(net)}));
    i.answers=i.answers||{};
  }
  function dAns(i,it){return i.answers?.[it.id]?.answer||'Pendente de verificação';}
  function dCkSummary(i){
    const items=i.checklistItems||[];const cnt=x=>items.filter(it=>dAns(i,it)===x).length;
    return {total:items.length,conf:cnt('Conforme'),nc:cnt('Não conforme'),na:cnt('Não aplicável'),pend:cnt('Pendente de verificação'),reqPend:items.filter(it=>it.required&&dAns(i,it)==='Pendente de verificação').length};
  }
  function openDiesChecklist(id){
    const i=state.diesInspections.find(x=>x.id===id);if(!i)return;
    if(!i.checklistItems&&i.status==='Em andamento') dSnapshot(i);
    const items=i.checklistItems||[];
    if(!items.length) return showToast('Esta inspeção não possui itens de checklist (nenhum item ativo na configuração quando ela foi iniciada).');
    const editable=i.status==='Em andamento'&&dCan('edit');const dis=editable?'':'disabled';
    const sm=dCkSummary(i);
    const cats=[...new Set(items.map(x=>x.category))];
    openModal(`Checklist — ${i.protocol}`,`<form id="ckForm" novalidate>
      <div class="alert alert-info">${sm.total} itens · ${sm.conf} conforme(s) · ${sm.nc} não conforme(s) · ${sm.na} não aplicável(is) · ${sm.pend} pendente(s) de verificação${sm.reqPend?` · <b>${sm.reqPend} obrigatório(s) pendente(s)</b>`:''}</div>
      ${cats.map(c=>`${dSection(dE(c))}${items.filter(x=>x.category===c).map(it=>{const a=i.answers?.[it.id]||{};const ans=dAns(i,it);return `<div class="card" style="padding:12px;margin-bottom:8px" data-id="${it.id}"><div style="display:flex;gap:10px;justify-content:space-between;align-items:center;flex-wrap:wrap"><span>${dE(it.text)} ${it.required?'<span class="badge badge-red">obrigatório</span>':''}</span><select class="ck-a" data-id="${it.id}" ${dis}>${optionsHtml(DIES_ANSWERS,ans)}</select></div><div class="ck-nc ${ans==='Não conforme'?'':'hidden'}" style="margin-top:8px;display:grid;gap:6px"><textarea class="ck-d" rows="2" placeholder="Descrição da não conformidade *" ${dis}>${dE(a.desc||'')}</textarea><input class="ck-e" placeholder="Evidência (descrição ou referência)" value="${dE(a.evidence||'')}" ${dis}><input class="ck-m" placeholder="Providência necessária *" value="${dE(a.measure||'')}" ${dis}>${a.irrId?'<small class="muted">Irregularidade já registrada a partir deste item.</small>':''}</div></div>`;}).join('')}`).join('')}
      ${editable?'<div class="form-actions"><button class="btn-primary">Salvar checklist</button></div>':''}</form>`);
    document.querySelectorAll('#modalBody .ck-a').forEach(s=>s.onchange=()=>s.closest('.card').querySelector('.ck-nc').classList.toggle('hidden',s.value!=='Não conforme'));
    if(!editable) return;
    document.getElementById('ckForm').onsubmit=e=>{
      e.preventDefault();const next={};
      for(const it of items){
        const box=document.querySelector(`#modalBody .card[data-id="${it.id}"]`);const ans=box.querySelector('.ck-a').value;
        const rec={answer:ans,irrId:i.answers?.[it.id]?.irrId};
        if(ans==='Não conforme'){
          rec.desc=box.querySelector('.ck-d').value.trim();rec.evidence=box.querySelector('.ck-e').value.trim();rec.measure=box.querySelector('.ck-m').value.trim();
          if(!rec.desc||!rec.measure) return formError(`Item "${it.text}": informe a descrição e a providência necessária da não conformidade.`);
        }
        next[it.id]=rec;
      }
      i.answers=next;const s2=dCkSummary(i);dHist(i,`Checklist salvo (${s2.conf} conforme, ${s2.nc} não conforme, ${s2.pend} pendente).`);
      logAudit('DIES','Checklist',`${i.protocol} — ${s2.nc} não conformidade(s)`);save();closeModal();renderDiesInspections();showToast('Checklist salvo.');
    };
  }

  // ----- inspeções -----
  function renderDiesInspections(){
    if(!can('dies','view')) return renderAccessDenied('Inspeções');
    diesSync();state.diesInspections=state.diesInspections||[];
    const f=window.__dif=window.__dif||{q:'',school:'',status:'',type:'',view:'table',ym:dToday().slice(0,7)};
    const canCreate=dCan('create');
    content.innerHTML=`${pageHeader('Inspeções','Agende, execute e conclua inspeções escolares.',`<button class="btn-secondary" id="diView">${f.view==='table'?'<i class="fa-solid fa-calendar"></i> Ver calendário':'<i class="fa-solid fa-table"></i> Ver tabela'}</button>${canCreate?'<button class="btn-primary" id="diNew"><i class="fa-solid fa-plus"></i> Nova inspeção</button>':''}`)}
      <div class="table-card"><div style="display:flex;gap:10px;flex-wrap:wrap;padding:16px">
        <input id="diQ" type="search" placeholder="Buscar por protocolo, inspetor ou objetivo" value="${dE(f.q)}" style="flex:1;min-width:200px">
        <select id="diSchool"><option value="">Todas as escolas</option>${schoolOptions(f.school)}</select>
        <select id="diType">${optionsHtml(DIES_TYPES,f.type,'Todos os tipos')}</select>
        <select id="diStatus">${optionsHtml(['Agendada','Em andamento','Concluída','Cancelada','Atrasada'],f.status,'Todas as situações')}</select>
      </div><div id="diTbl"></div></div>`;
    const filtered=()=>{const q=f.q.trim().toLowerCase();return state.diesInspections.filter(i=>(!f.status||diesInspStatus(i)===f.status)&&(!f.school||i.schoolId===f.school)&&(!f.type||i.type===f.type)&&(!q||(i.protocol+' '+(i.inspector||'')+' '+(i.objective||'')).toLowerCase().includes(q))).sort((a,b)=>b.plannedDate.localeCompare(a.plannedDate));};
    const draw=()=>{
      const list=filtered();const box=document.getElementById('diTbl');
      if(f.view==='calendar'){
        const [y,m]=f.ym.split('-').map(Number);const first=new Date(y,m-1,1),days=new Date(y,m,0).getDate();
        const cells=[];for(let k=0;k<first.getDay();k++)cells.push('<div class="dies-cal-c off"></div>');
        for(let d=1;d<=days;d++){const date=`${f.ym}-${String(d).padStart(2,'0')}`;const its=list.filter(i=>i.plannedDate===date);cells.push(`<div class="dies-cal-c"><b>${d}</b>${its.map(i=>`<button type="button" class="dies-cal-i di-view" data-id="${i.id}" title="${dE(dSchoolName(i.schoolId))}">${dE(i.protocol.slice(-6))} · ${dE(dSchoolName(i.schoolId))}</button>`).join('')}</div>`);}
        box.innerHTML=`<div style="display:flex;gap:10px;align-items:center;justify-content:center;padding:6px"><button class="small-button" id="calPrev"><i class="fa-solid fa-chevron-left"></i></button><strong>${new Date(y,m-1,1).toLocaleDateString('pt-BR',{month:'long',year:'numeric'})}</strong><button class="small-button" id="calNext"><i class="fa-solid fa-chevron-right"></i></button></div><div class="dies-cal">${['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(x=>`<div class="dies-cal-h">${x}</div>`).join('')}${cells.join('')}</div>`;
        const shift=n=>{const d=new Date(y,m-1+n,1);f.ym=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;draw();};
        document.getElementById('calPrev').onclick=()=>shift(-1);document.getElementById('calNext').onclick=()=>shift(1);
      }else{
        const p=paginate(list,'dins'),canEdit=dCan('edit');
        box.innerHTML=`<div class="table-wrap"><table><thead><tr><th>Protocolo</th><th>Escola</th><th>Tipo</th><th>Data prevista</th><th>Inspetor</th><th>Situação</th><th>Resultado</th><th>Ações</th></tr></thead><tbody>${p.slice.length?p.slice.map(i=>{const st=diesInspStatus(i);return `<tr><td>${dE(i.protocol)}</td><td>${dE(dSchoolName(i.schoolId))}</td><td>${dE(i.type)}</td><td>${formatDate(i.plannedDate)}</td><td>${dE(i.inspector||'—')}</td><td>${badge(st,DIES_BADGE)}</td><td>${dE(i.result||'—')}</td><td><button class="small-button di-view" data-id="${i.id}" title="Detalhes"><i class="fa-solid fa-eye"></i></button>${['Em andamento','Concluída'].includes(i.status)?`<button class="small-button di-ck" data-id="${i.id}" title="Checklist"><i class="fa-solid fa-list-check"></i></button>`:''}${canEdit&&i.status==='Agendada'?`<button class="small-button di-start" data-id="${i.id}" title="Iniciar"><i class="fa-solid fa-play"></i></button>`:''}${canEdit&&i.status==='Em andamento'?`<button class="small-button di-done" data-id="${i.id}" title="Concluir"><i class="fa-solid fa-flag-checkered"></i></button>`:''}${canEdit&&['Agendada','Em andamento'].includes(i.status)?`<button class="small-button di-resched" data-id="${i.id}" title="Reagendar"><i class="fa-solid fa-calendar-day"></i></button><button class="small-button di-cancel" data-id="${i.id}" title="Cancelar"><i class="fa-solid fa-ban"></i></button>`:''}${i.status==='Concluída'?`<button class="small-button di-print" data-id="${i.id}" title="Relatório da inspeção (PDF)"><i class="fa-solid fa-file-pdf"></i></button>`:''}</td></tr>`;}).join(''):`<tr><td colspan="8"><div class="empty-state" style="border:none">${state.diesInspections.length?'Nenhuma inspeção encontrada com esses filtros.':'Nenhuma inspeção registrada ainda. '+(canCreate?'Clique em “Nova inspeção” para agendar a primeira.':'')}</div></td></tr>`}</tbody></table></div>${paginationHtml(p,'dins')}`;
        bindPagination('dins',draw);
        box.querySelectorAll('.di-ck').forEach(b=>b.onclick=()=>openDiesChecklist(b.dataset.id));
        box.querySelectorAll('.di-start').forEach(b=>b.onclick=()=>diesStart(b.dataset.id));
        box.querySelectorAll('.di-done').forEach(b=>b.onclick=()=>diesConclude(b.dataset.id));
        box.querySelectorAll('.di-resched').forEach(b=>b.onclick=()=>diesReschedule(b.dataset.id));
        box.querySelectorAll('.di-cancel').forEach(b=>b.onclick=()=>diesCancelInsp(b.dataset.id));
        box.querySelectorAll('.di-print').forEach(b=>b.onclick=()=>diesPrintInspection(b.dataset.id));
      }
      box.querySelectorAll('.di-view').forEach(b=>b.onclick=()=>openDiesInspView(b.dataset.id));
    };
    document.getElementById('diQ').oninput=e=>{f.q=e.target.value;dResetPg('dins');draw();};
    document.getElementById('diSchool').onchange=e=>{f.school=e.target.value;dResetPg('dins');draw();};
    document.getElementById('diType').onchange=e=>{f.type=e.target.value;dResetPg('dins');draw();};
    document.getElementById('diStatus').onchange=e=>{f.status=e.target.value;dResetPg('dins');draw();};
    document.getElementById('diView').onclick=()=>{f.view=f.view==='table'?'calendar':'table';renderDiesInspections();};
    document.getElementById('diNew')?.addEventListener('click',()=>openDiesInspEditor());
    draw();
  }
  function dRerenderCurrent(){const active=document.querySelector('.menu-item.active')?.dataset.page;if(active)navigate(active);}
  function openDiesInspEditor(pre={}){
    if(!dCan('create')) return denyToast('create');
    if(!state.schools.length) return showToast('Não há escolas cadastradas para inspecionar.');
    openModal('Nova inspeção',`<form id="diesForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid">
      <div class="full"><label>Escola *</label><select id="dsSchool">${schoolOptions(pre.schoolId||'')}</select></div>
      <div><label>Tipo *</label><select id="dsType">${optionsHtml(pre.type?[pre.type,...DIES_TYPES.filter(t=>t!==pre.type)]:DIES_TYPES,pre.type||'')}</select></div>
      <div><label>Data prevista *</label><input id="dsDate" type="date" min="${dToday()}"></div>
      <div class="full"><label>Inspetor responsável *</label><input id="dsInspector" value="${dE(state.user||'')}"></div>
      <div class="full"><label>Objetivo *</label><textarea id="dsObjective" rows="3">${dE(pre.objective||'')}</textarea></div>
      <div class="full"><label>Descrição / observações</label><textarea id="dsDesc" rows="2"></textarea></div></div>
      <div class="form-actions"><button class="btn-primary">Agendar inspeção</button></div></form>`);
    document.getElementById('diesForm').onsubmit=e=>{
      e.preventDefault();const v=id=>document.getElementById(id).value.trim();
      if(!v('dsDate')) return formError('Informe a data prevista.');
      if(v('dsDate')<dToday()) return formError('A data prevista não pode estar no passado.');
      if(!v('dsInspector')) return formError('Informe o inspetor responsável.');
      if(!v('dsObjective')) return formError('Informe o objetivo da inspeção.');
      const i={id:crypto.randomUUID(),protocol:nextProtocol('INS','diesInspections'),schoolId:v('dsSchool'),type:v('dsType'),plannedDate:v('dsDate'),inspector:v('dsInspector'),objective:v('dsObjective'),description:v('dsDesc'),status:'Agendada',createdBy:state.user,createdAt:new Date().toISOString(),history:[]};
      dHist(i,'Inspeção agendada.');state.diesInspections.push(i);logAudit('DIES','Agendamento',`${i.protocol} — ${i.type} — ${dSchoolName(i.schoolId)}`);save();closeModal();dRerenderCurrent();showToast(`Inspeção ${i.protocol} agendada.`);
    };
  }
  function diesStart(id){
    if(!dCan('edit')) return denyToast('edit');
    const i=state.diesInspections.find(x=>x.id===id);if(!i)return;
    confirmAction('Iniciar inspeção',`Iniciar a inspeção ${dE(i.protocol)}? O checklist será montado com os itens ativos na configuração atual.`,()=>{
      dSnapshot(i);i.status='Em andamento';i.startedAt=new Date().toISOString();dHist(i,`Inspeção iniciada (checklist com ${i.checklistItems.length} itens).`);logAudit('DIES','Início',i.protocol);save();dRerenderCurrent();
    },'Iniciar');
  }
  function diesReschedule(id){
    if(!dCan('edit')) return denyToast('edit');
    const i=state.diesInspections.find(x=>x.id===id);if(!i)return;
    openModal(`Reagendar ${i.protocol}`,`<form id="rsForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid"><div><label>Nova data *</label><input id="rsDate" type="date" min="${dToday()}"></div><div class="full"><label>Justificativa *</label><textarea id="rsWhy" rows="3"></textarea></div></div><div class="form-actions"><button class="btn-primary">Reagendar</button></div></form>`);
    document.getElementById('rsForm').onsubmit=e=>{
      e.preventDefault();const d=document.getElementById('rsDate').value,w=document.getElementById('rsWhy').value.trim();
      if(!d||d<dToday()) return formError('Informe uma nova data que não esteja no passado.');
      if(!w) return formError('Informe a justificativa do reagendamento.');
      const old=i.plannedDate;i.plannedDate=d;i.rescheduled=(i.rescheduled||0)+1;dHist(i,`Reagendada de ${formatDate(old)} para ${formatDate(d)}: ${w}`);logAudit('DIES','Reagendamento',`${i.protocol}: ${formatDate(old)} → ${formatDate(d)} — ${w}`);save();closeModal();dRerenderCurrent();showToast('Inspeção reagendada.');
    };
  }
  function diesConclude(id){
    if(!dCan('edit')) return denyToast('edit');
    const i=state.diesInspections.find(x=>x.id===id);if(!i)return;
    if(!i.checklistItems) dSnapshot(i);
    const sm=dCkSummary(i);const ncNoIrr=(i.checklistItems||[]).filter(it=>dAns(i,it)==='Não conforme'&&!i.answers[it.id]?.irrId);
    openModal(`Concluir ${i.protocol}`,`<form id="diesDone" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="alert alert-info">Checklist: ${sm.conf} conforme(s), ${sm.nc} não conforme(s), ${sm.na} não aplicável(is), ${sm.pend} pendente(s).${sm.reqPend?` <b>${sm.reqPend} item(ns) obrigatório(s) ainda pendente(s).</b>`:''}</div><div class="form-grid">
      <div><label>Data de realização *</label><input id="dcDate" type="date" max="${dToday()}" value="${dToday()}"></div>
      <div><label>Resultado *</label><select id="dcResult">${optionsHtml(DIES_RESULTS,'','Selecione')}</select></div>
      <div class="full"><label>Parecer / relatório final *</label><textarea id="dcNotes" rows="4"></textarea></div>
      ${ncNoIrr.length?`<div class="full"><label><input type="checkbox" id="dcIrr" checked style="width:auto"> Registrar as ${ncNoIrr.length} não conformidade(s) como irregularidade(s) em aberto (você define a providência e o prazo ao notificar a escola)</label></div>`:''}</div>
      <div class="form-actions"><button class="btn-primary">Concluir inspeção</button></div></form>`);
    document.getElementById('diesDone').onsubmit=e=>{
      e.preventDefault();
      const date=document.getElementById('dcDate').value,res=document.getElementById('dcResult').value,notes=document.getElementById('dcNotes').value.trim();
      if(sm.reqPend) return formError(`Há ${sm.reqPend} item(ns) obrigatório(s) do checklist pendente(s) de verificação. Conclua o checklist antes de finalizar.`);
      if(!date) return formError('Informe a data de realização.');
      if(!res) return formError('Registre o resultado para concluir a inspeção.');
      if(sm.nc>0&&res==='Regular') return formError('Existem itens não conformes no checklist: o resultado não pode ser "Regular".');
      if(!notes) return formError('Registre o parecer para concluir a inspeção.');
      let created=0;
      if(document.getElementById('dcIrr')?.checked){
        ncNoIrr.forEach(it=>{
          const a=i.answers[it.id];state.diesIrregularities=state.diesIrregularities||[];
          const r={id:crypto.randomUUID(),protocol:nextProtocol('IRR','diesIrregularities'),schoolId:i.schoolId,inspectionId:i.id,category:it.category,description:`${it.text}: ${a.desc}`,identifiedDate:date,createdBy:state.user,evidence:[],evidenceNotes:a.evidence||'',measure:a.measure||'',deadline:'',owner:'',status:'Aberta',history:[]};
          dHist(r,`Registrada a partir da inspeção ${i.protocol}.`);state.diesIrregularities.push(r);a.irrId=r.id;created++;
        });
      }
      i.status='Concluída';i.doneDate=date;i.result=res;i.notes=notes;i.concludedBy=state.user;
      dHist(i,`Inspeção concluída: ${res}.${created?` ${created} irregularidade(s) registrada(s).`:''}`);
      logAudit('DIES','Conclusão',`${i.protocol} — ${res}${created?` (+${created} irregularidade(s))`:''}`);save();closeModal();dRerenderCurrent();showToast('Inspeção concluída.');
    };
  }
  function diesCancelInsp(id){
    if(!dCan('edit')) return denyToast('edit');
    const i=state.diesInspections.find(x=>x.id===id);if(!i)return;
    openModal(`Cancelar ${i.protocol}`,`<form id="dxForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid"><div class="full"><label>Justificativa *</label><textarea id="dxWhy" rows="3"></textarea></div></div><div class="form-actions"><button class="btn-primary">Cancelar inspeção</button></div></form>`);
    document.getElementById('dxForm').onsubmit=e=>{
      e.preventDefault();const why=document.getElementById('dxWhy').value.trim();
      if(!why) return formError('Informe a justificativa do cancelamento.');
      i.status='Cancelada';i.cancelReason=why;dHist(i,`Inspeção cancelada: ${why}`);logAudit('DIES','Cancelamento',`${i.protocol} — ${why}`);save();closeModal();dRerenderCurrent();showToast('Inspeção cancelada.');
    };
  }
  function openDiesInspView(id){
    const i=state.diesInspections.find(x=>x.id===id);if(!i)return;
    const sm=dCkSummary(i),irr=(state.diesIrregularities||[]).filter(r=>r.inspectionId===id);
    openModal(`Inspeção ${i.protocol}`,`<div class="detail-grid">${dRow('Escola',dSchoolName(i.schoolId))}${dRow('Tipo',i.type)}${dRow('Data prevista',formatDate(i.plannedDate))}${dRow('Situação',diesInspStatus(i))}${dRow('Inspetor',i.inspector)}${dRow('Realizada em',i.doneDate?formatDate(i.doneDate):'')}${dRow('Resultado',i.result)}${dRow('Reagendamentos',String(i.rescheduled||0))}</div>
      ${dSection('Objetivo')}<p>${dE(i.objective)}</p>${i.description?`${dSection('Descrição')}<p>${dE(i.description)}</p>`:''}
      ${i.checklistItems?`${dSection('Checklist')}<p>${sm.conf} conforme(s) · ${sm.nc} não conforme(s) · ${sm.na} não aplicável(is) · ${sm.pend} pendente(s)</p>`:''}
      ${i.notes?`${dSection('Parecer / relatório final')}<p>${dE(i.notes)}</p>`:''}${i.cancelReason?`${dSection('Justificativa do cancelamento')}<p>${dE(i.cancelReason)}</p>`:''}
      ${irr.length?`${dSection('Irregularidades vinculadas')}<p>${irr.map(r=>`${dE(r.protocol)} (${dE(diesIrrLabel(r))})`).join(', ')}</p>`:''}
      ${dSection('Histórico')}${dHistHtml(i)}`);
  }
  function diesPrintInspection(id){
    const i=state.diesInspections.find(x=>x.id===id);if(!i)return;const s=dSchool(i.schoolId)||{};const sm=dCkSummary(i);
    const irr=(state.diesIrregularities||[]).filter(r=>r.inspectionId===id);
    const ncRows=(i.checklistItems||[]).filter(it=>dAns(i,it)==='Não conforme').map(it=>[it.category,it.text,i.answers[it.id].desc||'',i.answers[it.id].measure||'']);
    dPrintHtml(`Relatório de inspeção ${i.protocol}`,`${dDocHead('Relatório de inspeção escolar — '+i.protocol)}
      <table class="meta"><tr><td><b>Escola</b></td><td>${dE(s.name||'')}</td><td><b>INEP</b></td><td>${dE(s.inep||'—')}</td></tr><tr><td><b>Município</b></td><td>${dE(s.city||'—')}</td><td><b>Rede</b></td><td>${dNet(s)}</td></tr><tr><td><b>Tipo</b></td><td>${dE(i.type)}</td><td><b>Inspetor</b></td><td>${dE(i.inspector||'')}</td></tr><tr><td><b>Data prevista</b></td><td>${formatDate(i.plannedDate)}</td><td><b>Realizada em</b></td><td>${i.doneDate?formatDate(i.doneDate):'—'}</td></tr><tr><td><b>Resultado</b></td><td colspan="3">${dE(i.result||'—')}</td></tr></table>
      <h2>Objetivo</h2><p>${dE(i.objective)}</p><h2>Parecer / relatório final</h2><p>${dE(i.notes||'—')}</p>
      <h2>Resumo do checklist</h2><p>${sm.total} itens: ${sm.conf} conforme(s), ${sm.nc} não conforme(s), ${sm.na} não aplicável(is), ${sm.pend} pendente(s) de verificação.</p>
      <h2>Não conformidades</h2>${dPrintTable(['Categoria','Item','Descrição','Providência necessária'],ncRows)}
      <h2>Irregularidades registradas</h2>${dPrintTable(['Protocolo','Categoria','Situação','Prazo'],irr.map(r=>[r.protocol,r.category,diesIrrLabel(r),r.deadline?formatDate(r.deadline):'—']))}
      <h2>Histórico da inspeção</h2>${dPrintTable(['Data','Usuário','Registro'],(i.history||[]).map(h=>[new Date(h.at).toLocaleString('pt-BR'),h.user||'',h.text]))}`);
    logAudit('DIES','Relatório',`Relatório da inspeção ${i.protocol} gerado`);save();
  }

  // ----- irregularidades -----
  const DIES_IRR_STATUS=['Aberta','Notificada','Aguardando correção','Em análise','Resolvida','Encerrada'];
  function renderDiesIrregularities(){
    if(!can('dies','view')) return renderAccessDenied('Irregularidades');
    diesSync();state.diesIrregularities=state.diesIrregularities||[];
    const f=window.__dirf=window.__dirf||{q:'',school:'',status:'',cat:''};
    content.innerHTML=`${pageHeader('Irregularidades','Registre problemas identificados e acompanhe as providências até a resolução. Nada é excluído: o histórico é preservado.',dCan('create')?'<button class="btn-primary" id="irNew"><i class="fa-solid fa-plus"></i> Nova irregularidade</button>':'')}
      <div class="table-card"><div style="display:flex;gap:10px;flex-wrap:wrap;padding:16px">
        <input id="irQ" type="search" placeholder="Buscar por protocolo ou descrição" value="${dE(f.q)}" style="flex:1;min-width:200px">
        <select id="irSchool"><option value="">Todas as escolas</option>${schoolOptions(f.school)}</select>
        <select id="irCat">${optionsHtml(DIES_IRR_CATS,f.cat,'Todas as categorias')}</select>
        <select id="irStatus">${optionsHtml([...DIES_IRR_STATUS,'Prazo vencido'],f.status,'Todas as situações')}</select>
      </div><div id="irTbl"></div></div>`;
    const draw=()=>{
      const q=f.q.trim().toLowerCase();
      const list=state.diesIrregularities.filter(r=>(!f.school||r.schoolId===f.school)&&(!f.cat||r.category===f.cat)&&(!f.status||(f.status==='Prazo vencido'?diesIrrOverdue(r):r.status===f.status))&&(!q||(r.protocol+' '+r.description).toLowerCase().includes(q))).sort((a,b)=>b.identifiedDate.localeCompare(a.identifiedDate));
      const p=paginate(list,'dirr');
      document.getElementById('irTbl').innerHTML=`<div class="table-wrap"><table><thead><tr><th>Protocolo</th><th>Escola</th><th>Categoria</th><th>Identificada em</th><th>Prazo</th><th>Acompanhamento</th><th>Situação</th><th>Ações</th></tr></thead><tbody>${p.slice.length?p.slice.map(r=>`<tr><td>${dE(r.protocol)}</td><td>${dE(dSchoolName(r.schoolId))}</td><td>${dE(r.category)}</td><td>${formatDate(r.identifiedDate)}</td><td>${r.deadline?formatDate(r.deadline):'—'}</td><td>${dE(r.owner||'—')}</td><td>${badge(diesIrrLabel(r),DIES_BADGE)}</td><td><button class="small-button ir-view" data-id="${r.id}" title="Abrir"><i class="fa-solid fa-eye"></i></button></td></tr>`).join(''):`<tr><td colspan="8"><div class="empty-state" style="border:none">${state.diesIrregularities.length?'Nenhuma irregularidade encontrada com esses filtros.':'Nenhuma irregularidade registrada.'}</div></td></tr>`}</tbody></table></div>${paginationHtml(p,'dirr')}`;
      bindPagination('dirr',draw);
      document.querySelectorAll('.ir-view').forEach(b=>b.onclick=()=>openDiesIrrView(b.dataset.id));
    };
    document.getElementById('irQ').oninput=e=>{f.q=e.target.value;dResetPg('dirr');draw();};
    document.getElementById('irSchool').onchange=e=>{f.school=e.target.value;dResetPg('dirr');draw();};
    document.getElementById('irCat').onchange=e=>{f.cat=e.target.value;dResetPg('dirr');draw();};
    document.getElementById('irStatus').onchange=e=>{f.status=e.target.value;dResetPg('dirr');draw();};
    document.getElementById('irNew')?.addEventListener('click',()=>openDiesIrrEditor());
    draw();
  }
  function openDiesIrrEditor(pre={}){
    if(!dCan('create')) return denyToast('create');
    if(!state.schools.length) return showToast('Não há escolas cadastradas.');
    openModal('Nova irregularidade',`<form id="irForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid">
      <div class="full"><label>Escola *</label><select id="irfSchool">${schoolOptions(pre.schoolId||'')}</select></div>
      <div><label>Categoria *</label><select id="irfCat">${optionsHtml(DIES_IRR_CATS,pre.category||'')}</select></div>
      <div><label>Data de identificação *</label><input id="irfDate" type="date" max="${dToday()}" value="${dToday()}"></div>
      <div class="full"><label>Descrição detalhada *</label><textarea id="irfDesc" rows="4">${dE(pre.description||'')}</textarea></div>
      <div class="full"><label>Evidências (descrição ou referência)</label><input id="irfEv"></div>
      ${dAttachField('irfFiles','Evidências anexadas (PDF, PNG ou JPG, até 2 MB cada)')}</div>
      <div class="form-actions"><button class="btn-primary">Registrar irregularidade</button></div></form>`);
    document.getElementById('irForm').onsubmit=async e=>{
      e.preventDefault();const v=id=>document.getElementById(id).value.trim();
      if(!v('irfDate')) return formError('Informe a data de identificação.');
      if(v('irfDesc').length<10) return formError('Descreva a irregularidade com mais detalhes (mínimo de 10 caracteres).');
      let files;try{files=await dReadFiles('irfFiles');}catch(err){return formError(err.message);}
      state.diesIrregularities=state.diesIrregularities||[];
      const r={id:crypto.randomUUID(),protocol:nextProtocol('IRR','diesIrregularities'),schoolId:v('irfSchool'),inspectionId:pre.inspectionId||null,category:v('irfCat'),description:v('irfDesc'),identifiedDate:v('irfDate'),createdBy:state.user,evidence:files,evidenceNotes:v('irfEv'),measure:'',deadline:'',owner:'',status:'Aberta',history:[]};
      dHist(r,'Irregularidade registrada.');state.diesIrregularities.push(r);logAudit('DIES','Irregularidade',`${r.protocol} registrada — ${dSchoolName(r.schoolId)}`);save();closeModal();dRerenderCurrent();showToast(`Irregularidade ${r.protocol} registrada.`);
    };
  }
  function diesIrrChange(r,to,text){const from=r.status;r.status=to;dHist(r,`${from} → ${to}. ${text}`);logAudit('DIES','Irregularidade',`${r.protocol}: ${from} → ${to}`);}
  function dIrrAfter(r){save();closeModal();dRerenderCurrent();openDiesIrrView(r.id);}
  function openDiesIrrView(id){
    const r=(state.diesIrregularities||[]).find(x=>x.id===id);if(!r)return;
    const insp=r.inspectionId?state.diesInspections.find(i=>i.id===r.inspectionId):null;const ed=dCan('edit');const o=diesOpenIrr(r);
    const btns=[];
    if(ed&&r.status==='Aberta') btns.push(['notify','fa-paper-plane','Notificar escola']);
    if(ed&&r.status==='Notificada') btns.push(['wait','fa-hourglass-half','Marcar aguardando correção']);
    if(ed&&['Notificada','Aguardando correção'].includes(r.status)) btns.push(['respond','fa-reply','Registrar resposta da escola']);
    if(ed&&r.status==='Em análise') btns.push(['review','fa-clipboard-check','Analisar resposta']);
    if(ed&&r.status==='Resolvida'&&dCan('approve')) btns.push(['close','fa-lock','Encerrar']);
    if(ed&&o&&r.deadline) btns.push(['deadline','fa-calendar-day','Alterar prazo']);
    openModal(`Irregularidade ${r.protocol}`,`<div class="detail-grid">${dRow('Escola',dSchoolName(r.schoolId))}${dRow('Categoria',r.category)}${dRow('Situação',diesIrrLabel(r))}${dRow('Identificada em',formatDate(r.identifiedDate))}${dRow('Registrada por',r.createdBy)}${dRow('Inspeção de origem',insp?insp.protocol:'')}${dRow('Prazo',r.deadline?formatDate(r.deadline):'')}${dRow('Acompanhamento',r.owner)}${dRow('Resolvida em',r.resolvedDate?formatDate(r.resolvedDate):'')}</div>
      ${dSection('Descrição')}<p>${dE(r.description)}</p>${r.evidenceNotes?`<p><b>Evidências:</b> ${dE(r.evidenceNotes)}</p>`:''}${dAttachList(r.evidence)}
      ${r.measure?`${dSection('Providência solicitada')}<p>${dE(r.measure)}</p>`:''}
      ${r.schoolResponse?`${dSection('Resposta da escola')}<p>${dE(r.schoolResponse)}</p>${dAttachList(r.responseFiles)}`:''}
      ${r.opinion?`${dSection('Parecer do inspetor')}<p>${dE(r.opinion)}</p>`:''}${r.closeReason?`${dSection('Justificativa do encerramento')}<p>${dE(r.closeReason)}</p>`:''}
      ${btns.length?`<div class="form-actions" style="justify-content:flex-start;flex-wrap:wrap">${btns.map(b=>`<button class="btn-secondary ir-act" data-a="${b[0]}"><i class="fa-solid ${b[1]}"></i> ${b[2]}</button>`).join('')}</div>`:''}
      ${dSection('Histórico')}${dHistHtml(r)}`);
    document.querySelectorAll('#modalBody .ir-act').forEach(b=>b.onclick=()=>diesIrrAction(r.id,b.dataset.a));
  }
  function diesIrrAction(id,a){
    const r=state.diesIrregularities.find(x=>x.id===id);if(!r)return;
    const form=(title,fields,btn)=>openModal(`${title} — ${r.protocol}`,`<form id="iaForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid">${fields}</div><div class="form-actions"><button class="btn-primary">${btn}</button></div></form>`);
    const val=i=>document.getElementById(i)?.value.trim();
    if(a==='wait'){
      return confirmAction('Aguardando correção','Confirmar que a escola está no prazo para corrigir a irregularidade?',()=>{diesIrrChange(r,'Aguardando correção','Escola em prazo de correção.');dIrrAfter(r);});
    }
    if(a==='notify'){
      form('Notificar escola',`<div class="full"><label>Providência solicitada *</label><textarea id="iaMeasure" rows="3">${dE(r.measure||'')}</textarea></div><div><label>Prazo para regularização *</label><input id="iaDeadline" type="date" min="${dToday()}" value="${dAdd(dToday(),diesCfg().deadlineDays)}"></div><div><label>Responsável pelo acompanhamento *</label><input id="iaOwner" value="${dE(state.user||'')}"></div>`,'Notificar escola');
      document.getElementById('iaForm').onsubmit=e=>{
        e.preventDefault();
        if(!val('iaMeasure')) return formError('Informe a providência solicitada.');
        if(!val('iaDeadline')||val('iaDeadline')<dToday()) return formError('Informe um prazo que não esteja no passado.');
        if(!val('iaOwner')) return formError('Informe o responsável pelo acompanhamento.');
        r.measure=val('iaMeasure');r.deadline=val('iaDeadline');r.owner=val('iaOwner');
        state.notifications=state.notifications||[];
        state.notifications.unshift({id:crypto.randomUUID(),schoolId:r.schoolId,type:'DIES',text:`DIES: irregularidade ${r.protocol} — providência até ${formatDate(r.deadline)}: ${r.measure}`,studentId:null,date:new Date().toISOString(),read:false});
        diesIrrChange(r,'Notificada',`Escola notificada (notificação interna do SIGED). Prazo: ${formatDate(r.deadline)}.`);dIrrAfter(r);showToast('Escola notificada no SIGED.');
      };
    }
    if(a==='respond'){
      form('Resposta da escola',`<div class="full"><label>Resposta / providências adotadas pela escola *</label><textarea id="iaResp" rows="4"></textarea></div>${dAttachField('iaFiles','Documentos apresentados (PDF, PNG ou JPG, até 2 MB cada)')}`,'Registrar resposta');
      document.getElementById('iaForm').onsubmit=async e=>{
        e.preventDefault();if(!val('iaResp')) return formError('Registre a resposta da escola.');
        let files;try{files=await dReadFiles('iaFiles');}catch(err){return formError(err.message);}
        r.schoolResponse=val('iaResp');r.responseFiles=[...(r.responseFiles||[]),...files];r.responseAt=new Date().toISOString();
        diesIrrChange(r,'Em análise',`Resposta da escola registrada${files.length?` com ${files.length} anexo(s)`:''}.`);dIrrAfter(r);
      };
    }
    if(a==='review'){
      form('Analisar resposta',`<div class="full"><label>Decisão *</label><select id="iaDec">${optionsHtml(['Resolvida','Devolver para nova correção'],'','Selecione')}</select></div><div class="full"><label>Parecer do inspetor *</label><textarea id="iaOp" rows="4"></textarea></div>`,'Registrar análise');
      document.getElementById('iaForm').onsubmit=e=>{
        e.preventDefault();if(!val('iaDec')) return formError('Selecione a decisão.');if(!val('iaOp')) return formError('Registre o parecer do inspetor.');
        r.opinion=val('iaOp');
        if(val('iaDec')==='Resolvida'){r.resolvedDate=dToday();diesIrrChange(r,'Resolvida',`Parecer: ${r.opinion}`);}
        else diesIrrChange(r,'Aguardando correção',`Resposta não aceita. Parecer: ${r.opinion}`);
        dIrrAfter(r);
      };
    }
    if(a==='close'){
      if(!dCan('approve')) return denyToast('approve');
      form('Encerrar irregularidade',`<div class="full"><label>Justificativa do encerramento *</label><textarea id="iaWhy" rows="3"></textarea></div>`,'Encerrar');
      document.getElementById('iaForm').onsubmit=e=>{e.preventDefault();if(!val('iaWhy')) return formError('Informe a justificativa do encerramento.');r.closeReason=val('iaWhy');r.closedDate=dToday();r.closedBy=state.user;diesIrrChange(r,'Encerrada',`Encerrada: ${r.closeReason}`);dIrrAfter(r);};
    }
    if(a==='deadline'){
      form('Alterar prazo',`<div><label>Novo prazo *</label><input id="iaDl" type="date" min="${dToday()}"></div><div class="full"><label>Justificativa *</label><textarea id="iaWhy" rows="3"></textarea></div>`,'Alterar prazo');
      document.getElementById('iaForm').onsubmit=e=>{
        e.preventDefault();if(!val('iaDl')||val('iaDl')<dToday()) return formError('Informe um prazo que não esteja no passado.');if(!val('iaWhy')) return formError('Informe a justificativa.');
        const old=r.deadline;r.deadline=val('iaDl');dHist(r,`Prazo alterado de ${formatDate(old)} para ${formatDate(r.deadline)}: ${val('iaWhy')}`);logAudit('DIES','Prazo',`${r.protocol}: ${formatDate(old)} → ${formatDate(r.deadline)} — ${val('iaWhy')}`);dIrrAfter(r);
      };
    }
  }

  // ----- documentos escolares -----
  function renderDiesDocuments(){
    if(!can('dies','view')) return renderAccessDenied('Documentos escolares');
    diesSync();state.diesDocuments=state.diesDocuments||[];
    const f=window.__ddf=window.__ddf||{q:'',school:'',cat:'',status:'',val:''};
    content.innerHTML=`${pageHeader('Documentos escolares','Controle de documentos institucionais e acadêmicos, validades, conferência e solicitações de correção. Documentos sem validade definida nunca são considerados vencidos.',dCan('create')?'<button class="btn-primary" id="ddNew"><i class="fa-solid fa-plus"></i> Registrar documento</button>':'')}
      <div class="table-card"><div style="display:flex;gap:10px;flex-wrap:wrap;padding:16px">
        <input id="ddQ" type="search" placeholder="Buscar por título ou número" value="${dE(f.q)}" style="flex:1;min-width:200px">
        <select id="ddSchool"><option value="">Todas as escolas</option>${schoolOptions(f.school)}</select>
        <select id="ddCat">${optionsHtml(DIES_DOC_CATS,f.cat,'Todas as categorias')}</select>
        <select id="ddStatus">${optionsHtml(['Pendente de envio','Recebido','Conferido','Correção solicitada'],f.status,'Toda situação')}</select>
        <select id="ddVal">${optionsHtml(['Vencido','A vencer','Vigente','Sem validade'],f.val,'Toda validade')}</select>
      </div><div id="ddTbl"></div></div>`;
    const draw=()=>{
      const q=f.q.trim().toLowerCase();
      const list=state.diesDocuments.filter(d=>(!f.school||d.schoolId===f.school)&&(!f.cat||d.category===f.cat)&&(!f.status||d.status===f.status)&&(!f.val||diesDocValidity(d)===f.val)&&(!q||(d.title+' '+(d.number||'')).toLowerCase().includes(q))).sort((a,b)=>a.title.localeCompare(b.title));
      const p=paginate(list,'ddoc'),ed=dCan('edit');
      document.getElementById('ddTbl').innerHTML=`<div class="table-wrap"><table><thead><tr><th>Documento</th><th>Escola</th><th>Categoria</th><th>Número</th><th>Validade</th><th>Situação</th><th>Anexos</th><th>Ações</th></tr></thead><tbody>${p.slice.length?p.slice.map(d=>`<tr><td><strong>${dE(d.title)}</strong></td><td>${dE(dSchoolName(d.schoolId))}</td><td>${dE(d.category)}</td><td>${dE(d.number||'—')}</td><td>${d.validityDate?formatDate(d.validityDate):'Sem validade'} ${badge(diesDocValidity(d),DIES_BADGE)}</td><td>${badge(d.status,DIES_BADGE)}</td><td>${(d.attachments||[]).length}</td><td><button class="small-button dd-view" data-id="${d.id}" title="Detalhes"><i class="fa-solid fa-eye"></i></button>${ed?`<button class="small-button dd-edit" data-id="${d.id}" title="Editar / anexar"><i class="fa-solid fa-pen"></i></button><button class="small-button dd-check" data-id="${d.id}" title="Registrar conferência"><i class="fa-solid fa-check"></i></button><button class="small-button dd-fix" data-id="${d.id}" title="Solicitar correção"><i class="fa-solid fa-rotate-left"></i></button>`:''}</td></tr>`).join(''):`<tr><td colspan="8"><div class="empty-state" style="border:none">${state.diesDocuments.length?'Nenhum documento encontrado com esses filtros.':'Nenhum documento registrado. Use “Registrar documento”.'}</div></td></tr>`}</tbody></table></div>${paginationHtml(p,'ddoc')}`;
      bindPagination('ddoc',draw);
      document.querySelectorAll('.dd-view').forEach(b=>b.onclick=()=>openDiesDocView(b.dataset.id));
      document.querySelectorAll('.dd-edit').forEach(b=>b.onclick=()=>openDiesDocEditor(b.dataset.id));
      document.querySelectorAll('.dd-check').forEach(b=>b.onclick=()=>diesDocCheck(b.dataset.id));
      document.querySelectorAll('.dd-fix').forEach(b=>b.onclick=()=>diesDocFix(b.dataset.id));
    };
    [['ddQ','q','oninput'],['ddSchool','school','onchange'],['ddCat','cat','onchange'],['ddStatus','status','onchange'],['ddVal','val','onchange']].forEach(([id,k,ev])=>document.getElementById(id)[ev]=e=>{f[k]=e.target.value;dResetPg('ddoc');draw();});
    document.getElementById('ddNew')?.addEventListener('click',()=>openDiesDocEditor());
    draw();
  }
  function openDiesDocEditor(id=null,pre={}){
    const a=id?'edit':'create';if(!dCan(a)) return denyToast(a);
    if(!state.schools.length) return showToast('Não há escolas cadastradas.');
    const d=id?state.diesDocuments.find(x=>x.id===id):{};if(id&&!d)return;
    openModal(id?'Editar documento':'Registrar documento',`<form id="dcForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid">
      <div class="full"><label>Escola *</label><select id="dcSchool">${schoolOptions(d.schoolId||pre.schoolId||'')}</select></div>
      <div><label>Categoria *</label><select id="dcCat">${optionsHtml(DIES_DOC_CATS,d.category||'')}</select></div>
      <div><label>Número</label><input id="dcNum" value="${dE(d.number||'')}"></div>
      <div class="full"><label>Título / descrição *</label><input id="dcTitle" value="${dE(d.title||'')}"></div>
      <div><label>Data de emissão</label><input id="dcIssue" type="date" value="${d.issueDate||''}"></div>
      <div><label>Validade <small class="muted">(deixe em branco se não houver validade)</small></label><input id="dcValid" type="date" value="${d.validityDate||''}"></div>
      <div class="full"><label>Observações</label><textarea id="dcNotes2" rows="2">${dE(d.notes||'')}</textarea></div>
      ${id?`<div class="full"><label>Anexos atuais</label>${dAttachList(d.attachments)}</div>`:''}${dAttachField('dcFiles',id?'Adicionar anexos':'Anexos (PDF, PNG ou JPG, até 2 MB cada)')}</div>
      <div class="form-actions"><button class="btn-primary">${id?'Salvar alterações':'Registrar documento'}</button></div></form>`);
    document.getElementById('dcForm').onsubmit=async e=>{
      e.preventDefault();const v=i=>document.getElementById(i).value.trim();
      if(!v('dcTitle')) return formError('Informe o título do documento.');
      if(v('dcIssue')&&v('dcValid')&&v('dcValid')<v('dcIssue')) return formError('A validade não pode ser anterior à data de emissão.');
      let files;try{files=await dReadFiles('dcFiles');}catch(err){return formError(err.message);}
      const next={schoolId:v('dcSchool'),category:v('dcCat'),number:v('dcNum'),title:v('dcTitle'),issueDate:v('dcIssue'),validityDate:v('dcValid'),notes:v('dcNotes2')};
      if(id){
        const labels={schoolId:'escola',category:'categoria',number:'número',title:'título',issueDate:'emissão',validityDate:'validade',notes:'observações'};
        const ch=Object.keys(next).filter(k=>(d[k]||'')!==next[k]).map(k=>`${labels[k]}: "${k==='schoolId'?dSchoolName(d[k]):(d[k]||'')}" → "${k==='schoolId'?dSchoolName(next[k]):next[k]}"`);
        Object.assign(d,next);if(files.length){d.attachments=[...(d.attachments||[]),...files];ch.push(`${files.length} anexo(s) adicionado(s)`);if(diesDocPending(d)){d.status='Recebido';ch.push('situação → Recebido');}}
        if(!ch.length) return formError('Nenhuma alteração foi feita.');
        dHist(d,`Documento alterado — ${ch.join('; ')}`);logAudit('DIES','Documento',`${d.title} alterado — ${ch.join('; ')}`);
      }else{
        const n={id:crypto.randomUUID(),...next,attachments:files,status:files.length?'Recebido':'Pendente de envio',createdBy:state.user,createdAt:new Date().toISOString(),history:[]};
        dHist(n,`Documento registrado (${n.status}).`);state.diesDocuments=state.diesDocuments||[];state.diesDocuments.push(n);logAudit('DIES','Documento',`${n.title} registrado — ${dSchoolName(n.schoolId)}`);
      }
      save();closeModal();dRerenderCurrent();showToast('Documento salvo.');
    };
  }
  function diesDocCheck(id){
    if(!dCan('edit')) return denyToast('edit');
    const d=state.diesDocuments.find(x=>x.id===id);if(!d)return;
    if(d.status==='Pendente de envio') return showToast('Este documento ainda não foi recebido (pendente de envio).');
    openModal(`Conferir — ${escapeHtml(d.title)}`,`<form id="dkForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid"><div class="full"><label>Observações da conferência</label><textarea id="dkNote" rows="3"></textarea></div></div><div class="form-actions"><button class="btn-primary">Registrar conferência</button></div></form>`);
    document.getElementById('dkForm').onsubmit=e=>{e.preventDefault();const n=document.getElementById('dkNote').value.trim();d.status='Conferido';d.checkedBy=state.user;d.checkedAt=new Date().toISOString();dHist(d,`Conferido pelo inspetor.${n?' '+n:''}`);logAudit('DIES','Conferência',`${d.title} — ${dSchoolName(d.schoolId)}`);save();closeModal();dRerenderCurrent();showToast('Conferência registrada.');};
  }
  function diesDocFix(id){
    if(!dCan('edit')) return denyToast('edit');
    const d=state.diesDocuments.find(x=>x.id===id);if(!d)return;
    openModal(`Solicitar correção — ${escapeHtml(d.title)}`,`<form id="dfForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid"><div class="full"><label>O que precisa ser corrigido ou complementado? *</label><textarea id="dfNote" rows="3"></textarea></div></div><div class="form-actions"><button class="btn-primary">Solicitar correção</button></div></form>`);
    document.getElementById('dfForm').onsubmit=e=>{
      e.preventDefault();const n=document.getElementById('dfNote').value.trim();if(!n) return formError('Descreva a correção solicitada.');
      d.status='Correção solicitada';d.correctionRequest=n;dHist(d,`Correção solicitada: ${n}`);
      state.notifications=state.notifications||[];state.notifications.unshift({id:crypto.randomUUID(),schoolId:d.schoolId,type:'DIES',text:`DIES: correção solicitada no documento "${d.title}": ${n}`,studentId:null,date:new Date().toISOString(),read:false});
      logAudit('DIES','Correção solicitada',`${d.title} — ${dSchoolName(d.schoolId)}`);save();closeModal();dRerenderCurrent();showToast('Correção solicitada e escola notificada no SIGED.');
    };
  }
  function openDiesDocView(id){
    const d=state.diesDocuments.find(x=>x.id===id);if(!d)return;
    openModal(d.title,`<div class="detail-grid">${dRow('Escola',dSchoolName(d.schoolId))}${dRow('Categoria',d.category)}${dRow('Número',d.number)}${dRow('Emissão',d.issueDate?formatDate(d.issueDate):'')}${dRow('Validade',d.validityDate?formatDate(d.validityDate):'Sem validade')}${dRow('Validade (situação)',diesDocValidity(d))}${dRow('Situação',d.status)}${dRow('Conferido por',d.checkedBy?`${d.checkedBy} em ${new Date(d.checkedAt).toLocaleDateString('pt-BR')}`:'')}</div>
      ${d.notes?`${dSection('Observações')}<p>${dE(d.notes)}</p>`:''}${d.correctionRequest?`${dSection('Última correção solicitada')}<p>${dE(d.correctionRequest)}</p>`:''}
      ${dSection('Anexos')}${dAttachList(d.attachments)}${dSection('Histórico de alterações')}${dHistHtml(d)}`);
  }

  // ----- notificações e prazos -----
  function renderDiesNotifications(){
    const added=diesSync();const f=window.__dnf=window.__dnf||{only:'unread'};
    const list=(state.diesNotifications||[]).filter(n=>f.only==='all'||!n.read);
    content.innerHTML=`${pageHeader('Notificações e prazos','Alertas gerados a partir das datas reais de inspeções, documentos e irregularidades.','<button class="btn-secondary" id="dnAll"><i class="fa-solid fa-check-double"></i> Marcar todas como lidas</button>')}
      <div class="alert alert-info">São notificações internas do SIGED, verificadas sempre que uma tela do DIES é aberta. Os prazos de alerta são configuráveis em “Checklist e prazos”. Não há envio de e-mail ou mensagem externa.${added?` <b>${added} nova(s) agora.</b>`:''}</div>
      <div class="table-card"><div style="padding:16px"><select id="dnOnly"><option value="unread" ${f.only==='unread'?'selected':''}>Somente não lidas</option><option value="all" ${f.only==='all'?'selected':''}>Todas</option></select></div><div id="dnTbl"></div></div>`;
    const draw=()=>{
      const l=(state.diesNotifications||[]).filter(n=>f.only==='all'||!n.read);const p=paginate(l,'dnot');
      document.getElementById('dnTbl').innerHTML=`<div class="table-wrap"><table><thead><tr><th>Data</th><th>Tipo</th><th>Descrição</th><th>Destinatário</th><th>Leitura</th><th></th></tr></thead><tbody>${p.slice.length?p.slice.map(n=>`<tr><td>${new Date(n.date).toLocaleString('pt-BR')}</td><td>${dE(n.type)}</td><td>${dE(n.text)}</td><td>${dE(n.recipient)}</td><td>${n.read?'<span class="badge badge-gray">Lida</span>':'<span class="badge badge-blue">Não lida</span>'}</td><td>${n.read?'':`<button class="small-button dn-read" data-id="${n.id}" title="Marcar como lida"><i class="fa-solid fa-check"></i></button>`}</td></tr>`).join(''):'<tr><td colspan="6"><div class="empty-state" style="border:none">Nenhuma notificação.</div></td></tr>'}</tbody></table></div>${paginationHtml(p,'dnot')}`;
      bindPagination('dnot',draw);
      document.querySelectorAll('.dn-read').forEach(b=>b.onclick=()=>{const n=state.diesNotifications.find(x=>x.id===b.dataset.id);if(n){n.read=true;save();draw();}});
    };
    document.getElementById('dnOnly').onchange=e=>{f.only=e.target.value;dResetPg('dnot');draw();};
    document.getElementById('dnAll').onclick=()=>{(state.diesNotifications||[]).forEach(n=>n.read=true);save();draw();showToast('Notificações marcadas como lidas.');};
    draw();
  }

  // ----- denúncias e apurações (acesso restrito: exige permissão de aprovar no módulo DIES) -----
  const DIES_COMPLAINT_CATS=['Documentação escolar','Funcionamento acadêmico','Estrutura e condições de funcionamento','Conduta administrativa','Outra'];
  function renderDiesComplaints(){
    if(!dCan('approve')) return renderAccessDenied('Denúncias e apurações');
    state.diesComplaints=state.diesComplaints||[];
    const f=window.__dcf=window.__dcf||{status:'',school:''};
    content.innerHTML=`${pageHeader('Denúncias e apurações','Registro e acompanhamento administrativo de denúncias recebidas por canais oficiais. O registro não presume veracidade nem decide sanções.',dCan('create')?'<button class="btn-primary" id="dcNew"><i class="fa-solid fa-plus"></i> Registrar denúncia</button>':'')}
      <div class="alert alert-info"><i class="fa-solid fa-lock"></i> Acesso restrito. Registre apenas o necessário e evite dados pessoais de terceiros.</div>
      <div class="table-card"><div style="display:flex;gap:10px;flex-wrap:wrap;padding:16px"><select id="dcfSchool"><option value="">Todas as escolas</option>${schoolOptions(f.school)}</select><select id="dcfStatus">${optionsHtml(['Recebida','Em apuração','Concluída','Arquivada'],f.status,'Todas as situações')}</select></div><div id="dcTbl"></div></div>`;
    const draw=()=>{
      const l=state.diesComplaints.filter(c=>(!f.school||c.schoolId===f.school)&&(!f.status||c.status===f.status)).sort((a,b)=>b.receivedDate.localeCompare(a.receivedDate));const p=paginate(l,'dcmp');
      document.getElementById('dcTbl').innerHTML=`<div class="table-wrap"><table><thead><tr><th>Protocolo</th><th>Recebimento</th><th>Escola</th><th>Categoria</th><th>Responsável</th><th>Situação</th><th></th></tr></thead><tbody>${p.slice.length?p.slice.map(c=>`<tr><td>${dE(c.protocol)}</td><td>${formatDate(c.receivedDate)}</td><td>${dE(dSchoolName(c.schoolId))}</td><td>${dE(c.category)}</td><td>${dE(c.responsible||'—')}</td><td>${badge(c.status,DIES_BADGE)}</td><td><button class="small-button dc-view" data-id="${c.id}" title="Abrir"><i class="fa-solid fa-eye"></i></button></td></tr>`).join(''):`<tr><td colspan="7"><div class="empty-state" style="border:none">${state.diesComplaints.length?'Nenhuma denúncia com esses filtros.':'Nenhuma denúncia registrada.'}</div></td></tr>`}</tbody></table></div>${paginationHtml(p,'dcmp')}`;
      bindPagination('dcmp',draw);document.querySelectorAll('.dc-view').forEach(b=>b.onclick=()=>openDiesComplaint(b.dataset.id));
    };
    document.getElementById('dcfSchool').onchange=e=>{f.school=e.target.value;dResetPg('dcmp');draw();};
    document.getElementById('dcfStatus').onchange=e=>{f.status=e.target.value;dResetPg('dcmp');draw();};
    document.getElementById('dcNew')?.addEventListener('click',openDiesComplaintEditor);
    draw();
  }
  function openDiesComplaintEditor(){
    if(!dCan('create')) return denyToast('create');
    if(!state.schools.length) return showToast('Não há escolas cadastradas.');
    openModal('Registrar denúncia',`<form id="cmForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid">
      <div class="full"><label>Escola relacionada *</label><select id="cmSchool">${schoolOptions('')}</select></div>
      <div><label>Data de recebimento *</label><input id="cmDate" type="date" max="${dToday()}" value="${dToday()}"></div>
      <div><label>Categoria *</label><select id="cmCat">${optionsHtml(DIES_COMPLAINT_CATS,'')}</select></div>
      <div class="full"><label>Canal oficial de recebimento *</label><input id="cmChannel" placeholder="Ex.: ouvidoria, ofício, processo nº"></div>
      <div class="full"><label>Descrição *</label><textarea id="cmDesc" rows="4"></textarea></div>
      ${dAttachField('cmFiles','Documentos ou evidências (PDF, PNG ou JPG, até 2 MB cada)')}</div>
      <div class="form-actions"><button class="btn-primary">Registrar denúncia</button></div></form>`);
    document.getElementById('cmForm').onsubmit=async e=>{
      e.preventDefault();const v=i=>document.getElementById(i).value.trim();
      if(!v('cmChannel')) return formError('Informe o canal oficial de recebimento.');
      if(v('cmDesc').length<10) return formError('Descreva a denúncia (mínimo de 10 caracteres).');
      let files;try{files=await dReadFiles('cmFiles');}catch(err){return formError(err.message);}
      const c={id:crypto.randomUUID(),protocol:nextProtocol('DEN','diesComplaints'),receivedDate:v('cmDate'),schoolId:v('cmSchool'),category:v('cmCat'),channel:v('cmChannel'),description:v('cmDesc'),evidence:files,responsible:'',inspectionIds:[],actions:[],opinion:'',forward:'',status:'Recebida',createdBy:state.user,history:[]};
      dHist(c,'Denúncia registrada.');state.diesComplaints.push(c);logAudit('DIES','Denúncia',`${c.protocol} registrada`);save();closeModal();renderDiesComplaints();showToast(`Denúncia ${c.protocol} registrada.`);
    };
  }
  function openDiesComplaint(id){
    if(!dCan('approve')) return denyToast('approve');
    const c=state.diesComplaints.find(x=>x.id===id);if(!c)return;
    const open=c.status==='Recebida'||c.status==='Em apuração';
    const insp=(c.inspectionIds||[]).map(x=>state.diesInspections.find(i=>i.id===x)?.protocol).filter(Boolean);
    openModal(`Denúncia ${c.protocol}`,`<div class="detail-grid">${dRow('Escola',dSchoolName(c.schoolId))}${dRow('Recebida em',formatDate(c.receivedDate))}${dRow('Categoria',c.category)}${dRow('Canal',c.channel)}${dRow('Situação',c.status)}${dRow('Responsável pela apuração',c.responsible)}${dRow('Inspeções relacionadas',insp.join(', '))}</div>
      ${dSection('Descrição')}<p>${dE(c.description)}</p>${dAttachList(c.evidence)}
      ${(c.actions||[]).length?`${dSection('Providências adotadas')}<div class="timeline">${c.actions.map(a=>`<div><b>${new Date(a.at).toLocaleString('pt-BR')}</b>${dE(a.user)} — ${dE(a.text)}</div>`).join('')}</div>`:''}
      ${c.opinion?`${dSection('Parecer final')}<p>${dE(c.opinion)}</p><p><b>Encaminhamento:</b> ${dE(c.forward||'—')}</p>`:''}
      ${open&&dCan('edit')?`<div class="form-actions" style="justify-content:flex-start;flex-wrap:wrap">${c.status==='Recebida'?'<button class="btn-secondary cm-act" data-a="start">Iniciar apuração</button>':''}<button class="btn-secondary cm-act" data-a="action">Registrar providência</button><button class="btn-secondary cm-act" data-a="link">Vincular inspeção</button><button class="btn-secondary cm-act" data-a="newinsp">Agendar inspeção</button><button class="btn-secondary cm-act" data-a="conclude">Concluir apuração</button><button class="btn-secondary cm-act" data-a="archive">Arquivar</button></div>`:''}
      ${dSection('Histórico')}${dHistHtml(c)}`);
    document.querySelectorAll('#modalBody .cm-act').forEach(b=>b.onclick=()=>diesComplaintAction(c.id,b.dataset.a));
  }
  function diesComplaintAction(id,a){
    const c=state.diesComplaints.find(x=>x.id===id);if(!c)return;
    const val=i=>document.getElementById(i)?.value.trim();
    const form=(t,fields,btn)=>openModal(`${t} — ${c.protocol}`,`<form id="caForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid">${fields}</div><div class="form-actions"><button class="btn-primary">${btn}</button></div></form>`);
    const done=(text,action)=>{dHist(c,text);logAudit('DIES','Denúncia',`${c.protocol}: ${action}`);save();closeModal();renderDiesComplaints();openDiesComplaint(c.id);};
    if(a==='newinsp') return openDiesInspEditor({schoolId:c.schoolId,type:'Inspeção motivada por denúncia',objective:`Apurar denúncia ${c.protocol}`});
    if(a==='start'){form('Iniciar apuração',`<div class="full"><label>Responsável pela apuração *</label><input id="caResp" value="${dE(state.user||'')}"></div>`,'Iniciar');document.getElementById('caForm').onsubmit=e=>{e.preventDefault();if(!val('caResp'))return formError('Informe o responsável.');c.responsible=val('caResp');c.status='Em apuração';done(`Apuração iniciada. Responsável: ${c.responsible}.`,'apuração iniciada');};}
    if(a==='action'){form('Registrar providência',`<div class="full"><label>Providência adotada *</label><textarea id="caText" rows="3"></textarea></div>`,'Registrar');document.getElementById('caForm').onsubmit=e=>{e.preventDefault();if(!val('caText'))return formError('Descreva a providência.');c.actions.push({at:new Date().toISOString(),user:state.user,text:val('caText')});c.status='Em apuração';done(`Providência: ${val('caText')}`,'providência registrada');};}
    if(a==='link'){const l=state.diesInspections.filter(i=>i.schoolId===c.schoolId&&!(c.inspectionIds||[]).includes(i.id));if(!l.length)return showToast('Não há inspeções dessa escola para vincular.');form('Vincular inspeção',`<div class="full"><label>Inspeção *</label><select id="caInsp">${l.map(i=>`<option value="${i.id}">${dE(i.protocol)} — ${dE(i.type)} (${formatDate(i.plannedDate)})</option>`).join('')}</select></div>`,'Vincular');document.getElementById('caForm').onsubmit=e=>{e.preventDefault();c.inspectionIds.push(val('caInsp'));done('Inspeção vinculada à denúncia.','inspeção vinculada');};}
    if(a==='conclude'){form('Concluir apuração',`<div class="full"><label>Parecer final *</label><textarea id="caOp" rows="4"></textarea></div><div class="full"><label>Encaminhamento *</label><textarea id="caFw" rows="2"></textarea></div>`,'Concluir');document.getElementById('caForm').onsubmit=e=>{e.preventDefault();if(!val('caOp')||!val('caFw'))return formError('Informe o parecer final e o encaminhamento.');c.opinion=val('caOp');c.forward=val('caFw');c.status='Concluída';c.concludedAt=dToday();done('Apuração concluída.','concluída');};}
    if(a==='archive'){form('Arquivar denúncia',`<div class="full"><label>Justificativa *</label><textarea id="caWhy" rows="3"></textarea></div>`,'Arquivar');document.getElementById('caForm').onsubmit=e=>{e.preventDefault();if(!val('caWhy'))return formError('Informe a justificativa.');c.status='Arquivada';c.opinion=val('caWhy');c.forward='Arquivamento';done(`Arquivada: ${val('caWhy')}`,'arquivada');};}
  }

  // ----- consistência dos registros acadêmicos (somente leitura: gera alertas para conferência humana) -----
  function diesScanAcademic(schoolId){
    const out=[];
    const students=(state.students||[]).filter(s=>s.schoolId===schoolId);
    const classes=(state.classes||[]).filter(c=>c.schoolId===schoolId);
    const recs=(state.lessonRecords||[]).filter(r=>r.schoolId===schoolId);
    const grades=(state.grades||[]).filter(g=>g.schoolId===schoolId);
    const hasVal=g=>['av1','av2','trabalho','recuperacao'].some(k=>g[k]!==null&&g[k]!==undefined&&g[k]!=='');
    students.filter(activeStudent).forEach(s=>{
      const base={schoolId,reg:s.registration||'—',name:s.name};
      const c=classes.find(x=>x.id===s.classId);
      if(!c){out.push({...base,cls:'—',check:'Aluno sem turma',detail:'Aluno ativo sem turma vinculada.'});return;}
      base.cls=`${c.grade} — ${c.name}`;
      const cg=grades.filter(g=>g.classId===c.id&&hasVal(g)),mine=cg.filter(g=>g.studentId===s.id);
      if(cg.length){
        if(!mine.length) out.push({...base,check:'Aluno sem notas',detail:'A turma possui notas lançadas, mas este aluno não tem nenhuma.'});
        else{
          const withNote=new Set(mine.map(g=>g.subject));
          const missing=(c.subjects||[]).map(x=>x.name).filter(n=>!withNote.has(n));
          if(missing.length) out.push({...base,check:'Notas incompletas',detail:`Disciplinas sem nenhuma nota: ${missing.join(', ')}.`});
        }
      }
      const classRecs=recs.filter(r=>r.classId===c.id);const entries=[];
      classRecs.forEach(r=>{const e=(r.attendance||[]).find(x=>x.studentId===s.id);if(e)entries.push(e);});
      if(classRecs.length&&!entries.length) out.push({...base,check:'Sem frequência registrada',detail:'A turma possui diários lançados, mas não há chamada registrada para este aluno.'});
      if(entries.length&&mine.length){
        const pct=entries.filter(e=>e.status==='Presente'||e.status==='Falta Justificada').length/entries.length*100;
        const subj={};mine.forEach(g=>{const m=gradeMedia(g,weightsFor(c.id,g.subject));if(m!==null)(subj[g.subject]=subj[g.subject]||[]).push(m);});
        const meds=Object.values(subj).map(a=>a.reduce((x,y)=>x+y,0)/a.length);
        if(pct<MIN_ATTENDANCE&&meds.length&&meds.every(m=>m>=PASS_GRADE)) out.push({...base,check:'Frequência × resultado',detail:`Frequência de ${pct.toFixed(1).replace('.',',')}% (mínimo ${MIN_ATTENDANCE}%) com médias acima de ${PASS_GRADE} em todas as disciplinas lançadas: conferir o resultado final.`});
      }
    });
    students.filter(s=>s.status==='Transferido').forEach(s=>{
      const ok=(state.enrollmentRequests||[]).some(r=>r.schoolId===schoolId&&r.studentName===s.name&&r.type==='Transferência Enviada'&&r.status==='Concluída');
      if(!ok) out.push({schoolId,reg:s.registration||'—',name:s.name,cls:'—',check:'Transferência sem registro',detail:'Aluno com status "Transferido" sem solicitação de transferência enviada concluída.'});
    });
    return out;
  }
  function renderDiesConsistency(){
    if(!can('dies','view')) return renderAccessDenied('Consistência dos registros');
    diesSync();const f=window.__dcsf=window.__dcsf||{school:state.schools[0]?.id||'',check:''};
    content.innerHTML=`${pageHeader('Consistência dos registros acadêmicos','Verificações automáticas sobre matrículas, notas, frequência e transferências já registradas no SIGED.')}
      <div class="alert alert-info"><b>Atenção:</b> cada item abaixo é um alerta para conferência humana. Uma divergência não é fraude nem irregularidade confirmada. O DIES apenas lê os dados e <b>não altera notas, frequências ou resultados</b>; as correções são feitas pelos usuários autorizados da escola.</div>
      <div class="card"><div class="card-title"><div><h3>Integrações ainda indisponíveis</h3></div></div><p class="muted">O SIGED ainda não possui registros de <b>histórico escolar</b>, <b>ata de resultado final</b> e <b>documento de transferência</b> como dados estruturados, então essas conferências não são feitas automaticamente. Registre a existência e a validade desses documentos em “Documentos escolares” e confira-os manualmente no checklist da inspeção.</p></div>
      <div class="table-card"><div style="display:flex;gap:10px;flex-wrap:wrap;padding:16px"><select id="dcsSchool">${schoolOptions(f.school)}</select><select id="dcsCheck"></select></div><div id="dcsTbl"></div></div>`;
    const draw=()=>{
      const all=f.school?diesScanAcademic(f.school):[];const checks=[...new Set(all.map(a=>a.check))];
      const sel=document.getElementById('dcsCheck');sel.innerHTML=optionsHtml(checks,f.check,'Todas as verificações');
      const list=all.filter(a=>!f.check||a.check===f.check);const p=paginate(list,'dcs');
      document.getElementById('dcsTbl').innerHTML=`<div class="table-wrap"><table><thead><tr><th>Matrícula</th><th>Aluno</th><th>Turma</th><th>Verificação</th><th>Detalhe</th><th></th></tr></thead><tbody>${p.slice.length?p.slice.map((a,idx)=>`<tr><td>${dE(a.reg)}</td><td>${dE(a.name)}</td><td>${dE(a.cls)}</td><td>${dE(a.check)}</td><td>${dE(a.detail)}</td><td>${dCan('create')?`<button class="small-button dcs-irr" data-i="${idx}" title="Registrar como irregularidade após conferência"><i class="fa-solid fa-flag"></i></button>`:''}</td></tr>`).join(''):`<tr><td colspan="6"><div class="empty-state" style="border:none">${state.schools.length?'Nenhum alerta encontrado para esta escola com os dados atuais.':'Nenhuma escola cadastrada.'}</div></td></tr>`}</tbody></table></div>${paginationHtml(p,'dcs')}`;
      bindPagination('dcs',draw);
      document.querySelectorAll('.dcs-irr').forEach(b=>b.onclick=()=>{const a=p.slice[Number(b.dataset.i)];openDiesIrrEditor({schoolId:a.schoolId,category:'Registros acadêmicos',description:`Divergência confirmada após conferência (${a.check}) — matrícula ${a.reg}: ${a.detail}`});});
    };
    document.getElementById('dcsSchool').onchange=e=>{f.school=e.target.value;f.check='';dResetPg('dcs');draw();};
    document.getElementById('dcsCheck').onchange=e=>{f.check=e.target.value;dResetPg('dcs');draw();};
    draw();
  }

  // ----- relatórios -----
  const DIES_REPORTS=[['regularidade','Regularidade por escola'],['pendencias','Escolas com pendências'],['docs_vencidos','Documentos vencidos'],['docs_a_vencer','Documentos próximos do vencimento'],['irr_categoria','Irregularidades por categoria'],['irr_status','Irregularidades resolvidas e pendentes'],['inspecoes_periodo','Inspeções por período'],['historico','Histórico de inspeções por escola'],['prazos','Cumprimento de prazos'],['inconsistencias','Inconsistências nos registros acadêmicos'],['gerencial','Relatório gerencial consolidado']];
  function diesReport(key,f){
    const inRange=d=>(!f.from||(d&&d>=f.from))&&(!f.to||(d&&d<=f.to));
    const schools=state.schools.filter(s=>(!f.school||s.id===f.school)&&(!f.city||s.city===f.city));const ids=new Set(schools.map(s=>s.id));
    const fmt=d=>d?formatDate(d):'—';
    const insp=(state.diesInspections||[]).filter(i=>ids.has(i.schoolId));
    const irr=(state.diesIrregularities||[]).filter(r=>ids.has(r.schoolId));
    const docs=(state.diesDocuments||[]).filter(d=>ids.has(d.schoolId));
    const name=DIES_REPORTS.find(r=>r[0]===key)?.[1]||key;let headers=[],rows=[];
    if(key==='regularidade'){headers=['Escola','Município','Rede','Regularidade','Motivos','Última inspeção','Próxima inspeção'];rows=schools.map(s=>({s,st:diesSchoolStats(s.id)})).filter(x=>!f.status||x.st.level===f.status).map(x=>[x.s.name,x.s.city||'—',dNet(x.s),x.st.level,x.st.reasons.join('; ')||'—',x.st.last?fmt(x.st.last.doneDate):'—',x.st.next?fmt(x.st.next.plannedDate):'—']);}
    if(key==='pendencias'){headers=['Escola','Município','Irregularidades em aberto','Documentos vencidos','Documentos pendentes','Regularidade'];rows=schools.map(s=>({s,st:diesSchoolStats(s.id)})).filter(x=>x.st.pendCount>0).map(x=>[x.s.name,x.s.city||'—',x.st.openIrr.length,x.st.expired.length,x.st.pend.length,x.st.level]);}
    if(key==='docs_vencidos'||key==='docs_a_vencer'){const want=key==='docs_vencidos'?'Vencido':'A vencer';headers=['Escola','Documento','Categoria','Número','Validade',want==='Vencido'?'Dias de atraso':'Dias restantes'];rows=docs.filter(d=>diesDocValidity(d)===want&&inRange(d.validityDate)).sort((a,b)=>a.validityDate.localeCompare(b.validityDate)).map(d=>[dSchoolName(d.schoolId),d.title,d.category,d.number||'—',fmt(d.validityDate),Math.abs(dDiff(d.validityDate,dToday()))]);}
    if(key==='irr_categoria'){headers=['Categoria','Total','Em aberto','Resolvidas/encerradas'];const l=irr.filter(r=>inRange(r.identifiedDate));rows=DIES_IRR_CATS.map(c=>{const x=l.filter(r=>r.category===c);return [c,x.length,x.filter(diesOpenIrr).length,x.filter(r=>!diesOpenIrr(r)).length];});}
    if(key==='irr_status'){headers=['Protocolo','Escola','Categoria','Identificada em','Prazo','Situação','Resolvida em'];rows=irr.filter(r=>inRange(r.identifiedDate)&&(!f.status||diesIrrLabel(r)===f.status||r.status===f.status)).sort((a,b)=>a.identifiedDate.localeCompare(b.identifiedDate)).map(r=>[r.protocol,dSchoolName(r.schoolId),r.category,fmt(r.identifiedDate),fmt(r.deadline),diesIrrLabel(r),fmt(r.resolvedDate)]);}
    if(key==='inspecoes_periodo'||key==='historico'){headers=['Protocolo','Escola','Tipo','Data prevista','Realizada em','Inspetor','Situação','Resultado'];rows=insp.filter(i=>(key==='historico'||inRange(i.plannedDate))&&(!f.type||i.type===f.type)&&(!f.inspector||(i.inspector||'').toLowerCase().includes(f.inspector.toLowerCase()))&&(!f.status||diesInspStatus(i)===f.status)).sort((a,b)=>key==='historico'?dSchoolName(a.schoolId).localeCompare(dSchoolName(b.schoolId))||b.plannedDate.localeCompare(a.plannedDate):a.plannedDate.localeCompare(b.plannedDate)).map(i=>[i.protocol,dSchoolName(i.schoolId),i.type,fmt(i.plannedDate),fmt(i.doneDate),i.inspector||'—',diesInspStatus(i),i.result||'—']);}
    if(key==='prazos'){headers=['Protocolo','Escola','Prazo','Resolvida em','Situação do prazo'];rows=irr.filter(r=>r.deadline&&inRange(r.deadline)).map(r=>{const s=r.resolvedDate?(r.resolvedDate<=r.deadline?'Cumprido no prazo':'Cumprido fora do prazo'):(diesIrrOverdue(r)?'Em aberto — prazo vencido':'Em aberto — no prazo');return [r.protocol,dSchoolName(r.schoolId),fmt(r.deadline),fmt(r.resolvedDate),s];}).filter(r=>!f.status||r[4]===f.status);}
    if(key==='inconsistencias'){headers=['Escola','Matrícula','Turma','Verificação','Detalhe (alerta para conferência humana)'];schools.forEach(s=>diesScanAcademic(s.id).forEach(a=>rows.push([s.name,a.reg,a.cls,a.check,a.detail])));}
    if(key==='gerencial'){
      const lv=l=>schools.filter(s=>diesSchoolStats(s.id).level===l).length;const ic=st=>insp.filter(i=>diesInspStatus(i)===st).length;
      headers=['Indicador','Valor'];rows=[['Escolas consideradas',schools.length],['Escolas regulares',lv('Regular')],['Escolas com pendências',lv('Com pendências')],['Escolas irregulares',lv('Irregular')],['Escolas sem avaliação',lv('Sem avaliação')],['Inspeções agendadas',ic('Agendada')],['Inspeções em andamento',ic('Em andamento')],['Inspeções concluídas',ic('Concluída')],['Inspeções atrasadas',ic('Atrasada')],['Irregularidades em aberto',irr.filter(diesOpenIrr).length],['Irregularidades resolvidas/encerradas',irr.filter(r=>!diesOpenIrr(r)).length],['Irregularidades com prazo vencido',irr.filter(r=>diesOpenIrr(r)&&diesIrrOverdue(r)).length],['Documentos vencidos',docs.filter(d=>diesDocValidity(d)==='Vencido').length],['Documentos a vencer',docs.filter(d=>diesDocValidity(d)==='A vencer').length],['Documentos pendentes de envio/correção',docs.filter(diesDocPending).length],['Alertas de consistência acadêmica',schools.reduce((n,s)=>n+diesScanAcademic(s.id).length,0)]];
    }
    const parts=[];if(f.school)parts.push('Escola: '+dSchoolName(f.school));if(f.city)parts.push('Município: '+f.city);if(f.inspector)parts.push('Inspetor: '+f.inspector);if(f.type)parts.push('Tipo: '+f.type);if(f.from||f.to)parts.push(`Período: ${f.from?formatDate(f.from):'início'} a ${f.to?formatDate(f.to):'hoje'}`);if(f.status)parts.push('Situação: '+f.status);
    return {key,title:name,headers,rows,filtersText:parts.join(' · ')||'Sem filtros (todos os registros)'};
  }
  function diesOutputReport(key,f,fmt){
    const rep=diesReport(key,f);
    if(fmt==='csv'){exportCsv(`dies-${key}.csv`,[[rep.title],['Filtros: '+rep.filtersText],[],rep.headers,...rep.rows]);return;}
    dPrintHtml(rep.title,`${dDocHead(rep.title,`<p>Filtros aplicados: ${dE(rep.filtersText)}</p>`)}${dPrintTable(rep.headers,rep.rows)}<p>Total de linhas: ${rep.rows.length}</p>`);
    logAudit('DIES','Relatório',`${rep.title} (PDF)`);save();
  }
  function renderDiesReports(){
    if(!can('dies','view')) return renderAccessDenied('Relatórios');
    diesSync();const f=window.__drf=window.__drf||{key:'regularidade',school:'',city:'',inspector:'',type:'',from:'',to:'',status:''};
    const cities=[...new Set(state.schools.map(s=>s.city).filter(Boolean))].sort();
    const allStatus=['Regular','Com pendências','Irregular','Sem avaliação','Agendada','Em andamento','Concluída','Cancelada','Atrasada',...DIES_IRR_STATUS,'Prazo vencido','Cumprido no prazo','Cumprido fora do prazo','Em aberto — prazo vencido','Em aberto — no prazo'];
    content.innerHTML=`${pageHeader('Relatórios','Gere relatórios com os dados reais do sistema. “PDF” abre a janela de impressão do navegador (escolha “Salvar como PDF”). O relatório individual de cada inspeção está em Inspeções.')}
      <div class="card"><div class="form-grid">
        <div class="full"><label>Relatório</label><select id="rpKey">${DIES_REPORTS.map(r=>`<option value="${r[0]}" ${r[0]===f.key?'selected':''}>${r[1]}</option>`).join('')}</select></div>
        <div><label>Escola</label><select id="rpSchool"><option value="">Todas</option>${schoolOptions(f.school)}</select></div>
        <div><label>Município</label><select id="rpCity">${optionsHtml(cities,f.city,'Todos')}</select></div>
        <div><label>Inspetor</label><input id="rpInsp" value="${dE(f.inspector)}" placeholder="Nome (contém)"></div>
        <div><label>Tipo de inspeção</label><select id="rpType">${optionsHtml(DIES_TYPES,f.type,'Todos')}</select></div>
        <div><label>De</label><input id="rpFrom" type="date" value="${f.from}"></div>
        <div><label>Até</label><input id="rpTo" type="date" value="${f.to}"></div>
        <div><label>Situação</label><select id="rpStatus">${optionsHtml(allStatus,f.status,'Todas')}</select></div></div>
        <div class="form-actions" style="justify-content:flex-start;flex-wrap:wrap"><button class="btn-primary" id="rpGo"><i class="fa-solid fa-table"></i> Gerar / atualizar</button>${dCan('export')?'<button class="btn-secondary" id="rpPdf"><i class="fa-solid fa-file-pdf"></i> PDF</button><button class="btn-secondary" id="rpCsv"><i class="fa-solid fa-file-csv"></i> CSV</button>':''}</div></div>
      <div id="rpOut"></div>`;
    const read=()=>{f.key=document.getElementById('rpKey').value;f.school=document.getElementById('rpSchool').value;f.city=document.getElementById('rpCity').value;f.inspector=document.getElementById('rpInsp').value.trim();f.type=document.getElementById('rpType').value;f.from=document.getElementById('rpFrom').value;f.to=document.getElementById('rpTo').value;f.status=document.getElementById('rpStatus').value;return f.from&&f.to&&f.from>f.to?'A data inicial não pode ser posterior à final.':'';};
    const show=()=>{
      const err=read();if(err)return showToast(err);const rep=diesReport(f.key,f);
      document.getElementById('rpOut').innerHTML=`<div class="table-card"><div style="padding:16px"><h3>${dE(rep.title)}</h3><p class="muted">Filtros: ${dE(rep.filtersText)} · ${rep.rows.length} linha(s)${rep.rows.length>200?' (prévia mostra as 200 primeiras; PDF e CSV trazem tudo)':''}</p></div><div class="table-wrap"><table><thead><tr>${rep.headers.map(h=>`<th>${dE(h)}</th>`).join('')}</tr></thead><tbody>${rep.rows.length?rep.rows.slice(0,200).map(r=>`<tr>${r.map(c=>`<td>${dE(c)}</td>`).join('')}</tr>`).join(''):`<tr><td colspan="${rep.headers.length}" class="muted">Nenhum registro para os filtros informados.</td></tr>`}</tbody></table></div></div>`;
    };
    document.getElementById('rpGo').onclick=show;
    document.getElementById('rpPdf')?.addEventListener('click',()=>{const e=read();if(e)return showToast(e);diesOutputReport(f.key,f,'print');});
    document.getElementById('rpCsv')?.addEventListener('click',()=>{const e=read();if(e)return showToast(e);diesOutputReport(f.key,f,'csv');});
    show();
  }

  // ----- configuração: prazos e checklist -----
  function renderDiesConfig(){
    if(!can('dies','view')) return renderAccessDenied('Checklist e prazos');
    const cfg=diesCfg();const ed=dCan('edit');const dis=ed?'':'disabled';
    content.innerHTML=`${pageHeader('Checklist e prazos','Defina prazos de alerta e quais itens do checklist valem para cada rede. Os requisitos e prazos legais devem ser confirmados conforme a legislação e a rede de ensino: o sistema não os presume.')}
      <form id="cfgForm" novalidate>
      <div class="card"><div class="card-title"><div><h3>Prazos</h3></div></div><div class="form-grid">
        <div><label>Alertar documentos a vencer (dias antes)</label><input id="cfWarn" type="number" min="1" max="365" value="${cfg.warnDays}" ${dis}></div>
        <div><label>Alertar inspeções e prazos (dias antes)</label><input id="cfAlert" type="number" min="1" max="90" value="${cfg.alertDays}" ${dis}></div>
        <div><label>Prazo padrão de regularização (dias)</label><input id="cfDeadline" type="number" min="1" max="365" value="${cfg.deadlineDays}" ${dis}></div>
        <div><label>Intervalo máximo entre inspeções (meses)</label><input id="cfInterval" type="number" min="1" max="60" value="${cfg.intervalMonths}" ${dis}></div></div></div>
      <div class="card" style="margin-top:16px"><div class="card-title"><div><h3>Itens do checklist</h3><span>Alterações valem para inspeções iniciadas depois. Itens não são excluídos: desative os que não se aplicam. “Obrigatório” impede concluir a inspeção enquanto o item estiver pendente.</span></div></div>
      <div class="table-wrap"><table><thead><tr><th>Categoria</th><th>Item</th><th>Ativo</th><th>Obrigatório (Pública)</th><th>Obrigatório (Privada)</th></tr></thead><tbody>${cfg.checklist.map(c=>`<tr data-id="${c.id}"><td>${dE(c.category)}</td><td><input class="cf-text" value="${dE(c.text)}" ${dis}></td><td><input type="checkbox" class="cf-active" ${c.active?'checked':''} ${dis}></td><td><input type="checkbox" class="cf-pub" ${(c.requiredFor||[]).includes('Pública')?'checked':''} ${dis}></td><td><input type="checkbox" class="cf-priv" ${(c.requiredFor||[]).includes('Privada')?'checked':''} ${dis}></td></tr>`).join('')}</tbody></table></div>
      ${ed?`<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px"><select id="cfNewCat">${optionsHtml(DIES_CK_CATS,'')}</select><input id="cfNewText" placeholder="Novo item do checklist" style="flex:1;min-width:200px"><button type="button" class="btn-secondary" id="cfAdd"><i class="fa-solid fa-plus"></i> Adicionar item</button></div>`:''}</div>
      ${ed?'<div class="form-actions"><button class="btn-primary">Salvar configuração</button></div>':''}</form>`;
    document.getElementById('cfAdd')?.addEventListener('click',()=>{
      const t=document.getElementById('cfNewText').value.trim();if(!t)return showToast('Informe o texto do novo item.');
      cfg.checklist.push({id:'ck'+Date.now(),category:document.getElementById('cfNewCat').value,text:t,active:true,requiredFor:[]});logAudit('DIES','Configuração',`Item de checklist adicionado: ${t}`);save();renderDiesConfig();showToast('Item adicionado.');
    });
    document.getElementById('cfgForm').onsubmit=e=>{
      e.preventDefault();if(!ed)return denyToast('edit');
      const n=id=>Number(document.getElementById(id).value);
      const vals={warnDays:n('cfWarn'),alertDays:n('cfAlert'),deadlineDays:n('cfDeadline'),intervalMonths:n('cfInterval')};
      if(Object.values(vals).some(v=>!Number.isInteger(v)||v<1)) return showToast('Informe números inteiros maiores que zero nos prazos.');
      Object.assign(cfg,vals);
      document.querySelectorAll('#cfgForm tbody tr').forEach(tr=>{
        const it=cfg.checklist.find(c=>c.id===tr.dataset.id);if(!it)return;
        const t=tr.querySelector('.cf-text').value.trim();if(t)it.text=t;
        it.active=tr.querySelector('.cf-active').checked;
        it.requiredFor=[tr.querySelector('.cf-pub').checked?'Pública':null,tr.querySelector('.cf-priv').checked?'Privada':null].filter(Boolean);
      });
      logAudit('DIES','Configuração','Prazos e checklist atualizados.');save();showToast('Configuração salva.');
    };
  }


  // ===== DEPARTAMENTO DE EDUCAÇÃO — Operador de Educação (matrizes, escolas/sedes, secretários) =====
  const EDU_NETS=['Pública — Estadual','Pública — Municipal','Pública — Federal','Privada'];
  const EDU_UNITS=['Sede','Unidade / anexo'];
  function eduMatrizes(){state.matrizes=state.matrizes||[];return state.matrizes;}
  function eduMatrizName(id){return eduMatrizes().find(m=>m.id===id)?.name||'—';}
  // --- matrizes ---
  function renderEduMatrizes(){
    if(!can('educacao','view')) return renderAccessDenied('Matrizes');
    const f=window.__emf=window.__emf||{q:'',status:''};
    content.innerHTML=`${pageHeader('Matrizes','Cadastro das matrizes (mantenedoras/redes) às quais as escolas e sedes se vinculam. Matrizes não são excluídas: apenas inativadas.',can('educacao','create')?'<button class="btn-primary" id="emNew"><i class="fa-solid fa-plus"></i> Nova matriz</button>':'')}
      <div class="table-card"><div style="display:flex;gap:10px;flex-wrap:wrap;padding:16px"><input id="emQ" type="search" placeholder="Buscar por nome ou CNPJ" value="${dE(f.q)}" style="flex:1;min-width:200px"><select id="emSt">${optionsHtml(['Ativa','Inativa'],f.status,'Todas as situações')}</select></div><div id="emTbl"></div></div>`;
    const draw=()=>{
      const q=f.q.trim().toLowerCase();const l=eduMatrizes().filter(m=>(!f.status||(m.status||'Ativa')===f.status)&&(!q||(m.name+' '+(m.cnpj||'')).toLowerCase().includes(q))).sort((a,b)=>a.name.localeCompare(b.name));const p=paginate(l,'emz');
      document.getElementById('emTbl').innerHTML=`<div class="table-wrap"><table><thead><tr><th>Matriz</th><th>CNPJ</th><th>Rede</th><th>Município/UF</th><th>Responsável</th><th>Escolas/sedes</th><th>Situação</th><th>Ações</th></tr></thead><tbody>${p.slice.length?p.slice.map(m=>`<tr><td><strong>${dE(m.name)}</strong></td><td>${dE(m.cnpj||'—')}</td><td>${dE(m.net||'—')}</td><td>${dE([m.city,m.state].filter(Boolean).join('/')||'—')}</td><td>${dE(m.responsible||'—')}</td><td>${state.schools.filter(s=>s.matrizId===m.id).length}</td><td>${badge(m.status||'Ativa',{'Ativa':'badge-green','Inativa':'badge-gray'})}</td><td><button class="small-button em-view" data-id="${m.id}" title="Ver escolas"><i class="fa-solid fa-eye"></i></button>${can('educacao','edit')?`<button class="small-button em-edit" data-id="${m.id}" title="Editar"><i class="fa-solid fa-pen"></i></button>`:''}</td></tr>`).join(''):`<tr><td colspan="8"><div class="empty-state" style="border:none">${eduMatrizes().length?'Nenhuma matriz encontrada.':'Nenhuma matriz cadastrada ainda.'}</div></td></tr>`}</tbody></table></div>${paginationHtml(p,'emz')}`;
      bindPagination('emz',draw);
      document.querySelectorAll('.em-edit').forEach(b=>b.onclick=()=>openEduMatrizEditor(b.dataset.id));
      document.querySelectorAll('.em-view').forEach(b=>b.onclick=()=>{const m=eduMatrizes().find(x=>x.id===b.dataset.id);const l2=state.schools.filter(s=>s.matrizId===m.id);openModal(m.name,`<div class="detail-grid">${dRow('CNPJ',m.cnpj)}${dRow('Rede',m.net)}${dRow('Endereço',m.address)}${dRow('Município/UF',[m.city,m.state].filter(Boolean).join('/'))}${dRow('Telefone',m.phone)}${dRow('E-mail',m.email)}${dRow('Responsável',m.responsible)}${dRow('Situação',m.status||'Ativa')}</div>${dSection('Escolas e sedes vinculadas')}${l2.length?`<ul style="padding-left:18px">${l2.map(s=>`<li>${dE(s.name)} — ${dE(s.unitType||'tipo não informado')}</li>`).join('')}</ul>`:'<p class="muted">Nenhuma escola vinculada.</p>'}`);});
    };
    document.getElementById('emQ').oninput=e=>{f.q=e.target.value;dResetPg('emz');draw();};
    document.getElementById('emSt').onchange=e=>{f.status=e.target.value;dResetPg('emz');draw();};
    document.getElementById('emNew')?.addEventListener('click',()=>openEduMatrizEditor());
    draw();
  }
  function openEduMatrizEditor(id=null){
    const a=id?'edit':'create';if(!can('educacao',a)) return denyToast(a);
    const m=id?eduMatrizes().find(x=>x.id===id):{};if(id&&!m)return;
    openModal(id?'Editar matriz':'Nova matriz',`<form id="emForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid">
      <div class="full"><label>Nome da matriz *</label><input id="emName" value="${dE(m.name||'')}"></div>
      <div><label>CNPJ</label><input id="emCnpj" value="${dE(m.cnpj||'')}" placeholder="00.000.000/0000-00"></div>
      <div><label>Rede *</label><select id="emNet">${optionsHtml(EDU_NETS,m.net||'')}</select></div>
      <div class="full"><label>Endereço</label><input id="emAddr" value="${dE(m.address||'')}"></div>
      <div><label>Município</label><input id="emCity" value="${dE(m.city||'')}"></div><div><label>UF</label><input id="emUf" maxlength="2" value="${dE(m.state||'')}"></div>
      <div><label>Telefone</label><input id="emPhone" value="${dE(m.phone||'')}"></div><div><label>E-mail</label><input id="emMail" type="email" value="${dE(m.email||'')}"></div>
      <div><label>Responsável</label><input id="emResp" value="${dE(m.responsible||'')}"></div>
      <div><label>Situação</label><select id="emStatus">${optionsHtml(['Ativa','Inativa'],m.status||'Ativa')}</select></div></div>
      <div class="form-actions"><button class="btn-primary">${id?'Salvar alterações':'Cadastrar matriz'}</button></div></form>`);
    document.getElementById('emForm').onsubmit=e=>{
      e.preventDefault();const v=i=>document.getElementById(i).value.trim();
      if(!v('emName')) return formError('Informe o nome da matriz.');
      if(!v('emNet')) return formError('Informe a rede da matriz.');
      if(v('emCnpj')&&v('emCnpj').replace(/\D/g,'').length!==14) return formError('O CNPJ deve ter 14 dígitos.');
      if(v('emMail')&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('emMail'))) return formError('Informe um e-mail válido.');
      if(eduMatrizes().some(x=>x.id!==id&&x.name.toLowerCase()===v('emName').toLowerCase())) return formError('Já existe uma matriz com esse nome.');
      const next={name:v('emName'),cnpj:v('emCnpj'),net:v('emNet'),address:v('emAddr'),city:v('emCity'),state:v('emUf').toUpperCase(),phone:v('emPhone'),email:v('emMail'),responsible:v('emResp'),status:v('emStatus')};
      if(id){Object.assign(m,next);logAudit('Departamento de Educação','Alteração de matriz',m.name);}
      else{eduMatrizes().push({id:crypto.randomUUID(),...next,createdBy:state.user,createdAt:new Date().toISOString()});logAudit('Departamento de Educação','Cadastro de matriz',next.name);}
      save();closeModal();renderEduMatrizes();showToast('Matriz salva.');
    };
  }
  // --- escolas e sedes (usa o cadastro completo de escola do SIGED; acrescenta matriz, tipo de unidade e conta do secretário) ---
  function eduSchoolLinkHtml(s,id){
    const ms=eduMatrizes().filter(m=>m.status!=='Inativa'||m.id===s.matrizId);
    return `<fieldset class="form-section"><legend>Vínculo com a matriz</legend><div class="form-grid">
      <div><label>Matriz *</label><select id="el_matriz"><option value="">${ms.length?'Selecione':'Cadastre uma matriz antes'}</option>${ms.map(m=>`<option value="${m.id}" ${m.id===s.matrizId?'selected':''}>${dE(m.name)}</option>`).join('')}</select></div>
      <div><label>Tipo de unidade *</label><select id="el_unit">${optionsHtml(EDU_UNITS,s.unitType||'')}</select></div></div></fieldset>
      ${id?'':`<fieldset class="form-section"><legend>Conta do secretário escolar (opcional)</legend><div class="form-grid"><div><label>Nome</label><input id="el_secName"></div><div><label>E-mail de acesso</label><input id="el_secMail" type="email"></div><div><label>Senha inicial</label><input id="el_secPass" type="password" minlength="4"></div></div><small class="muted">Preencha os três campos para já criar o acesso da secretaria dessa escola.</small></fieldset>`}`;
  }
  function eduReadLink(data,id){
    const v=i=>document.getElementById(i)?.value.trim()||'';
    if(!v('el_matriz')) return {error:'Selecione a matriz da escola (cadastre a matriz em “Matrizes”, se ainda não existir).'};
    if(!v('el_unit')) return {error:'Informe o tipo de unidade (Sede ou Unidade / anexo).'};
    data.matrizId=v('el_matriz');data.unitType=v('el_unit');
    if(!id){data.networkStatus='Ativa';data.statusHistory=[{at:new Date().toISOString(),user:state.user,from:'—',to:'Ativa',reason:'Cadastro da escola na rede'}];}
    if(id) return {};
    const n=v('el_secName'),m=v('el_secMail'),p=document.getElementById('el_secPass')?.value||'';
    if(!n&&!m&&!p) return {};
    if(!n||!m||!p) return {error:'Para criar a conta do secretário, preencha nome, e-mail e senha.'};
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)) return {error:'Informe um e-mail válido para o secretário.'};
    if(p.length<4) return {error:'A senha inicial deve ter ao menos 4 caracteres.'};
    if((state.mockUsers||[]).some(u=>u.email.toLowerCase()===m.toLowerCase())) return {error:'Já existe uma conta com esse e-mail.'};
    return {account:{id:crypto.randomUUID(),name:n,role:'secretaria',email:m,password:p,status:'Ativo',vinculo:null,vinculoLabel:'Secretário(a) Escolar',matricula:'FUNC-'+String((state.mockUsers||[]).length+1).padStart(4,'0')}};
  }
  // --- secretários da rede (perfil único de Secretaria) ---


  // ===== OPERADOR DE EDUCAÇÃO — acompanhamento da rede (várias escolas) =====
  // Todas as contas abaixo leem os dados de cada escola pelo schoolId, sem depender da escola "ativa" do login.
  // Os painéis trazem apenas dados agregados (escola/série/turma): nomes de alunos não são exibidos.
  const EDU_NET_STATUS=['Ativa','Suspensa','Desativada'];
  const EDU_BADGE={'Ativa':'badge-green','Suspensa':'badge-yellow','Desativada':'badge-gray','alta':'badge-red','média':'badge-yellow','baixa':'badge-blue','Ativo':'badge-green','Bloqueado':'badge-red','Inativo':'badge-gray','Aprovado':'badge-green','Recuperação':'badge-yellow','Reprovado':'badge-red'};
  const EDU_MANAGED_ROLES={direcao:'Diretor(a)',secretaria:'Secretário(a) Escolar'};
  function eduCfg(){
    if(!state.eduConfig){
      const y=new Date().getFullYear();
      state.eduConfig={minFreq:MIN_ATTENDANCE,maxFailRate:20,lowAvg:PASS_GRADE,absenceRise:5,evasionMax:5,staleDays:15,enrollDays:15,
        // Prazos iniciais de EXEMPLO: ajuste conforme o calendário oficial da rede.
        deadlines:PERIODS.map((p,i)=>({period:p,gradesDue:`${y}-${['05-22','08-07','10-02','12-18'][i]}`,attendanceDue:`${y}-${['05-22','08-07','10-02','12-18'][i]}`}))};
    }
    return state.eduConfig;
  }
  function eduNetStatus(s){return s.networkStatus||'Ativa';}
  function eduActiveSchools(){return state.schools.filter(s=>eduNetStatus(s)==='Ativa');}
  const eduPct=(a,b)=>b?Math.round(a/b*1000)/10:null;
  const eduFmt=v=>v===null||v===undefined?'—':String(v).replace('.',',');
  const eduHasVal=g=>['av1','av2','trabalho','recuperacao'].some(k=>g[k]!==null&&g[k]!==undefined&&g[k]!=='');

  // Resultado parcial por aluno (o ano letivo pode estar em andamento): Aprovado, Recuperação, Reprovado ou Sem notas
  function eduStudentRows(school,period){
    const id=school.id,cfg=eduCfg();
    const classes=(state.classes||[]).filter(c=>c.schoolId===id);
    const wcache={};const W=(cid,sub)=>{const k=cid+'|'+sub;if(!(k in wcache))wcache[k]=weightsFor(cid,sub);return wcache[k];};
    const gBy={};(state.grades||[]).filter(g=>g.schoolId===id&&(!period||g.period===period)).forEach(g=>{(gBy[g.studentId]=gBy[g.studentId]||[]).push(g);});
    const fq={};(state.lessonRecords||[]).filter(r=>r.schoolId===id).forEach(r=>(r.attendance||[]).forEach(a=>{const o=fq[a.studentId]=fq[a.studentId]||{t:0,p:0};o.t++;if(a.status==='Presente'||a.status==='Falta Justificada')o.p++;}));
    return (state.students||[]).filter(s=>s.schoolId===id).map(s=>{
      const c=classes.find(x=>x.id===s.classId);
      const base={studentId:s.id,classId:c?.id||null,grade:c?.grade||'Sem turma',classLabel:c?classLabel(c):'Sem turma',status:s.status||'Ativo',active:activeStudent(s)};
      if(!base.active) return {...base,avg:null,freq:null,result:null};
      const bySub={};(gBy[s.id]||[]).forEach(g=>{const m=gradeMedia(g,W(g.classId,g.subject));if(m!==null)(bySub[g.subject]=bySub[g.subject]||[]).push(m);});
      const meds=Object.values(bySub).map(a=>a.reduce((x,y)=>x+y,0)/a.length);
      const avg=meds.length?meds.reduce((x,y)=>x+y,0)/meds.length:null;
      const f=fq[s.id];const freq=f&&f.t?f.p/f.t*100:null;
      let result='Sem notas';
      if(meds.length){result=(meds.some(m=>m<RECOVERY_MIN)||(freq!==null&&freq<cfg.minFreq))?'Reprovado':meds.some(m=>m<PASS_GRADE)?'Recuperação':'Aprovado';}
      return {...base,avg,freq,result};
    });
  }
  function eduSchoolStats(school,period){
    const id=school.id,cfg=eduCfg();
    const rows=eduStudentRows(school,period);const active=rows.filter(r=>r.active);
    const all=(state.students||[]).filter(s=>s.schoolId===id);
    const classes=(state.classes||[]).filter(c=>c.schoolId===id);
    const recs=(state.lessonRecords||[]).filter(r=>r.schoolId===id);
    let pres=0,tot=0;recs.forEach(r=>(r.attendance||[]).forEach(a=>{tot++;if(a.status==='Presente'||a.status==='Falta Justificada')pres++;}));
    const avgs=active.map(r=>r.avg).filter(v=>v!==null);
    const res=k=>active.filter(r=>r.result===k).length;
    const withRes=active.filter(r=>r.result!=='Sem notas'&&r.result!==null).length;
    const inativos=all.filter(s=>s.status==='Inativo').length,transf=all.filter(s=>s.status==='Transferido').length;
    return {rows,alunos:active.length,turmas:classes.length,professores:(state.teachers||[]).filter(t=>t.schoolId===id).length,
      freq:tot?Math.round(pres/tot*1000)/10:null,freqTotal:tot,
      media:avgs.length?Math.round(avgs.reduce((a,b)=>a+b,0)/avgs.length*10)/10:null,
      aprovados:res('Aprovado'),recuperacao:res('Recuperação'),reprovados:res('Reprovado'),semNotas:res('Sem notas'),comResultado:withRes,
      taxaReprovacao:eduPct(res('Reprovado'),withRes),
      inativos,transferidos:transf,totalMatriculados:all.length,taxaEvasao:eduPct(inativos,all.length),
      semTurma:active.filter(r=>!r.classId).length,ultimaAula:recs.reduce((m,r)=>r.date>m?r.date:m,''),recs};
  }
  function eduNetworkTotals(){
    const sch=eduActiveSchools();const st=sch.map(s=>({s,x:eduSchoolStats(s)}));
    const alunos=st.reduce((a,o)=>a+o.x.alunos,0);
    let pres=0,tot=0;st.forEach(o=>{if(o.x.freq!==null){tot+=o.x.freqTotal;pres+=Math.round(o.x.freq/100*o.x.freqTotal);}});
    const avgs=st.map(o=>o.x.media).filter(v=>v!==null);
    const ina=st.reduce((a,o)=>a+o.x.inativos,0),totM=st.reduce((a,o)=>a+o.x.totalMatriculados,0);
    return {st,alunos,turmas:st.reduce((a,o)=>a+o.x.turmas,0),professores:st.reduce((a,o)=>a+o.x.professores,0),freq:tot?Math.round(pres/tot*1000)/10:null,media:avgs.length?Math.round(avgs.reduce((a,b)=>a+b,0)/avgs.length*10)/10:null,evasao:eduPct(ina,totM)};
  }

  // ----- painel inteligente: alertas calculados com regras explícitas e limites configuráveis -----
  function eduAlerts(){
    const cfg=eduCfg(),t=dToday(),out=[];
    const accounts=state.mockUsers||[];
    const net=eduNetworkTotals();
    state.schools.forEach(s=>{
      const nm=s.name;const add=(a)=>out.push({schoolId:s.id,school:nm,...a});
      if(eduNetStatus(s)!=='Ativa'){add({key:`status:${s.id}`,severity:'baixa',type:'Situação na rede',title:`Escola ${eduNetStatus(s).toLowerCase()}`,text:'Escola fora de operação na rede: seus usuários não conseguem acessar o sistema.',evidence:[['Situação',eduNetStatus(s)]],page:'eduSchools'});return;}
      // dados cadastrais
      const need=[['inep','Código INEP'],['address','Endereço'],['city','Município'],['phone','Telefone'],['email','E-mail institucional'],['managerName','Gestor(a)'],['managerEmail','E-mail do gestor']];
      if(dNet(s)==='Privada') need.push(['cnpj','CNPJ']);
      const miss=need.filter(([k])=>!String(s[k]||'').trim()).map(x=>x[1]);
      if(!(s.stagesOffered||[]).length) miss.push('Etapas de ensino');
      if(!s.matrizId) miss.push('Matriz vinculada');
      if(miss.length) add({key:`dados:${s.id}`,severity:'média',type:'Dados incompletos',title:`Cadastro incompleto (${miss.length} campo${miss.length>1?'s':''})`,text:'A escola ainda não preencheu todas as informações cadastrais.',evidence:miss.map(m=>['Faltando',m]),page:'eduSchools'});
      // acessos
      const dir=accounts.filter(u=>u.schoolId===s.id&&u.role==='direcao'&&u.status==='Ativo').length,sec=accounts.filter(u=>u.schoolId===s.id&&u.role==='secretaria'&&u.status==='Ativo').length;
      if(!dir||!sec) add({key:`acesso:${s.id}`,severity:'média',type:'Usuários',title:!dir&&!sec?'Sem diretor(a) e secretário(a) com acesso':!dir?'Sem diretor(a) com acesso':'Sem secretário(a) com acesso',text:'Sem esse responsável a escola não consegue atualizar seus dados.',evidence:[['Diretores ativos',dir],['Secretários ativos',sec]],page:'eduUsers'});
      const x=eduSchoolStats(s);
      if(!x.turmas){add({key:`semdados:${s.id}`,severity:'baixa',type:'Dados acadêmicos',title:'Sem turmas cadastradas',text:'Não há turmas nem alunos para acompanhar nesta escola.',evidence:[['Turmas',0],['Alunos ativos',x.alunos]],page:'eduPedagogy'});return;}
      if(x.semTurma) add({key:`semturma:${s.id}`,severity:'média',type:'Matrículas',title:`${x.semTurma} aluno(s) sem turma`,text:'Alunos ativos sem turma não aparecem em diários, notas e frequência.',evidence:[['Alunos sem turma',x.semTurma],['Alunos ativos',x.alunos]],page:'eduPedagogy'});
      // matrículas paradas
      const pend=(state.enrollmentRequests||[]).filter(r=>r.schoolId===s.id&&['Em análise','Pendente de documentos'].includes(r.status)&&r.requestDate&&dDiff(r.requestDate,t)>cfg.enrollDays);
      if(pend.length) add({key:`matricula:${s.id}`,severity:'média',type:'Matrículas',title:`${pend.length} solicitação(ões) parada(s) há mais de ${cfg.enrollDays} dias`,text:'Solicitações de matrícula, transferência ou similares sem conclusão.',evidence:pend.slice(0,8).map(r=>[r.type,`${r.status} desde ${formatDate(r.requestDate)}`]),page:'eduReports'});
      // frequência
      if(x.ultimaAula&&dDiff(x.ultimaAula,t)>cfg.staleDays) add({key:`freqvelha:${s.id}`,severity:'média',type:'Frequência',title:`Frequência desatualizada (último registro em ${formatDate(x.ultimaAula)})`,text:`Nenhum diário lançado há mais de ${cfg.staleDays} dias.`,evidence:[['Último registro',formatDate(x.ultimaAula)],['Dias sem lançamento',dDiff(x.ultimaAula,t)],['Limite configurado',cfg.staleDays+' dias']],page:'eduCalendar'});
      if(x.freq!==null&&x.freq<cfg.minFreq) add({key:`freqbaixa:${s.id}`,severity:'alta',type:'Frequência',title:`Frequência média baixa (${eduFmt(x.freq)}%)`,text:`Abaixo do mínimo configurado de ${cfg.minFreq}%.`,evidence:[['Frequência da escola',eduFmt(x.freq)+'%'],['Mínimo',cfg.minFreq+'%'],['Registros de presença',x.freqTotal]],page:'eduPedagogy'});
      // aumento de faltas: janela recente x janela anterior (28 dias cada, a partir do último registro)
      if(x.ultimaAula){
        const end=x.ultimaAula,rs=dAdd(end,-27),ps=dAdd(end,-55);let r1=[0,0],r2=[0,0];
        x.recs.forEach(r=>(r.attendance||[]).forEach(a=>{const f=!(a.status==='Presente'||a.status==='Falta Justificada');if(r.date>=rs&&r.date<=end){r1[0]++;if(f)r1[1]++;}else if(r.date>=ps&&r.date<rs){r2[0]++;if(f)r2[1]++;}}));
        if(r1[0]>=30&&r2[0]>=30){const a1=r1[1]/r1[0]*100,a2=r2[1]/r2[0]*100;
          if(a1-a2>=cfg.absenceRise) add({key:`faltas:${s.id}`,severity:a1-a2>=cfg.absenceRise*2?'alta':'média',type:'Frequência',title:`Aumento de faltas (${eduFmt(Math.round(a2*10)/10)}% → ${eduFmt(Math.round(a1*10)/10)}%)`,text:'A taxa de faltas dos últimos 28 dias registrados é maior que a dos 28 dias anteriores.',evidence:[['Faltas nos últimos 28 dias',`${eduFmt(Math.round(a1*10)/10)}% (${r1[1]} de ${r1[0]})`],['Faltas nos 28 dias anteriores',`${eduFmt(Math.round(a2*10)/10)}% (${r2[1]} de ${r2[0]})`],['Aumento mínimo para alertar',cfg.absenceRise+' pontos percentuais']],page:'eduPedagogy'});}
      }
      // notas pendentes após o prazo
      cfg.deadlines.filter(d=>d.gradesDue&&d.gradesDue<t).forEach(d=>{
        const {expected,launched,pending}=eduGradePending(s,d);
        if(expected&&pending/expected>0.05) add({key:`notas:${s.id}:${d.period}`,severity:pending/expected>0.3?'alta':'média',type:'Notas',title:`${pending} nota(s) pendente(s) — ${d.period}`,text:`Prazo de lançamento encerrado em ${formatDate(d.gradesDue)}.`,evidence:[['Notas esperadas',expected],['Notas lançadas',launched],['Pendentes',`${pending} (${eduFmt(eduPct(pending,expected))}%)`],['Prazo',formatDate(d.gradesDue)]],page:'eduCalendar'});
      });
      // rendimento, reprovação, evasão
      if(x.media!==null&&x.media<cfg.lowAvg) add({key:`media:${s.id}`,severity:'alta',type:'Rendimento',title:`Baixo rendimento (média ${eduFmt(x.media)})`,text:`Média geral abaixo de ${cfg.lowAvg}.`,evidence:[['Média da escola',eduFmt(x.media)],['Média da rede',eduFmt(net.media)],['Alunos com notas',x.comResultado]],page:'eduPedagogy'});
      if(x.taxaReprovacao!==null&&x.comResultado>=10&&x.taxaReprovacao>cfg.maxFailRate) add({key:`reprov:${s.id}`,severity:'alta',type:'Rendimento',title:`Reprovação acima do esperado (${eduFmt(x.taxaReprovacao)}%)`,text:`Resultado parcial acima do limite de ${cfg.maxFailRate}%.`,evidence:[['Reprovados (parcial)',x.reprovados],['Alunos com resultado',x.comResultado],['Taxa',eduFmt(x.taxaReprovacao)+'%'],['Limite',cfg.maxFailRate+'%']],page:'eduPedagogy'});
      if(x.taxaEvasao!==null&&x.totalMatriculados>=10&&x.taxaEvasao>cfg.evasionMax) add({key:`evasao:${s.id}`,severity:'média',type:'Evasão',title:`Evasão acima do limite (${eduFmt(x.taxaEvasao)}%)`,text:'Proporção de alunos com situação "Inativo" entre os matriculados.',evidence:[['Alunos inativos',x.inativos],['Total de matriculados',x.totalMatriculados],['Limite',cfg.evasionMax+'%']],page:'eduPedagogy'});
    });
    const rank={alta:0,média:1,baixa:2};
    return out.sort((a,b)=>rank[a.severity]-rank[b.severity]||a.school.localeCompare(b.school));
  }
  // notificações persistentes (uma por alerta e por mês); geradas ao abrir as telas do Operador
  function eduSync(){
    const alerts=eduAlerts();const list=state.eduNotifications=state.eduNotifications||[];const has=new Set(list.map(n=>n.key));const month=dToday().slice(0,7);let added=0;
    alerts.filter(a=>a.severity!=='baixa').forEach(a=>{const key=`${a.key}:${month}`;if(has.has(key))return;has.add(key);added++;list.unshift({id:crypto.randomUUID(),key,schoolId:a.schoolId,severity:a.severity,type:a.type,text:`${a.school}: ${a.title}`,date:new Date().toISOString(),read:false});});
    if(list.length>500)list.length=500;
    if(added)save();
    return alerts;
  }
  function eduUnread(){return (state.eduNotifications||[]).filter(n=>!n.read).length;}
  function openEduAlertEvidence(a){
    openModal(`${a.school} — ${a.type}`,`<p><b>${dE(a.title)}</b></p><p>${dE(a.text)}</p>${dSection('Dados que justificam o alerta')}<div class="detail-grid">${a.evidence.map(e=>`<div><b>${dE(e[0])}</b><span>${dE(String(e[1]))}</span></div>`).join('')}</div><p class="muted" style="margin-top:12px">Alertas são calculados com as regras e limites configurados em “Pendências e notificações”; servem para priorizar o acompanhamento, não para concluir responsabilidade.</p>`);
  }

  // ----- painel geral -----
  function renderEduDashboard(){
    if(!can('educacao','view')) return renderAccessDenied('Painel geral');
    const alerts=eduSync();const net=eduNetworkTotals();const sch=state.schools;
    const cnt=st=>sch.filter(s=>eduNetStatus(s)===st).length;
    const score={};alerts.forEach(a=>{score[a.schoolId]=(score[a.schoolId]||0)+({alta:3,média:2,baixa:1}[a.severity]||1);});
    const attention=Object.entries(score).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const byType={};alerts.forEach(a=>{byType[a.type]=(byType[a.type]||0)+1;});
    const panel=(t,b)=>`<div class="card"><div class="card-title"><div><h3>${t}</h3></div></div>${b}</div>`;
    const bars=(fn)=>dBars(net.st.map(o=>({label:o.s.name,value:fn(o.x)||0})));
    content.innerHTML=`${pageHeader('Painel geral da rede','Indicadores consolidados das escolas e alertas que pedem acompanhamento.',can('educacao','create')?'<button class="btn-primary" id="edNewSchool"><i class="fa-solid fa-plus"></i> Cadastrar escola</button>':'')}
      ${!sch.length?'<div class="alert alert-info"><b>Nenhuma escola cadastrada.</b> Comece por “Matrizes” e depois “Gestão de escolas”.</div>':''}
      <div class="stat-grid">${statCard('Escolas ativas',cnt('Ativa'),'fa-school')}${statCard('Suspensas / desativadas',cnt('Suspensa')+cnt('Desativada'),'fa-circle-pause')}${statCard('Alunos matriculados',net.alunos,'fa-user-graduate')}${statCard('Turmas',net.turmas,'fa-people-roof')}${statCard('Professores',net.professores,'fa-chalkboard-user')}${statCard('Frequência média',net.freq===null?'—':eduFmt(net.freq)+'%','fa-clipboard-check')}${statCard('Média geral',eduFmt(net.media),'fa-marker')}${statCard('Evasão',net.evasao===null?'—':eduFmt(net.evasao)+'%','fa-person-walking-arrow-right')}${statCard('Alertas de alta prioridade',alerts.filter(a=>a.severity==='alta').length,'fa-triangle-exclamation')}${statCard('Notificações não lidas',eduUnread(),'fa-bell')}</div>
      <div class="dies-grid">
        ${panel('Painel inteligente — o que exige atenção',alerts.length?`<div class="timeline">${alerts.slice(0,8).map((a,i)=>`<div><span class="badge ${EDU_BADGE[a.severity]}">${a.severity}</span> <b>${dE(a.school)}</b> — ${dE(a.title)} <button class="small-button ed-ev" data-i="${i}" title="Ver dados que justificam o alerta"><i class="fa-solid fa-magnifying-glass-chart"></i></button></div>`).join('')}</div>${alerts.length>8?'<p class="muted">Veja todos em “Pendências e notificações”.</p>':''}`:'<p class="muted">Nenhum alerta no momento.</p>')}
        ${panel('Escolas que mais precisam de acompanhamento',attention.length?`<div class="timeline">${attention.map(([id,sc])=>`<div><b>${dE(dSchoolName(id))}</b> — ${alerts.filter(a=>a.schoolId===id).length} alerta(s) <span class="badge ${sc>=6?'badge-red':'badge-yellow'}">pontuação ${sc}</span></div>`).join('')}</div>`:'<p class="muted">Sem escolas em destaque.</p>')}
        ${panel('Alunos ativos por escola',bars(x=>x.alunos))}
        ${panel('Frequência média por escola (%)',bars(x=>x.freq))}
        ${panel('Média geral por escola',bars(x=>x.media))}
        ${panel('Alertas por tipo',dBars(Object.entries(byType).map(([label,value])=>({label,value}))))}
      </div>`;
    document.getElementById('edNewSchool')?.addEventListener('click',()=>openSchoolEditor(null));
    document.querySelectorAll('.ed-ev').forEach(b=>b.onclick=()=>openEduAlertEvidence(alerts[Number(b.dataset.i)]));
  }

  // ----- gestão de escolas -----
  function renderEduSchools(){
    if(!can('educacao','view')) return renderAccessDenied('Gestão de escolas');
    const f=window.__esf=window.__esf||{q:'',matriz:'',unit:'',status:''};
    content.innerHTML=`${pageHeader('Gestão de escolas','Cadastre, edite e acompanhe a situação das escolas da rede.',can('estrutura','create')?'<button class="btn-primary" id="esNew"><i class="fa-solid fa-plus"></i> Cadastrar escola</button>':'')}
      <div class="table-card"><div style="display:flex;gap:10px;flex-wrap:wrap;padding:16px"><input id="esQ" type="search" placeholder="Buscar por nome, INEP ou município" value="${dE(f.q)}" style="flex:1;min-width:200px"><select id="esM"><option value="">Todas as matrizes</option>${eduMatrizes().map(m=>`<option value="${m.id}" ${m.id===f.matriz?'selected':''}>${dE(m.name)}</option>`).join('')}<option value="none" ${f.matriz==='none'?'selected':''}>Sem matriz</option></select><select id="esU">${optionsHtml(EDU_UNITS,f.unit,'Todos os tipos')}</select><select id="esS">${optionsHtml(EDU_NET_STATUS,f.status,'Toda situação')}</select></div><div id="esTbl"></div></div>`;
    const alerts=eduAlerts();
    const draw=()=>{
      const q=f.q.trim().toLowerCase();
      const l=state.schools.filter(s=>(!q||[s.name,s.inep,s.city].some(v=>String(v||'').toLowerCase().includes(q)))&&(!f.matriz||(f.matriz==='none'?!s.matrizId:s.matrizId===f.matriz))&&(!f.unit||s.unitType===f.unit)&&(!f.status||eduNetStatus(s)===f.status)).sort((a,b)=>a.name.localeCompare(b.name));const p=paginate(l,'esc');
      document.getElementById('esTbl').innerHTML=`<div class="table-wrap"><table><thead><tr><th>Escola</th><th>INEP</th><th>Município/UF</th><th>Matriz</th><th>Unidade</th><th>Situação na rede</th><th>Alunos</th><th>Alertas</th><th>Ações</th></tr></thead><tbody>${p.slice.length?p.slice.map(s=>`<tr><td><strong>${dE(s.name)}</strong></td><td>${dE(s.inep||'—')}</td><td>${dE([s.city,s.state].filter(Boolean).join('/')||'—')}</td><td>${s.matrizId?dE(eduMatrizName(s.matrizId)):'<span class="badge badge-yellow">Sem matriz</span>'}</td><td>${dE(s.unitType||'—')}</td><td>${badge(eduNetStatus(s),EDU_BADGE)}</td><td>${(state.students||[]).filter(x=>x.schoolId===s.id&&activeStudent(x)).length}</td><td>${alerts.filter(a=>a.schoolId===s.id&&a.severity!=='baixa').length}</td><td><button class="small-button es-view" data-id="${s.id}" title="Consultar"><i class="fa-solid fa-eye"></i></button>${can('estrutura','edit')?`<button class="small-button es-edit" data-id="${s.id}" title="Editar dados"><i class="fa-solid fa-pen"></i></button>`:''}${can('educacao','approve')?`<button class="small-button es-status" data-id="${s.id}" title="Alterar situação (ativar, suspender, desativar)"><i class="fa-solid fa-power-off"></i></button>`:''}</td></tr>`).join(''):`<tr><td colspan="9"><div class="empty-state" style="border:none">${state.schools.length?'Nenhuma escola encontrada.':'Nenhuma escola cadastrada.'}</div></td></tr>`}</tbody></table></div>${paginationHtml(p,'esc')}`;
      bindPagination('esc',draw);
      document.querySelectorAll('.es-edit').forEach(b=>b.onclick=()=>openSchoolEditor(b.dataset.id));
      document.querySelectorAll('.es-view').forEach(b=>b.onclick=()=>openEduSchool(b.dataset.id));
      document.querySelectorAll('.es-status').forEach(b=>b.onclick=()=>openEduStatus(b.dataset.id));
    };
    [['esQ','q','oninput'],['esM','matriz','onchange'],['esU','unit','onchange'],['esS','status','onchange']].forEach(([id,k,ev])=>document.getElementById(id)[ev]=e=>{f[k]=e.target.value;dResetPg('esc');draw();});
    document.getElementById('esNew')?.addEventListener('click',()=>openSchoolEditor(null));
    draw();
  }
  function openEduSchool(id){
    const s=dSchool(id);if(!s)return;const x=eduSchoolStats(s);const al=eduAlerts().filter(a=>a.schoolId===id);
    const acc=(state.mockUsers||[]).filter(u=>u.schoolId===id&&EDU_MANAGED_ROLES[u.role]);
    openModal(s.name,`<div class="detail-grid">${dRow('Situação na rede',eduNetStatus(s))}${dRow('Matriz',s.matrizId?eduMatrizName(s.matrizId):'')}${dRow('Tipo de unidade',s.unitType)}${dRow('INEP',s.inep)}${dRow('CNPJ',s.cnpj)}${dRow('Rede',`${dNet(s)}${s.dependency?' ('+s.dependency+')':''}`)}${dRow('Endereço',[s.address,s.number,s.neighborhood].filter(Boolean).join(', '))}${dRow('Município/UF',[s.city,s.state].filter(Boolean).join('/'))}${dRow('Telefone',s.phone)}${dRow('E-mail',s.email)}${dRow('Responsável',[s.managerName,s.managerRole].filter(Boolean).join(' — '))}${dRow('E-mail do responsável',s.managerEmail)}${dRow('Funcionamento',s.operatingStatus)}</div>
      ${dSection('Indicadores')}<div class="detail-grid">${dRow('Alunos ativos',String(x.alunos))}${dRow('Turmas',String(x.turmas))}${dRow('Professores',String(x.professores))}${dRow('Frequência média',x.freq===null?'':eduFmt(x.freq)+'%')}${dRow('Média geral',eduFmt(x.media))}${dRow('Evasão',x.taxaEvasao===null?'':eduFmt(x.taxaEvasao)+'%')}</div>
      ${dSection('Acessos (diretores e secretários)')}${acc.length?`<ul style="padding-left:18px">${acc.map(u=>`<li>${dE(u.name)} — ${dE(EDU_MANAGED_ROLES[u.role])} (${dE(u.status||'Ativo')})</li>`).join('')}</ul>`:'<p class="muted">Nenhum diretor ou secretário com conta nesta escola.</p>'}
      ${dSection('Pendências e alertas')}${al.length?`<ul style="padding-left:18px">${al.map(a=>`<li><span class="badge ${EDU_BADGE[a.severity]}">${a.severity}</span> ${dE(a.title)}</li>`).join('')}</ul>`:'<p class="muted">Nenhum alerta para esta escola.</p>'}
      ${dSection('Histórico de situação')}${dHistHtml({history:(s.statusHistory||[]).map(h=>({at:h.at,user:h.user,text:`${h.from} → ${h.to}: ${h.reason}`}))})}`);
  }
  function openEduStatus(id){
    if(!can('educacao','approve')) return denyToast('approve');
    const s=dSchool(id);if(!s)return;const cur=eduNetStatus(s);const x=eduSchoolStats(s);
    openModal(`Situação na rede — ${s.name}`,`<form id="stForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="alert alert-info">Situação atual: <b>${cur}</b>. Escolas suspensas ou desativadas ficam sem acesso ao sistema (exceto Operador de Educação e DIES). Nenhum dado é apagado.${x.alunos?` Esta escola tem <b>${x.alunos}</b> aluno(s) ativo(s).`:''}</div><div class="form-grid"><div><label>Nova situação *</label><select id="stNew">${optionsHtml(EDU_NET_STATUS.filter(v=>v!==cur),'','Selecione')}</select></div><div class="full"><label>Justificativa *</label><textarea id="stWhy" rows="3"></textarea></div></div><div class="form-actions"><button class="btn-primary">Confirmar alteração</button></div></form>`);
    document.getElementById('stForm').onsubmit=e=>{
      e.preventDefault();const to=document.getElementById('stNew').value,why=document.getElementById('stWhy').value.trim();
      if(!to) return formError('Selecione a nova situação.');if(why.length<5) return formError('Informe a justificativa (mínimo de 5 caracteres).');
      s.statusHistory=s.statusHistory||[];s.statusHistory.push({at:new Date().toISOString(),user:state.user,from:cur,to,reason:why});s.networkStatus=to;
      logAudit('Departamento de Educação','Situação da escola',`${s.name}: ${cur} → ${to} — ${why}`,s.id);save();closeModal();renderEduSchools();showToast(`Escola ${to.toLowerCase()}.`);
    };
  }

  // ----- usuários e acessos -----
  function eduTempPassword(){return Array.from(crypto.getRandomValues(new Uint8Array(8)),b=>'abcdefghjkmnpqrstuvwxyz23456789'[b%31]).join('');}
  function renderEduUsers(){
    if(!can('educacao','view')) return renderAccessDenied('Usuários e acessos');
    const f=window.__euf=window.__euf||{tab:'contas',q:'',school:'',role:''};const canEdit=can('educacao','edit');
    content.innerHTML=`${pageHeader('Usuários e acessos','Contas de diretores e secretários, vínculo de funcionários com as escolas e módulos liberados para cada usuário.',canEdit&&f.tab==='contas'?'<button class="btn-primary" id="euNew"><i class="fa-solid fa-user-plus"></i> Nova conta</button>':'')}
      <div class="calendar-tabs"><button type="button" class="calendar-tab ${f.tab==='contas'?'active':''}" data-tab="contas">Contas de acesso</button><button type="button" class="calendar-tab ${f.tab==='func'?'active':''}" data-tab="func">Funcionários e escolas</button></div>
      <div class="table-card"><div style="display:flex;gap:10px;flex-wrap:wrap;padding:16px"><input id="euQ" type="search" placeholder="Buscar por nome${f.tab==='contas'?' ou e-mail':' ou cargo'}" value="${dE(f.q)}" style="flex:1;min-width:200px"><select id="euS"><option value="">Todas as escolas</option>${schoolOptions(f.school)}</select>${f.tab==='contas'?`<select id="euR">${optionsHtml(Object.values(EDU_MANAGED_ROLES),f.role,'Todos os perfis')}</select>`:''}</div><div id="euTbl"></div></div>`;
    document.querySelectorAll('.calendar-tab').forEach(b=>b.onclick=()=>{f.tab=b.dataset.tab;f.q='';f.role='';dResetPg('eus');renderEduUsers();});
    const draw=()=>{
      const q=f.q.trim().toLowerCase();const box=document.getElementById('euTbl');
      if(f.tab==='contas'){
        const l=(state.mockUsers||[]).filter(u=>EDU_MANAGED_ROLES[u.role]&&(!f.school||u.schoolId===f.school)&&(!f.role||EDU_MANAGED_ROLES[u.role]===f.role)&&(!q||(u.name+' '+u.email).toLowerCase().includes(q))).sort((a,b)=>a.name.localeCompare(b.name));const p=paginate(l,'eus');
        box.innerHTML=`<div class="table-wrap"><table><thead><tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Escola</th><th>Situação</th><th>Módulos restritos</th><th>Ações</th></tr></thead><tbody>${p.slice.length?p.slice.map(u=>`<tr><td><strong>${dE(u.name)}</strong></td><td>${dE(u.email)}</td><td>${dE(EDU_MANAGED_ROLES[u.role])}</td><td>${dE(dSchoolName(u.schoolId))}</td><td>${badge(u.status||'Ativo',EDU_BADGE)}</td><td>${(state.userAccess?.[u.id]?.blocked||[]).length}</td><td>${canEdit?`<button class="small-button eu-block" data-id="${u.id}" title="${(u.status||'Ativo')==='Ativo'?'Bloquear acesso':'Liberar acesso'}"><i class="fa-solid ${(u.status||'Ativo')==='Ativo'?'fa-user-lock':'fa-user-check'}"></i></button><button class="small-button eu-pass" data-id="${u.id}" title="Redefinir senha"><i class="fa-solid fa-key"></i></button><button class="small-button eu-mods" data-id="${u.id}" title="Módulos que o usuário pode acessar"><i class="fa-solid fa-sliders"></i></button>`:''}</td></tr>`).join(''):'<tr><td colspan="7"><div class="empty-state" style="border:none">Nenhuma conta encontrada.</div></td></tr>'}</tbody></table></div>${paginationHtml(p,'eus')}`;
        bindPagination('eus',draw);
        document.querySelectorAll('.eu-block').forEach(b=>b.onclick=()=>eduToggleBlock(b.dataset.id));
        document.querySelectorAll('.eu-pass').forEach(b=>b.onclick=()=>eduResetPassword(b.dataset.id));
        document.querySelectorAll('.eu-mods').forEach(b=>b.onclick=()=>eduModules(b.dataset.id));
      }else{
        const l=(state.employees||[]).filter(e=>(!f.school||e.schoolId===f.school)&&(!q||(e.name+' '+(e.role||'')).toLowerCase().includes(q))).sort((a,b)=>a.name.localeCompare(b.name));const p=paginate(l,'eus');
        box.innerHTML=`<div class="table-wrap"><table><thead><tr><th>Nome</th><th>Cargo</th><th>Tipo</th><th>Escola atual</th><th>Ações</th></tr></thead><tbody>${p.slice.length?p.slice.map(e=>`<tr><td><strong>${dE(e.name)}</strong></td><td>${dE(e.role||'—')}</td><td>${dE(e.type||'—')}</td><td>${dE(dSchoolName(e.schoolId))}</td><td>${canEdit?`<button class="small-button eu-link" data-id="${e.id}" title="Vincular a outra escola"><i class="fa-solid fa-link"></i></button>`:''}</td></tr>`).join(''):'<tr><td colspan="5"><div class="empty-state" style="border:none">Nenhum funcionário encontrado.</div></td></tr>'}</tbody></table></div>${paginationHtml(p,'eus')}`;
        bindPagination('eus',draw);
        document.querySelectorAll('.eu-link').forEach(b=>b.onclick=()=>eduLinkEmployee(b.dataset.id));
      }
    };
    document.getElementById('euQ').oninput=e=>{f.q=e.target.value;dResetPg('eus');draw();};
    document.getElementById('euS').onchange=e=>{f.school=e.target.value;dResetPg('eus');draw();};
    document.getElementById('euR')?.addEventListener('change',e=>{f.role=e.target.value;dResetPg('eus');draw();});
    document.getElementById('euNew')?.addEventListener('click',openEduAccount);
    draw();
  }
  function openEduAccount(){
    if(!can('educacao','create')&&!can('educacao','edit')) return denyToast('create');
    if(!state.schools.length) return showToast('Cadastre uma escola antes de criar contas.');
    openModal('Nova conta de acesso',`<form id="acForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid">
      <div><label>Perfil *</label><select id="acRole">${Object.entries(EDU_MANAGED_ROLES).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></div>
      <div><label>Escola *</label><select id="acSchool">${schoolOptions('')}</select></div>
      <div class="full"><label>Nome completo *</label><input id="acName"></div>
      <div><label>E-mail de acesso *</label><input id="acMail" type="email"></div>
      <div><label>Senha inicial * <button type="button" class="small-button" id="acGen" title="Gerar senha temporária"><i class="fa-solid fa-wand-magic-sparkles"></i></button></label><input id="acPass" type="text" autocomplete="off"></div></div>
      <small class="muted">Mínimo de 6 caracteres. Repasse a senha ao usuário por um canal seguro.</small><div class="form-actions"><button class="btn-primary">Criar conta</button></div></form>`);
    document.getElementById('acGen').onclick=()=>{document.getElementById('acPass').value=eduTempPassword();};
    document.getElementById('acForm').onsubmit=e=>{
      e.preventDefault();const v=i=>document.getElementById(i).value.trim();
      if(v('acName').length<3) return formError('Informe o nome completo.');
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('acMail'))) return formError('Informe um e-mail válido.');
      if((state.mockUsers||[]).some(u=>u.email.toLowerCase()===v('acMail').toLowerCase())) return formError('Já existe uma conta com esse e-mail.');
      if(v('acPass').length<6) return formError('A senha inicial deve ter ao menos 6 caracteres.');
      const role=v('acRole');
      state.mockUsers.push({id:crypto.randomUUID(),name:v('acName'),role,email:v('acMail'),password:v('acPass'),schoolId:v('acSchool'),status:'Ativo',vinculo:null,vinculoLabel:EDU_MANAGED_ROLES[role],matricula:'FUNC-'+String(state.mockUsers.length+1).padStart(4,'0')});
      logAudit('Usuários','Criação de conta',`${v('acName')} (${EDU_MANAGED_ROLES[role]}) — ${dSchoolName(v('acSchool'))}`,v('acSchool'));save();closeModal();renderEduUsers();showToast('Conta criada.');
    };
  }
  function eduUser(id){const u=(state.mockUsers||[]).find(x=>x.id===id);return u&&EDU_MANAGED_ROLES[u.role]?u:null;}
  function eduToggleBlock(id){
    if(!can('educacao','edit')) return denyToast('edit');const u=eduUser(id);if(!u)return;const block=(u.status||'Ativo')==='Ativo';
    confirmAction(block?'Bloquear acesso':'Liberar acesso',`${block?'Bloquear':'Liberar'} o acesso de ${dE(u.name)}?${block&&u.role==='direcao'&&(state.mockUsers||[]).filter(x=>x.schoolId===u.schoolId&&x.role==='direcao'&&x.status==='Ativo').length<=1?' <b>Atenção: é a única Direção ativa da escola.</b>':''}`,()=>{u.status=block?'Bloqueado':'Ativo';logAudit('Usuários',block?'Bloqueio de acesso':'Liberação de acesso',u.name,u.schoolId);save();renderEduUsers();showToast(block?'Acesso bloqueado.':'Acesso liberado.');},block?'Bloquear':'Liberar');
  }
  function eduResetPassword(id){
    if(!can('educacao','edit')) return denyToast('edit');const u=eduUser(id);if(!u)return;
    openModal(`Redefinir senha — ${u.name}`,`<form id="rpForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid"><div class="full"><label>Nova senha * <button type="button" class="small-button" id="rpGen" title="Gerar senha temporária"><i class="fa-solid fa-wand-magic-sparkles"></i></button></label><input id="rpNew" type="text" autocomplete="off"></div></div><small class="muted">Mínimo de 6 caracteres. A senha não é registrada no histórico.</small><div class="form-actions"><button class="btn-primary">Salvar nova senha</button></div></form>`);
    document.getElementById('rpGen').onclick=()=>{document.getElementById('rpNew').value=eduTempPassword();};
    document.getElementById('rpForm').onsubmit=e=>{e.preventDefault();const p=document.getElementById('rpNew').value.trim();if(p.length<6)return formError('A senha deve ter ao menos 6 caracteres.');u.password=p;logAudit('Usuários','Redefinição de senha',u.name,u.schoolId);save();closeModal();showToast('Senha redefinida.');};
  }
  // O Operador pode restringir módulos por usuário (nunca ampliar além do perfil, que é definido pela Direção em "Permissões por Perfil")
  function eduModules(id){
    if(!can('educacao','edit')) return denyToast('edit');const u=eduUser(id);if(!u)return;
    const roleP=state.permissions?.[u.role]||{};const mods=PERMISSION_MODULES.filter(m=>roleP[m]?.view&&!['permissoes','dies','educacao'].includes(m));
    const blocked=state.userAccess?.[u.id]?.blocked||[];
    openModal(`Módulos de ${u.name}`,`<form id="mdForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><p class="muted">Desmarque os módulos que este usuário <b>não</b> deve acessar. Só é possível restringir o que o perfil ${dE(EDU_MANAGED_ROLES[u.role])} já permite.</p><div class="form-grid">${mods.map(m=>`<label style="display:flex;gap:8px;align-items:center;font-weight:500"><input type="checkbox" class="md-ck" value="${m}" ${blocked.includes(m)?'':'checked'} style="width:auto"> ${dE(MODULE_LABELS[m]||m)}</label>`).join('')}</div><div class="form-actions"><button class="btn-primary">Salvar acessos</button></div></form>`);
    document.getElementById('mdForm').onsubmit=e=>{
      e.preventDefault();const allowed=[...document.querySelectorAll('#mdForm .md-ck:checked')].map(x=>x.value);const nb=mods.filter(m=>!allowed.includes(m));
      state.userAccess=state.userAccess||{};if(nb.length)state.userAccess[u.id]={blocked:nb};else delete state.userAccess[u.id];
      logAudit('Usuários','Módulos do usuário',`${u.name}: ${nb.length} módulo(s) restrito(s)`,u.schoolId);save();closeModal();renderEduUsers();showToast('Acessos atualizados.');
    };
  }
  function eduLinkEmployee(id){
    if(!can('educacao','edit')) return denyToast('edit');const e=(state.employees||[]).find(x=>x.id===id);if(!e)return;
    openModal(`Vincular ${e.name}`,`<form id="lkForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><p>Escola atual: <b>${dE(dSchoolName(e.schoolId))}</b></p><div class="form-grid"><div class="full"><label>Nova escola *</label><select id="lkSchool">${schoolOptions(e.schoolId)}</select></div></div><div class="form-actions"><button class="btn-primary">Vincular</button></div></form>`);
    document.getElementById('lkForm').onsubmit=ev=>{
      ev.preventDefault();const to=document.getElementById('lkSchool').value;if(to===e.schoolId) return formError('Escolha uma escola diferente da atual.');
      const t=e.type==='Professor'?(state.teachers||[]).find(x=>x.schoolId===e.schoolId&&x.name===e.name):null;
      if(t&&(state.teacherAssignments||[]).some(a=>a.teacherId===t.id)) return formError('Este professor tem turmas atribuídas na escola atual. Remova as atribuições antes de transferi-lo.');
      const from=e.schoolId;e.schoolId=to;if(t){t.schoolId=to;t.classId=null;t.className='Sem vínculo';}
      e.hrHistory=e.hrHistory||[];e.hrHistory.push({at:new Date().toISOString(),user:state.user,text:`Vinculado à escola ${dSchoolName(to)} (antes: ${dSchoolName(from)})`});
      logAudit('Departamento de Educação','Vínculo de funcionário',`${e.name}: ${dSchoolName(from)} → ${dSchoolName(to)}`,to);save();closeModal();renderEduUsers();showToast('Funcionário vinculado.');
    };
  }

  // ----- acompanhamento pedagógico (por escola, série ou turma) -----
  function eduGradePending(s,d){
    const cls=(state.classes||[]).filter(c=>c.schoolId===s.id);const alunos=eduStudentRows(s).filter(r=>r.active&&r.classId);
    const expected=alunos.reduce((a,r)=>a+((cls.find(c=>c.id===r.classId)?.subjects||[]).length),0);
    const launched=(state.grades||[]).filter(g=>g.schoolId===s.id&&g.period===d.period&&eduHasVal(g)).length;
    return {expected,launched,pending:Math.max(0,expected-launched)};
  }
  function eduPedRows(f){
    const cfg=eduCfg();const B={};
    eduActiveSchools().filter(s=>!f.school||s.id===f.school).forEach(s=>{
      eduStudentRows(s,f.period||'').forEach(r=>{
        if(f.grade&&r.grade!==f.grade) return;
        const key=f.group==='serie'?r.grade:f.group==='turma'?s.id+'|'+(r.classId||'-'):s.id;
        const label=f.group==='serie'?r.grade:f.group==='turma'?`${s.name} — ${r.classLabel}`:s.name;
        const b=B[key]=B[key]||{label,total:0,alunos:0,avgs:[],freqs:[],apr:0,rec:0,rep:0,sem:0,ina:0};
        b.total++;if(r.status==='Inativo')b.ina++;
        if(!r.active)return;b.alunos++;if(r.avg!==null)b.avgs.push(r.avg);if(r.freq!==null)b.freqs.push(r.freq);
        if(r.result==='Aprovado')b.apr++;else if(r.result==='Recuperação')b.rec++;else if(r.result==='Reprovado')b.rep++;else b.sem++;
      });
    });
    const mean=a=>a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length*10)/10:null;
    return Object.values(B).map(b=>{const com=b.apr+b.rec+b.rep;const flags=[];const media=mean(b.avgs),freq=mean(b.freqs),rr=eduPct(b.rep,com);
      if(media!==null&&media<cfg.lowAvg)flags.push('Baixo rendimento');if(freq!==null&&freq<cfg.minFreq)flags.push('Frequência baixa');if(rr!==null&&com>=10&&rr>cfg.maxFailRate)flags.push('Reprovação alta');
      return {label:b.label,alunos:b.alunos,media,freq,apr:b.apr,rec:b.rec,rep:b.rep,sem:b.sem,evasao:eduPct(b.ina,b.total),flags};}).sort((a,b)=>a.label.localeCompare(b.label));
  }
  function renderEduPedagogy(){
    if(!can('educacao','view')) return renderAccessDenied('Acompanhamento pedagógico');
    eduSync();const f=window.__epf=window.__epf||{group:'escola',school:'',grade:'',period:''};
    const grades=[...new Set((state.classes||[]).map(c=>c.grade).filter(Boolean))].sort();
    content.innerHTML=`${pageHeader('Acompanhamento pedagógico','Matrículas, frequência, notas, aprovação e evasão por escola, série ou turma. Resultados parciais enquanto o ano letivo estiver em andamento.',can('educacao','export')?'<button class="btn-secondary" id="epCsv"><i class="fa-solid fa-file-csv"></i> Exportar CSV</button>':'')}
      <div class="card"><div class="form-grid"><div><label>Agrupar por</label><select id="epG"><option value="escola" ${f.group==='escola'?'selected':''}>Escola</option><option value="serie" ${f.group==='serie'?'selected':''}>Série</option><option value="turma" ${f.group==='turma'?'selected':''}>Turma</option></select></div><div><label>Escola</label><select id="epS"><option value="">Todas</option>${schoolOptions(f.school)}</select></div><div><label>Série</label><select id="epGr">${optionsHtml(grades,f.grade,'Todas')}</select></div><div><label>Período das notas</label><select id="epP">${optionsHtml(PERIODS,f.period,'Ano todo')}</select></div></div></div>
      <div id="epOut"></div>`;
    const cfg=eduCfg();
    const draw=()=>{
      const rows=eduPedRows(f);
      document.getElementById('epOut').innerHTML=`<div class="dies-grid" style="margin:16px 0"><div class="card"><div class="card-title"><div><h3>Média geral (0 a 10)</h3></div></div>${dBars(rows.map(r=>({label:r.label,value:r.media||0})))}</div><div class="card"><div class="card-title"><div><h3>Frequência média (%)</h3></div></div>${dBars(rows.map(r=>({label:r.label,value:r.freq||0})))}</div></div>
        <div class="table-card"><div class="table-wrap"><table><thead><tr><th>${f.group==='serie'?'Série':f.group==='turma'?'Turma':'Escola'}</th><th>Alunos ativos</th><th>Média</th><th>Frequência</th><th>Aprovados</th><th>Recuperação</th><th>Reprovados</th><th>Sem notas</th><th>Evasão</th><th>Atenção</th></tr></thead><tbody>${rows.length?rows.map(r=>`<tr><td><strong>${dE(r.label)}</strong></td><td>${r.alunos}</td><td>${eduFmt(r.media)}</td><td>${r.freq===null?'—':eduFmt(r.freq)+'%'}</td><td>${r.apr}</td><td>${r.rec}</td><td>${r.rep}</td><td>${r.sem}</td><td>${r.evasao===null?'—':eduFmt(r.evasao)+'%'}</td><td>${r.flags.length?r.flags.map(x=>`<span class="badge badge-red">${x}</span>`).join(' '):'<span class="badge badge-green">Em dia</span>'}</td></tr>`).join(''):'<tr><td colspan="10"><div class="empty-state" style="border:none">Sem dados para os filtros escolhidos.</div></td></tr>'}</tbody></table></div></div>
        <p class="muted" style="margin-top:10px">Resultado parcial: Aprovado = todas as médias ≥ ${PASS_GRADE} e frequência ≥ ${cfg.minFreq}%; Recuperação = alguma média entre ${RECOVERY_MIN} e ${PASS_GRADE}; Reprovado = média < ${RECOVERY_MIN} ou frequência < ${cfg.minFreq}%. Evasão = alunos “Inativos” entre os matriculados.</p>`;
    };
    [['epG','group'],['epS','school'],['epGr','grade'],['epP','period']].forEach(([id,k])=>document.getElementById(id).onchange=e=>{f[k]=e.target.value;draw();});
    document.getElementById('epCsv')?.addEventListener('click',()=>{const rows=eduPedRows(f);exportCsv('acompanhamento-pedagogico.csv',[['Grupo','Alunos ativos','Média','Frequência (%)','Aprovados','Recuperação','Reprovados','Sem notas','Evasão (%)','Atenção'],...rows.map(r=>[r.label,r.alunos,r.media??'',r.freq??'',r.apr,r.rec,r.rep,r.sem,r.evasao??'',r.flags.join('; ')])]);});
    draw();
  }

  // ----- calendário escolar, períodos letivos e prazos -----
  function renderEduCalendar(){
    if(!can('educacao','view')) return renderAccessDenied('Calendário escolar');
    eduSync();const cfg=eduCfg(),t=dToday(),ed=can('educacao','edit');
    const periods=(state.academicPeriods||[]).filter(p=>state.schools.some(s=>s.id===p.schoolId)).sort((a,b)=>a.startDate.localeCompare(b.startDate)||dSchoolName(a.schoolId).localeCompare(dSchoolName(b.schoolId)));
    const comp=periods.filter(p=>eduNetStatus(dSchool(p.schoolId))==='Ativa').map(p=>{
      const end=p.endDate<t?p.endDate:t;const dates=new Set((state.lessonRecords||[]).filter(r=>r.schoolId===p.schoolId&&r.date>=p.startDate&&r.date<=end).map(r=>r.date));
      const total=Math.max(1,dDiff(p.startDate,p.endDate)),prog=Math.min(1,Math.max(0,dDiff(p.startDate,t)/total));const expected=Math.round((p.schoolDays||0)*prog);
      return {p,executed:dates.size,expected,low:p.status!=='Planejado'&&expected>0&&dates.size<expected*0.9};
    });
    const schools=eduActiveSchools();
    content.innerHTML=`${pageHeader('Calendário escolar da rede','Períodos letivos, cumprimento dos dias letivos e prazos de lançamento de notas e frequência.',ed?'<button class="btn-primary" id="ecNew"><i class="fa-solid fa-plus"></i> Definir período para a rede</button>':'')}
      <div class="card"><div class="card-title"><div><h3>Períodos letivos</h3></div></div><div class="table-wrap"><table><thead><tr><th>Escola</th><th>Período</th><th>Tipo</th><th>Início</th><th>Encerramento</th><th>Dias letivos</th><th>Situação</th><th></th></tr></thead><tbody>${periods.length?periods.map(p=>`<tr><td>${dE(dSchoolName(p.schoolId))}</td><td>${dE(p.name)}</td><td>${dE(p.type)}</td><td>${formatDate(p.startDate)}</td><td>${formatDate(p.endDate)}</td><td>${p.schoolDays||'—'}</td><td>${badge(p.status,{'Planejado':'badge-blue','Em andamento':'badge-green','Encerrado':'badge-gray'})}</td><td>${ed?`<button class="small-button ec-edit" data-id="${p.id}" title="Editar"><i class="fa-solid fa-pen"></i></button>`:''}</td></tr>`).join(''):'<tr><td colspan="8"><div class="empty-state" style="border:none">Nenhum período letivo cadastrado. Use “Definir período para a rede”.</div></td></tr>'}</tbody></table></div></div>
      <div class="card" style="margin-top:16px"><div class="card-title"><div><h3>Cumprimento dos dias letivos</h3><span>Dias com diário de classe lançado × dias previstos proporcionais ao tempo decorrido.</span></div></div><div class="table-wrap"><table><thead><tr><th>Escola</th><th>Período</th><th>Dias letivos previstos</th><th>Esperado até hoje</th><th>Dias com aula registrada</th><th>Situação</th></tr></thead><tbody>${comp.length?comp.map(c=>`<tr><td>${dE(dSchoolName(c.p.schoolId))}</td><td>${dE(c.p.name)}</td><td>${c.p.schoolDays||'—'}</td><td>${c.expected}</td><td>${c.executed}</td><td>${c.p.status==='Planejado'?'<span class="badge badge-blue">Ainda não iniciado</span>':c.low?'<span class="badge badge-red">Abaixo do ritmo</span>':'<span class="badge badge-green">No ritmo</span>'}</td></tr>`).join(''):'<tr><td colspan="6"><div class="empty-state" style="border:none">Sem períodos de escolas ativas.</div></td></tr>'}</tbody></table></div></div>
      <div class="card" style="margin-top:16px"><div class="card-title"><div><h3>Prazos de lançamento de notas e frequência</h3><span>Os prazos abaixo são valores iniciais de exemplo: ajuste conforme o calendário oficial da rede.</span></div>${ed?'<button class="btn-secondary" id="ecDead"><i class="fa-solid fa-pen"></i> Editar prazos</button>':''}</div>
        <div class="table-wrap"><table><thead><tr><th>Período</th><th>Prazo das notas</th><th>Prazo da frequência</th>${schools.map(s=>`<th>${dE(s.name)}</th>`).join('')}</tr></thead><tbody>${cfg.deadlines.map(d=>`<tr><td>${dE(d.period)}</td><td>${d.gradesDue?formatDate(d.gradesDue):'—'}</td><td>${d.attendanceDue?formatDate(d.attendanceDue):'—'}</td>${schools.map(s=>{const x=eduGradePending(s,d);if(!x.expected)return '<td class="muted">sem dados</td>';const p=eduPct(x.launched,x.expected);const late=d.gradesDue&&d.gradesDue<t;return `<td>${eduFmt(p)}% lançadas ${x.pending&&late?'<span class="badge badge-red">pendente</span>':x.pending?'<span class="badge badge-blue">em prazo</span>':'<span class="badge badge-green">completo</span>'}</td>`;}).join('')}</tr>`).join('')}</tbody></table></div></div>`;
    document.getElementById('ecNew')?.addEventListener('click',()=>openEduPeriod(null));
    document.querySelectorAll('.ec-edit').forEach(b=>b.onclick=()=>openEduPeriod(b.dataset.id));
    document.getElementById('ecDead')?.addEventListener('click',openEduDeadlines);
  }
  function openEduPeriod(id){
    if(!can('educacao','edit')) return denyToast('edit');
    const p=id?(state.academicPeriods||[]).find(x=>x.id===id):{};if(id&&!p)return;
    openModal(id?`Editar período — ${dSchoolName(p.schoolId)}`:'Definir período para a rede',`<form id="pdForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid">
      <div class="full"><label>Nome *</label><input id="pdName" value="${dE(p.name||'')}" placeholder="Ex.: 2026 — Ano Letivo"></div>
      <div><label>Tipo *</label><select id="pdType">${optionsHtml(['Ano Letivo','Bimestre','Trimestre','Semestre'],p.type||'')}</select></div>
      <div><label>Situação *</label><select id="pdSt">${optionsHtml(['Planejado','Em andamento','Encerrado'],p.status||'Planejado')}</select></div>
      <div><label>Início *</label><input id="pdStart" type="date" value="${p.startDate||''}"></div><div><label>Encerramento *</label><input id="pdEnd" type="date" value="${p.endDate||''}"></div>
      <div><label>Dias letivos previstos *</label><input id="pdDays" type="number" min="1" max="366" value="${p.schoolDays||''}"></div>
      ${id?'':`<div class="full"><label>Aplicar às escolas</label>${eduActiveSchools().map(s=>`<label style="display:flex;gap:8px;align-items:center;font-weight:500"><input type="checkbox" class="pd-sc" value="${s.id}" checked style="width:auto"> ${dE(s.name)}</label>`).join('')}</div>`}</div>
      <div class="form-actions"><button class="btn-primary">${id?'Salvar':'Aplicar período'}</button></div></form>`);
    document.getElementById('pdForm').onsubmit=e=>{
      e.preventDefault();const v=i=>document.getElementById(i).value.trim();
      if(!v('pdName')||!v('pdType')||!v('pdSt')) return formError('Preencha nome, tipo e situação.');
      if(!v('pdStart')||!v('pdEnd')||v('pdEnd')<=v('pdStart')) return formError('O encerramento deve ser posterior ao início.');
      const days=Number(v('pdDays'));if(!Number.isInteger(days)||days<1||days>366) return formError('Informe de 1 a 366 dias letivos.');
      const data={name:v('pdName'),type:v('pdType'),status:v('pdSt'),startDate:v('pdStart'),endDate:v('pdEnd'),schoolDays:days};
      if(id){Object.assign(p,data);logAudit('Calendário','Período alterado',`${p.name} — ${dSchoolName(p.schoolId)}`,p.schoolId);}
      else{
        const ids=[...document.querySelectorAll('#pdForm .pd-sc:checked')].map(x=>x.value);if(!ids.length) return formError('Selecione ao menos uma escola.');
        state.academicPeriods=state.academicPeriods||[];let made=0,skipped=0;
        ids.forEach(sid2=>{if(state.academicPeriods.some(x=>x.schoolId===sid2&&x.name.toLowerCase()===data.name.toLowerCase())){skipped++;return;}state.academicPeriods.push({id:crypto.randomUUID(),schoolId:sid2,...data});made++;logAudit('Calendário','Período definido pela rede',`${data.name} — ${dSchoolName(sid2)}`,sid2);});
        showToast(`${made} escola(s) receberam o período${skipped?`; ${skipped} já tinham um período com esse nome`:''}.`);
      }
      save();closeModal();renderEduCalendar();
    };
  }
  function openEduDeadlines(){
    if(!can('educacao','edit')) return denyToast('edit');const cfg=eduCfg();
    openModal('Prazos de lançamento',`<form id="dlForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="table-wrap"><table><thead><tr><th>Período</th><th>Prazo das notas</th><th>Prazo da frequência</th></tr></thead><tbody>${cfg.deadlines.map((d,i)=>`<tr><td>${dE(d.period)}</td><td><input type="date" class="dl-g" data-i="${i}" value="${d.gradesDue||''}"></td><td><input type="date" class="dl-a" data-i="${i}" value="${d.attendanceDue||''}"></td></tr>`).join('')}</tbody></table></div><div class="form-actions"><button class="btn-primary">Salvar prazos</button></div></form>`);
    document.getElementById('dlForm').onsubmit=e=>{e.preventDefault();document.querySelectorAll('#dlForm .dl-g').forEach(x=>{cfg.deadlines[Number(x.dataset.i)].gradesDue=x.value;});document.querySelectorAll('#dlForm .dl-a').forEach(x=>{cfg.deadlines[Number(x.dataset.i)].attendanceDue=x.value;});logAudit('Calendário','Prazos de lançamento atualizados','Notas e frequência');save();closeModal();renderEduCalendar();showToast('Prazos salvos.');};
  }

  // ----- relatórios e estatísticas -----
  const EDU_REPORTS=[['matriculas','Matrículas e transferências'],['resultados','Aprovação, reprovação e abandono (parcial)'],['comparativo_escolas','Comparativo entre escolas'],['comparativo_periodos','Comparativo entre períodos letivos (média por bimestre)'],['pendencias','Pendências e alertas da rede'],['cadastro','Situação cadastral das escolas']];
  function eduReport(key,f){
    const inRange=d=>(!f.from||(d&&d>=f.from))&&(!f.to||(d&&d<=f.to));
    const schools=state.schools.filter(s=>!f.school||s.id===f.school);let headers=[],rows=[];const title=EDU_REPORTS.find(r=>r[0]===key)?.[1]||key;
    if(key==='matriculas'){
      const T=['Matrícula Inicial','Rematrícula','Transferência Recebida','Transferência Enviada','Trancamento','Cancelamento'];
      headers=['Escola','Alunos ativos',...T,'Em análise / pendentes'];
      rows=schools.map(s=>{const rq=(state.enrollmentRequests||[]).filter(r=>r.schoolId===s.id&&inRange(r.requestDate));return [s.name,(state.students||[]).filter(x=>x.schoolId===s.id&&activeStudent(x)).length,...T.map(t=>rq.filter(r=>r.type===t&&r.status!=='Negada').length),rq.filter(r=>['Em análise','Pendente de documentos'].includes(r.status)).length];});
    }
    if(key==='resultados'){
      headers=['Escola','Série','Alunos ativos','Aprovados','Recuperação','Reprovados','Sem notas','Abandono (inativos)','Aprovação (%)','Reprovação (%)','Abandono (%)'];
      schools.forEach(s=>{const by={};eduStudentRows(s,f.period||'').forEach(r=>{if(f.grade&&r.grade!==f.grade)return;const b=by[r.grade]=by[r.grade]||{a:0,ap:0,rc:0,rp:0,sn:0,in:0,t:0};b.t++;if(r.status==='Inativo')b.in++;if(!r.active)return;b.a++;if(r.result==='Aprovado')b.ap++;else if(r.result==='Recuperação')b.rc++;else if(r.result==='Reprovado')b.rp++;else b.sn++;});
        Object.entries(by).sort().forEach(([g,b])=>{const com=b.ap+b.rc+b.rp;rows.push([s.name,g,b.a,b.ap,b.rc,b.rp,b.sn,b.in,eduFmt(eduPct(b.ap,com)),eduFmt(eduPct(b.rp,com)),eduFmt(eduPct(b.in,b.t))]);});});
    }
    if(key==='comparativo_escolas'){
      headers=['Escola','Alunos ativos','Turmas','Frequência (%)','Média geral','Reprovação parcial (%)','Evasão (%)','Alertas'];const al=eduAlerts();
      rows=schools.map(s=>{const x=eduSchoolStats(s,f.period||'');return [s.name,x.alunos,x.turmas,eduFmt(x.freq),eduFmt(x.media),eduFmt(x.taxaReprovacao),eduFmt(x.taxaEvasao),al.filter(a=>a.schoolId===s.id).length];});
    }
    if(key==='comparativo_periodos'){
      headers=['Escola',...PERIODS,'Variação (último × anterior)'];
      rows=schools.map(s=>{const m=PERIODS.map(p=>eduSchoolStats(s,p).media);const v=m.filter(x=>x!==null);const d=v.length>1?Math.round((v[v.length-1]-v[v.length-2])*10)/10:null;return [s.name,...m.map(eduFmt),d===null?'—':(d>0?'+':'')+eduFmt(d)];});
    }
    if(key==='pendencias'){headers=['Escola','Gravidade','Tipo','Alerta'];rows=eduAlerts().filter(a=>!f.school||a.schoolId===f.school).map(a=>[a.school,a.severity,a.type,a.title]);}
    if(key==='cadastro'){
      headers=['Escola','INEP','Município/UF','Matriz','Unidade','Situação na rede','Rede','Gestor(a)','Cadastro completo'];const al=eduAlerts();
      rows=schools.map(s=>{const inc=al.find(a=>a.schoolId===s.id&&a.key===`dados:${s.id}`);return [s.name,s.inep||'—',[s.city,s.state].filter(Boolean).join('/')||'—',s.matrizId?eduMatrizName(s.matrizId):'—',s.unitType||'—',eduNetStatus(s),dNet(s),s.managerName||'—',inc?'Não ('+inc.evidence.map(e=>e[1]).join(', ')+')':'Sim'];});
    }
    const parts=[];if(f.school)parts.push('Escola: '+dSchoolName(f.school));if(f.grade)parts.push('Série: '+f.grade);if(f.period)parts.push('Período: '+f.period);if(f.from||f.to)parts.push(`Datas: ${f.from?formatDate(f.from):'início'} a ${f.to?formatDate(f.to):'hoje'}`);
    return {key,title,headers,rows,filtersText:parts.join(' · ')||'Sem filtros (toda a rede)'};
  }
  function eduDownload(name,mime,content){const blob=new Blob([content],{type:mime});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1500);}
  function eduXls(name,rep){
    const html=`<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"></head><body><h3>${dE(rep.title)}</h3><p>${dE(rep.filtersText)}</p><table border="1"><tr>${rep.headers.map(h=>`<th>${dE(h)}</th>`).join('')}</tr>${rep.rows.map(r=>`<tr>${r.map(c=>`<td>${dE(String(c??''))}</td>`).join('')}</tr>`).join('')}</table></body></html>`;
    eduDownload(name,'application/vnd.ms-excel;charset=utf-8','\ufeff'+html);
  }
  function eduOutput(key,f,fmt){
    const rep=eduReport(key,f);
    if(fmt==='csv') exportCsv(`rede-${key}.csv`,[[rep.title],['Filtros: '+rep.filtersText],[],rep.headers,...rep.rows]);
    else if(fmt==='xls') eduXls(`rede-${key}.xls`,rep);
    else dPrintHtml(rep.title,`${dDocHead(rep.title,`<p>Filtros aplicados: ${dE(rep.filtersText)}</p>`)}${dPrintTable(rep.headers,rep.rows)}<p>Total de linhas: ${rep.rows.length}</p>`);
    logAudit('Departamento de Educação','Relatório',`${rep.title} (${fmt==='print'?'PDF':fmt.toUpperCase()})`,f.school||undefined);save();
  }
  function renderEduReports(){
    if(!can('educacao','view')) return renderAccessDenied('Relatórios e estatísticas');
    eduSync();const f=window.__erf=window.__erf||{key:'matriculas',school:'',grade:'',period:'',from:'',to:''};
    const grades=[...new Set((state.classes||[]).map(c=>c.grade).filter(Boolean))].sort();const ex=can('educacao','export');
    content.innerHTML=`${pageHeader('Relatórios e estatísticas','Dados consolidados da rede e comparação entre escolas e períodos. “PDF” abre a janela de impressão (escolha “Salvar como PDF”); “Excel” baixa um arquivo .xls.')}
      <div class="card"><div class="form-grid"><div class="full"><label>Relatório</label><select id="erK">${EDU_REPORTS.map(r=>`<option value="${r[0]}" ${r[0]===f.key?'selected':''}>${r[1]}</option>`).join('')}</select></div>
        <div><label>Escola</label><select id="erS"><option value="">Todas</option>${schoolOptions(f.school)}</select></div><div><label>Série</label><select id="erG">${optionsHtml(grades,f.grade,'Todas')}</select></div><div><label>Período das notas</label><select id="erP">${optionsHtml(PERIODS,f.period,'Ano todo')}</select></div>
        <div><label>Solicitações de</label><input id="erF" type="date" value="${f.from}"></div><div><label>até</label><input id="erT" type="date" value="${f.to}"></div></div>
        <div class="form-actions" style="justify-content:flex-start;flex-wrap:wrap"><button class="btn-primary" id="erGo"><i class="fa-solid fa-table"></i> Gerar / atualizar</button>${ex?'<button class="btn-secondary" id="erPdf"><i class="fa-solid fa-file-pdf"></i> PDF</button><button class="btn-secondary" id="erXls"><i class="fa-solid fa-file-excel"></i> Excel</button><button class="btn-secondary" id="erCsv"><i class="fa-solid fa-file-csv"></i> CSV</button>':''}</div></div><div id="erOut"></div>`;
    const read=()=>{f.key=document.getElementById('erK').value||f.key;f.school=document.getElementById('erS').value;f.grade=document.getElementById('erG').value;f.period=document.getElementById('erP').value;f.from=document.getElementById('erF').value;f.to=document.getElementById('erT').value;return f.from&&f.to&&f.from>f.to?'A data inicial não pode ser posterior à final.':'';};
    const show=()=>{const err=read();if(err)return showToast(err);const r=eduReport(f.key,f);document.getElementById('erOut').innerHTML=`<div class="table-card" style="margin-top:16px"><div style="padding:16px"><h3>${dE(r.title)}</h3><p class="muted">Filtros: ${dE(r.filtersText)} · ${r.rows.length} linha(s)</p></div><div class="table-wrap"><table><thead><tr>${r.headers.map(h=>`<th>${dE(h)}</th>`).join('')}</tr></thead><tbody>${r.rows.length?r.rows.map(x=>`<tr>${x.map(c=>`<td>${dE(String(c))}</td>`).join('')}</tr>`).join(''):`<tr><td colspan="${r.headers.length}" class="muted">Nenhum registro para os filtros informados.</td></tr>`}</tbody></table></div></div>`;};
    document.getElementById('erGo').onclick=show;
    [['erPdf','print'],['erXls','xls'],['erCsv','csv']].forEach(([id,fmt])=>document.getElementById(id)?.addEventListener('click',()=>{const e=read();if(e)return showToast(e);eduOutput(f.key,f,fmt);}));
    show();
  }

  // ----- pendências, notificações e parâmetros -----
  function renderEduPending(){
    if(!can('educacao','view')) return renderAccessDenied('Pendências e notificações');
    const alerts=eduSync();const f=window.__enf=window.__enf||{tab:'alertas',sev:''};const ed=can('educacao','edit');
    content.innerHTML=`${pageHeader('Pendências e notificações','Alertas calculados com os dados das escolas, com acesso aos números que os justificam.')}
      <div class="calendar-tabs">${[['alertas',`Alertas ativos (${alerts.length})`],['notif',`Notificações (${eduUnread()} não lidas)`],['param','Parâmetros dos alertas']].map(([k,l])=>`<button type="button" class="calendar-tab ${f.tab===k?'active':''}" data-tab="${k}">${l}</button>`).join('')}</div><div id="enBody"></div>`;
    document.querySelectorAll('.calendar-tab').forEach(b=>b.onclick=()=>{f.tab=b.dataset.tab;renderEduPending();});
    const box=document.getElementById('enBody');
    if(f.tab==='alertas'){
      const l=alerts.filter(a=>!f.sev||a.severity===f.sev);
      box.innerHTML=`<div class="table-card"><div style="padding:16px"><select id="enSev">${optionsHtml(['alta','média','baixa'],f.sev,'Todas as gravidades')}</select></div><div class="table-wrap"><table><thead><tr><th>Gravidade</th><th>Escola</th><th>Tipo</th><th>Alerta</th><th></th></tr></thead><tbody>${l.length?l.map((a,i)=>`<tr><td><span class="badge ${EDU_BADGE[a.severity]}">${a.severity}</span></td><td>${dE(a.school)}</td><td>${dE(a.type)}</td><td>${dE(a.title)}</td><td><button class="small-button en-ev" data-i="${i}" title="Ver dados que justificam"><i class="fa-solid fa-magnifying-glass-chart"></i></button><button class="small-button en-go" data-p="${a.page}" title="Abrir tela relacionada"><i class="fa-solid fa-arrow-right"></i></button></td></tr>`).join(''):'<tr><td colspan="5"><div class="empty-state" style="border:none">Nenhum alerta ativo.</div></td></tr>'}</tbody></table></div></div>`;
      document.getElementById('enSev').onchange=e=>{f.sev=e.target.value;renderEduPending();};
      document.querySelectorAll('.en-ev').forEach(b=>b.onclick=()=>openEduAlertEvidence(l[Number(b.dataset.i)]));
      document.querySelectorAll('.en-go').forEach(b=>b.onclick=()=>navigate(b.dataset.p));
    }else if(f.tab==='notif'){
      const l=state.eduNotifications||[];const p=paginate(l,'enot');
      box.innerHTML=`<div class="table-card"><div style="padding:16px;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><span class="muted">Notificações internas, geradas uma vez por alerta a cada mês. Não há envio de e-mail.</span><button class="btn-secondary" id="enAll"><i class="fa-solid fa-check-double"></i> Marcar todas como lidas</button></div><div class="table-wrap"><table><thead><tr><th>Data</th><th>Gravidade</th><th>Notificação</th><th>Leitura</th><th></th></tr></thead><tbody>${p.slice.length?p.slice.map(n=>`<tr><td>${new Date(n.date).toLocaleString('pt-BR')}</td><td><span class="badge ${EDU_BADGE[n.severity]}">${n.severity}</span></td><td>${dE(n.text)}</td><td>${n.read?'<span class="badge badge-gray">Lida</span>':'<span class="badge badge-blue">Não lida</span>'}</td><td>${n.read?'':`<button class="small-button en-read" data-id="${n.id}" title="Marcar como lida"><i class="fa-solid fa-check"></i></button>`}</td></tr>`).join(''):'<tr><td colspan="5"><div class="empty-state" style="border:none">Nenhuma notificação.</div></td></tr>'}</tbody></table></div>${paginationHtml(p,'enot')}</div>`;
      bindPagination('enot',renderEduPending);
      document.querySelectorAll('.en-read').forEach(b=>b.onclick=()=>{const n=state.eduNotifications.find(x=>x.id===b.dataset.id);if(n){n.read=true;save();renderEduPending();}});
      document.getElementById('enAll').onclick=()=>{(state.eduNotifications||[]).forEach(n=>n.read=true);save();renderEduPending();};
    }else{
      const c=eduCfg();const dis=ed?'':'disabled';
      const F=[['minFreq','Frequência mínima (%)',1,100],['lowAvg','Média considerada baixa (abaixo de)',0,10],['maxFailRate','Reprovação parcial máxima (%)',1,100],['absenceRise','Aumento de faltas para alertar (pontos percentuais)',1,50],['evasionMax','Evasão máxima (%)',1,100],['staleDays','Dias sem lançar frequência para alertar',1,120],['enrollDays','Dias de matrícula parada para alertar',1,120]];
      box.innerHTML=`<form id="pmForm" novalidate class="card"><p class="muted">Limites usados pelos alertas. Defina de acordo com as normas da rede de ensino; o sistema não presume valores legais.</p><div class="form-grid">${F.map(([k,l,mn,mx])=>`<div><label>${l}</label><input type="number" step="any" min="${mn}" max="${mx}" id="pm_${k}" value="${c[k]}" ${dis}></div>`).join('')}</div>${ed?'<div class="form-actions"><button class="btn-primary">Salvar parâmetros</button></div>':''}</form>`;
      document.getElementById('pmForm').onsubmit=e=>{e.preventDefault();if(!ed)return denyToast('edit');const vals={};for(const [k,l,mn,mx] of F){const v=Number(document.getElementById('pm_'+k).value);if(!isFinite(v)||v<mn||v>mx)return showToast(`${l}: informe um valor entre ${mn} e ${mx}.`);vals[k]=v;}Object.assign(c,vals);logAudit('Departamento de Educação','Parâmetros dos alertas atualizados','Limites de frequência, rendimento e prazos');save();showToast('Parâmetros salvos.');};
    }
  }

  // ----- histórico de atividades (auditoria de toda a rede) -----
  function renderEduAudit(){
    if(!can('educacao','view')) return renderAccessDenied('Histórico de atividades');
    const f=window.__eaf=window.__eaf||{q:'',module:'',user:'',from:'',to:'',chip:''};
    const log=state.auditLog||[];const mods=[...new Set(log.map(a=>a.module).filter(Boolean))].sort();
    const chips=[['','Tudo'],['acesso','Acessos'],['usuario','Usuários'],['dados','Notas e frequência'],['escola','Escolas e situação']];
    content.innerHTML=`${pageHeader('Histórico de atividades','Quem fez o quê, em qual escola e quando. Os registros não podem ser editados nem apagados por usuários comuns.',can('educacao','export')?'<button class="btn-secondary" id="eaCsv"><i class="fa-solid fa-file-csv"></i> Exportar CSV</button>':'')}
      <div class="calendar-tabs">${chips.map(([k,l])=>`<button type="button" class="calendar-tab ${f.chip===k?'active':''}" data-chip="${k}">${l}</button>`).join('')}</div>
      <div class="table-card"><div style="display:flex;gap:10px;flex-wrap:wrap;padding:16px"><input id="eaQ" type="search" placeholder="Buscar na ação ou no resumo" value="${dE(f.q)}" style="flex:1;min-width:200px"><select id="eaM">${optionsHtml(mods,f.module,'Todos os módulos')}</select><input id="eaU" type="search" placeholder="Usuário" value="${dE(f.user)}" style="width:150px"><input id="eaF" type="date" value="${f.from}"><input id="eaT" type="date" value="${f.to}"></div><div id="eaTbl"></div></div>`;
    const re={acesso:/login|acesso|sess/i,usuario:/usu[aá]rio|senha|conta|bloque|libera/i,dados:/nota|frequ|di[aá]rio/i,escola:/escola|situa|matriz/i};
    const list=()=>{const q=f.q.trim().toLowerCase(),u=f.user.trim().toLowerCase();return log.filter(a=>{const d=(a.when||'').slice(0,10);const txt=`${a.module} ${a.action}`;return (!f.chip||re[f.chip].test(txt))&&(!f.module||a.module===f.module)&&(!q||`${a.action} ${a.summary}`.toLowerCase().includes(q))&&(!u||String(a.user||'').toLowerCase().includes(u))&&(!f.from||d>=f.from)&&(!f.to||d<=f.to);}).sort((a,b)=>String(b.when).localeCompare(String(a.when)));};
    const draw=()=>{const l=list();const p=paginate(l,'eaud');document.getElementById('eaTbl').innerHTML=`<div class="table-wrap"><table><thead><tr><th>Data e hora</th><th>Usuário</th><th>Perfil</th><th>Módulo</th><th>Ação</th><th>Resumo</th><th>Escola</th></tr></thead><tbody>${p.slice.length?p.slice.map(a=>`<tr><td>${a.when?new Date(a.when).toLocaleString('pt-BR'):'—'}</td><td>${dE(a.user||'—')}</td><td>${dE(a.role||'—')}</td><td>${dE(a.module||'—')}</td><td>${dE(a.action||'—')}</td><td>${dE(a.summary||'')}</td><td>${dE(dSchoolName(a.schoolId))}</td></tr>`).join(''):'<tr><td colspan="7"><div class="empty-state" style="border:none">Nenhum registro encontrado.</div></td></tr>'}</tbody></table></div>${paginationHtml(p,'eaud')}`;bindPagination('eaud',draw);};
    document.querySelectorAll('.calendar-tab').forEach(b=>b.onclick=()=>{f.chip=b.dataset.chip;dResetPg('eaud');renderEduAudit();});
    [['eaQ','q','oninput'],['eaM','module','onchange'],['eaU','user','oninput'],['eaF','from','onchange'],['eaT','to','onchange']].forEach(([id,k,ev])=>document.getElementById(id)[ev]=e=>{f[k]=e.target.value;dResetPg('eaud');draw();});
    document.getElementById('eaCsv')?.addEventListener('click',()=>exportCsv('historico-de-atividades.csv',[['Data e hora','Usuário','Perfil','Módulo','Ação','Resumo','Escola'],...list().map(a=>[a.when||'',a.user||'',a.role||'',a.module||'',a.action||'',a.summary||'',dSchoolName(a.schoolId)])]));
    draw();
  }

  // ===== RH — ficha funcional: ingresso e contrato (professores e qualquer cargo) =====
  const HR_INGRESS=['Concurso público','Processo seletivo (recrutamento do RH)','Contratação direta','Contrato temporário','Cessão / convênio','Indicação','Transferência interna','Outro'];
  const HR_CONTRACTS=['Estatutário (efetivo)','CLT — prazo indeterminado','CLT — prazo determinado','Contrato temporário (administrativo)','Prestação de serviços','Cedido / à disposição','Estágio'];
  const HR_TERM_REQUIRED=['CLT — prazo determinado','Contrato temporário (administrativo)','Estágio'];
  const HR_BADGE={'Vigente':'badge-green','Vigente (sem término)':'badge-green','A vencer':'badge-yellow','Vencido':'badge-red','Encerrado':'badge-gray','Suspenso':'badge-yellow','Não informado':'badge-gray'};
  function hrContractState(e){
    const c=e.contract;if(!c||!c.type)return 'Não informado';
    if(c.status==='Encerrado'||c.status==='Suspenso')return c.status;
    if(!c.end)return 'Vigente (sem término)';
    if(c.end<dToday())return 'Vencido';
    return dDiff(dToday(),c.end)<=30?'A vencer':'Vigente';
  }
  function renderHrProfile(){
    if(!can('rh','view')) return renderAccessDenied('Ficha funcional e contratos');
    const f=window.__hpf=window.__hpf||{q:'',type:'',ingress:'',cstate:''};
    content.innerHTML=`${pageHeader('Ficha funcional e contratos','Como cada profissional (professor ou qualquer cargo) ingressou, qual é o contrato e as demais informações funcionais.',can('rh','export')?'<button class="btn-secondary" id="hpCsv"><i class="fa-solid fa-file-csv"></i> Exportar CSV</button>':'')}
      <div class="table-card"><div style="display:flex;gap:10px;flex-wrap:wrap;padding:16px"><input id="hpQ" type="search" placeholder="Buscar por nome ou cargo" value="${dE(f.q)}" style="flex:1;min-width:200px"><select id="hpT">${optionsHtml(['Professor','Funcionário'],f.type,'Todos os tipos')}</select><select id="hpI">${optionsHtml([...HR_INGRESS,'Não informado'],f.ingress,'Todo ingresso')}</select><select id="hpC">${optionsHtml(['Vigente','Vigente (sem término)','A vencer','Vencido','Suspenso','Encerrado','Não informado'],f.cstate,'Todo contrato')}</select></div><div id="hpTbl"></div></div>`;
    const list=()=>{const q=f.q.trim().toLowerCase();return (state.employees||[]).filter(e=>e.schoolId===sid()&&(!f.type||e.type===f.type)&&(!f.ingress||(e.ingressType||'Não informado')===f.ingress)&&(!f.cstate||hrContractState(e)===f.cstate)&&(!q||(e.name+' '+(e.role||'')).toLowerCase().includes(q))).sort((a,b)=>a.name.localeCompare(b.name));};
    const draw=()=>{
      const p=paginate(list(),'hpr');const ed=can('rh','edit');
      document.getElementById('hpTbl').innerHTML=`<div class="table-wrap"><table><thead><tr><th>Nome</th><th>Cargo</th><th>Tipo</th><th>Como ingressou</th><th>Admissão</th><th>Contrato</th><th>Vigência</th><th>Situação</th><th>Ações</th></tr></thead><tbody>${p.slice.length?p.slice.map(e=>{const c=e.contract||{};return `<tr><td><strong>${dE(e.name)}</strong></td><td>${dE(e.role||'—')}</td><td>${dE(e.type||'—')}</td><td>${dE(e.ingressType||'Não informado')}</td><td>${e.admissionDate?formatDate(e.admissionDate):'—'}</td><td>${dE(c.type||'Não informado')}</td><td>${c.start?formatDate(c.start):'—'} a ${c.end?formatDate(c.end):'sem término'}</td><td>${badge(hrContractState(e),HR_BADGE)}</td><td><button class="small-button hp-view" data-id="${e.id}" title="Ficha"><i class="fa-solid fa-eye"></i></button>${ed?`<button class="small-button hp-edit" data-id="${e.id}" title="Informar ingresso e contrato"><i class="fa-solid fa-pen"></i></button>`:''}</td></tr>`;}).join(''):'<tr><td colspan="9"><div class="empty-state" style="border:none">Nenhum profissional encontrado.</div></td></tr>'}</tbody></table></div>${paginationHtml(p,'hpr')}`;
      bindPagination('hpr',draw);
      document.querySelectorAll('.hp-view').forEach(b=>b.onclick=()=>openHrProfileView(b.dataset.id));
      document.querySelectorAll('.hp-edit').forEach(b=>b.onclick=()=>openHrProfileEdit(b.dataset.id));
    };
    [['hpQ','q','oninput'],['hpT','type','onchange'],['hpI','ingress','onchange'],['hpC','cstate','onchange']].forEach(([id,k,ev])=>document.getElementById(id)[ev]=e=>{f[k]=e.target.value;dResetPg('hpr');draw();});
    document.getElementById('hpCsv')?.addEventListener('click',()=>exportCsv('ficha-funcional.csv',[['Nome','Cargo','Tipo','Ingresso','Detalhe do ingresso','Admissão','Contrato','Número','Início','Término','Carga semanal (h)','Situação do contrato'],...list().map(e=>{const c=e.contract||{};return [e.name,e.role||'',e.type||'',e.ingressType||'Não informado',e.ingressDetail||'',e.admissionDate||'',c.type||'Não informado',c.number||'',c.start||'',c.end||'',c.weeklyHours??'',hrContractState(e)];})]));
    draw();
  }
  function openHrProfileView(id){
    const e=(state.employees||[]).find(x=>x.id===id);if(!e)return;const c=e.contract||{};
    const t=e.type==='Professor'?(state.teachers||[]).find(x=>x.schoolId===e.schoolId&&x.name===e.name):null;
    const asg=t?(state.teacherAssignments||[]).filter(a=>a.teacherId===t.id):[];
    openModal(e.name,`<div class="detail-grid">${dRow('Cargo',e.role)}${dRow('Tipo',e.type)}${dRow('Regime',e.regime)}${dRow('Carga horária semanal',e.cargaHorariaSemanal?e.cargaHorariaSemanal+' h':'')}${dRow('Admissão',e.admissionDate?formatDate(e.admissionDate):'')}${dRow('Situação funcional',e.status)}</div>
      ${dSection('Como ingressou')}<div class="detail-grid">${dRow('Forma de ingresso',e.ingressType||'Não informado')}${dRow('Edital / portaria / processo',e.ingressDetail)}</div>
      ${dSection('Contrato')}<div class="detail-grid">${dRow('Tipo de contrato',c.type||'Não informado')}${dRow('Número',c.number)}${dRow('Início',c.start?formatDate(c.start):'')}${dRow('Término',c.end?formatDate(c.end):'Sem término')}${dRow('Carga contratual',c.weeklyHours!==undefined&&c.weeklyHours!==''?c.weeklyHours+' h/semana':'')}${dRow('Situação',hrContractState(e))}</div>${c.notes?`<p>${dE(c.notes)}</p>`:''}
      ${t?`${dSection('Professor — vínculo com turmas')}<div class="detail-grid">${dRow('Registro',t.registration)}${dRow('Atribuições',String(asg.length))}</div>${asg.length?`<ul style="padding-left:18px">${asg.map(a=>{const cl=(state.classes||[]).find(x=>x.id===a.classId);return `<li>${dE(a.subject)} — ${dE(cl?classLabel(cl):'turma não encontrada')} (${a.weeklyClasses||0} aulas/semana)</li>`;}).join('')}</ul>`:'<p class="muted">Sem turmas/disciplinas atribuídas.</p>'}`:''}
      ${dSection('Histórico de alterações da ficha')}${dHistHtml({history:e.hrHistory||[]})}`);
  }
  function openHrProfileEdit(id){
    if(!can('rh','edit')) return denyToast('edit');
    const e=(state.employees||[]).find(x=>x.id===id);if(!e)return;const c=e.contract||{};
    openModal(`Ingresso e contrato — ${escapeHtml(e.name)}`,`<form id="hpForm" novalidate class="form-card" style="border:none;padding:0;max-width:none"><div class="form-grid">
      <div><label>Como ingressou *</label><select id="hpIng">${optionsHtml(HR_INGRESS,e.ingressType||'','Selecione')}</select></div>
      <div><label>Edital / portaria / processo</label><input id="hpDet" value="${dE(e.ingressDetail||'')}"></div>
      <div><label>Tipo de contrato *</label><select id="hpCt">${optionsHtml(HR_CONTRACTS,c.type||'','Selecione')}</select></div>
      <div><label>Número do contrato</label><input id="hpNum" value="${dE(c.number||'')}"></div>
      <div><label>Início *</label><input id="hpStart" type="date" value="${c.start||e.admissionDate||''}"></div>
      <div><label>Término <small class="muted">(vazio = sem término)</small></label><input id="hpEnd" type="date" value="${c.end||''}"></div>
      <div><label>Carga semanal contratada (h)</label><input id="hpHrs" type="number" min="0" max="60" value="${c.weeklyHours??e.cargaHorariaSemanal??''}"></div>
      <div><label>Situação do contrato</label><select id="hpSt">${optionsHtml(['Vigente','Suspenso','Encerrado'],c.status||'Vigente')}</select></div>
      <div class="full"><label>Observações</label><textarea id="hpNotes" rows="2">${dE(c.notes||'')}</textarea></div></div>
      <div class="form-actions"><button class="btn-primary">Salvar ficha</button></div></form>`);
    document.getElementById('hpForm').onsubmit=ev=>{
      ev.preventDefault();const v=i=>document.getElementById(i).value.trim();
      if(!v('hpIng')) return formError('Informe como o profissional ingressou.');
      if(!v('hpCt')) return formError('Informe o tipo de contrato.');
      if(!v('hpStart')) return formError('Informe o início do contrato.');
      if(v('hpEnd')&&v('hpEnd')<v('hpStart')) return formError('O término não pode ser anterior ao início.');
      if(HR_TERM_REQUIRED.includes(v('hpCt'))&&!v('hpEnd')) return formError('Esse tipo de contrato exige data de término.');
      const h=v('hpHrs');if(h!==''&&(Number(h)<0||Number(h)>60)) return formError('A carga semanal deve ficar entre 0 e 60 horas.');
      const before=`${e.ingressType||'não informado'} / ${c.type||'sem contrato'}`;
      e.ingressType=v('hpIng');e.ingressDetail=v('hpDet');
      e.contract={type:v('hpCt'),number:v('hpNum'),start:v('hpStart'),end:v('hpEnd'),weeklyHours:h===''?'':Number(h),status:v('hpSt'),notes:v('hpNotes')};
      e.hrHistory=e.hrHistory||[];e.hrHistory.push({at:new Date().toISOString(),user:state.user,text:`Ficha alterada: ${before} → ${e.ingressType} / ${e.contract.type}`});
      logAudit('RH','Ficha funcional',`${e.name}: ${e.ingressType} / ${e.contract.type}`);save();closeModal();renderHrProfile();showToast('Ficha funcional salva.');
    };
  }

  function renderCensus(){
    if(!can('censo','view')){renderAccessDenied('Censo Escolar');return;}
    const school=schoolForCurrent();
    content.innerHTML=`${pageHeader('Censo Escolar','Painel de preparação para o Censo Escolar: dados da escola, infraestrutura, turmas, alunos e profissionais, com validação de consistência.','<button type="button" class="btn-primary" id="runValidation"><i class="fa-solid fa-check-double"></i> Executar validação</button>')}
      <div class="stat-grid">${statCard('Alunos',state.students.filter(s=>s.schoolId===school.id).length,'fa-user-graduate')}${statCard('Turmas',state.classes.filter(c=>c.schoolId===school.id).length,'fa-people-roof')}${statCard('Professores',state.teachers.filter(t=>t.schoolId===school.id).length,'fa-chalkboard-user')}${statCard('Funcionários',state.employees.filter(e=>e.schoolId===school.id).length,'fa-id-card')}</div>
      <div class="card"><div class="card-title"><div><h3>Dados da escola / gestor</h3></div></div><div class="detail-grid"><div><span>Escola</span><strong>${escapeHtml(school.name)}</strong></div><div><span>INEP</span><strong>${escapeHtml(school.inep||'—')}</strong></div><div><span>Endereço</span><strong>${escapeHtml(school.address||'—')}</strong></div><div><span>Gestor</span><strong>${escapeHtml((state.mockUsers.find(u=>u.role==='direcao')||{}).name||'—')}</strong></div></div></div>
      <div id="censusResult"></div>`;
    document.getElementById('runValidation').onclick=()=>{
      const issues=[];
      state.students.filter(s=>s.schoolId===school.id&&activeStudent(s)).forEach(s=>{
        if(!s.cpf) issues.push({type:'Aluno sem CPF',ref:s.name});
        if(!s.classId) issues.push({type:'Aluno sem turma',ref:s.name});
        if(!(s.guardians||[]).length) issues.push({type:'Matrícula sem responsável',ref:s.name});
        if(!s.birthDate) issues.push({type:'Dado obrigatório incompleto (nascimento)',ref:s.name});
      });
      state.teachers.filter(t=>t.schoolId===school.id).forEach(t=>{
        if(!(state.teacherAssignments||[]).some(a=>a.teacherId===t.id)) issues.push({type:'Professor sem disciplina atribuída',ref:t.name});
      });
      state.classes.filter(c=>c.schoolId===school.id).forEach(c=>{
        if(!c.schedule||!Object.keys(c.schedule).length) issues.push({type:'Turma sem horário',ref:classLabel(c)});
      });
      logAudit('Censo Escolar','Validação',`${issues.length} inconsistência(s) encontrada(s).`);save();
      document.getElementById('censusResult').innerHTML=`<div class="card"><div class="card-title"><div><h3>Resultado da validação</h3><span>${issues.length} inconsistência(s)</span></div></div>${issues.length?`<div class="table-wrap"><table><thead><tr><th>Tipo</th><th>Referência</th></tr></thead><tbody>${issues.map(i=>`<tr><td><span class="badge badge-red">${escapeHtml(i.type)}</span></td><td>${escapeHtml(i.ref)}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty-state"><i class="fa-solid fa-circle-check" style="color:#16a34a"></i> Nenhuma inconsistência encontrada.</div>'}</div>`;
    };
  }

  // ----- Busca global -----
  function renderGlobalSearch(){
    content.innerHTML=`${pageHeader('Busca global','Pesquise alunos, professores, funcionários, turmas, protocolos, documentos e responsáveis.')}<div class="filter-bar"><input id="gsQ" type="search" placeholder="Digite ao menos 2 caracteres..." style="flex:1;min-width:260px" autofocus></div><div id="gsResults"></div>`;
    document.getElementById('gsQ').oninput=e=>runGlobalSearch(e.target.value);
    document.getElementById('gsQ').focus();
  }
  function runGlobalSearch(term){
    const box=document.getElementById('gsResults');if(!box)return;
    const q=term.trim().toLowerCase();
    if(q.length<2){box.innerHTML='<div class="empty-state">Digite ao menos 2 caracteres para buscar.</div>';return;}
    const school=schoolForCurrent();const has=(...v)=>v.some(x=>String(x||'').toLowerCase().includes(q));
    const groups=[]; // [rótulo, página de destino, linhas]
    const push=(label,page,rows)=>{if(rows.length&&roles[state.role]?.menu.some(m=>m[1]===page))groups.push([label,page,rows]);};
    if(school){
      if(can('alunos','view')) push('Alunos','students',state.students.filter(s=>s.schoolId===school.id&&has(s.name,s.registration)).map(s=>`${s.name} — ${classLabel(classById(s.classId))} (mat. ${s.registration||'—'})`));
      if(can('professores','view')) push('Professores','teachers',state.teachers.filter(t=>t.schoolId===school.id&&has(t.name,t.registration)).map(t=>`${t.name} — ${t.registration||''}`));
      if(can('rh','view')) push('Funcionários','hrProfile',state.employees.filter(e=>e.schoolId===school.id&&has(e.name,e.role,e.ingressType)).map(e=>`${e.name} — ${e.role||''}`));
      if(can('responsaveis','view')) push('Responsáveis','guardians',state.guardians.filter(g=>g.schoolId===school.id&&has(g.name,g.phone)).map(g=>`${g.name} — ${g.phone||''}`));
      push('Turmas','classes',state.classes.filter(c=>c.schoolId===school.id&&has(classLabel(c))).map(classLabel));
      if(can('protocolos','view')) push('Protocolos','serviceRequests',state.serviceRequests.filter(x=>x.schoolId===school.id&&has(x.protocol,x.requester)).map(x=>`${x.protocol} — ${x.type} (${x.requester})`));
    }
    if(can('dies','view')){
      push('Inspeções (DIES)','dies',(state.diesInspections||[]).filter(i=>has(i.protocol,i.inspector,i.objective,dSchoolName(i.schoolId))).map(i=>`${i.protocol} — ${dSchoolName(i.schoolId)} (${diesInspStatus(i)})`));
      push('Irregularidades (DIES)','diesIrreg',(state.diesIrregularities||[]).filter(r=>has(r.protocol,r.description,dSchoolName(r.schoolId))).map(r=>`${r.protocol} — ${dSchoolName(r.schoolId)} (${diesIrrLabel(r)})`));
      push('Documentos escolares (DIES)','diesDocs',(state.diesDocuments||[]).filter(d=>has(d.title,d.number,dSchoolName(d.schoolId))).map(d=>`${d.title} — ${dSchoolName(d.schoolId)}`));
    }
    if(can('educacao','view')){
      push('Matrizes','eduMatrizes',(state.matrizes||[]).filter(m=>has(m.name,m.cnpj)).map(m=>`${m.name}${m.cnpj?' — '+m.cnpj:''}`));
      push('Escolas','eduSchools',state.schools.filter(s=>has(s.name,s.inep)).map(s=>`${s.name}${s.inep?' — INEP '+s.inep:''}`));
    }
    box.innerHTML=groups.length?groups.map(([label,page,items])=>`<div class="card"><div class="card-title"><div><h3>${escapeHtml(label)}</h3><span>${items.length} resultado(s)</span></div><button class="small-button gs-go" data-page="${page}" title="Abrir ${escapeHtml(label)}"><i class="fa-solid fa-arrow-right"></i></button></div><ul class="plain-list">${items.slice(0,10).map(i=>`<li>${escapeHtml(i)}</li>`).join('')}</ul></div>`).join(''):'<div class="empty-state">Nenhum resultado encontrado para os módulos aos quais você tem acesso.</div>';
    box.querySelectorAll('.gs-go').forEach(b=>b.onclick=()=>{closeModal();navigate(b.dataset.page);});
  }

  // ----- Topo: busca, tema, notificações, perfil -----
  function wireTopbar(){
    document.getElementById('globalSearchButton')?.addEventListener('click',()=>{
      openModal('Busca global','<div class="filter-bar"><input id="gsModalQ" type="search" placeholder="Buscar alunos, professores, turmas, protocolos..." style="flex:1"></div><div id="gsResults"></div>');
      document.getElementById('gsModalQ').focus();
      document.getElementById('gsModalQ').oninput=e=>runGlobalSearch(e.target.value);
    });
    document.getElementById('themeButton')?.addEventListener('click',()=>{
      const dark=document.documentElement.classList.toggle('theme-dark');
      document.getElementById('themeButton').querySelector('i').className=dark?'fa-solid fa-sun':'fa-solid fa-moon';
      localStorage.setItem('siged_theme',dark?'dark':'light');
    });
    if(localStorage.getItem('siged_theme')==='dark'){document.documentElement.classList.add('theme-dark');const ic=document.getElementById('themeButton')?.querySelector('i');if(ic)ic.className='fa-solid fa-sun';}
    document.getElementById('notificationButton')?.addEventListener('click',()=>{
      const panel=document.getElementById('notificationPanel');
      panel.classList.toggle('hidden');
      if(!panel.classList.contains('hidden')) renderNotificationPanel();
    });
    document.getElementById('profileButton')?.addEventListener('click',()=>{
      confirmAction('Sair do sistema','Deseja encerrar sua sessão no SIGED?',()=>document.getElementById('logoutButton').click(),'Sair');
    });
  }
  function renderNotificationPanel(){
    const panel=document.getElementById('notificationPanel');if(!panel)return;
    const list=(state.notifications||[]).filter(n=>n.schoolId===sid()).slice(0,8);
    const badgeEl=document.getElementById('notifCount');
    const unread=(state.notifications||[]).filter(n=>n.schoolId===sid()&&!n.read).length;
    if(badgeEl) badgeEl.textContent=unread>9?'9+':String(unread);
    if(badgeEl) badgeEl.style.display=unread?'flex':'none';
    const body=panel.querySelector('.notification-body')||panel;
    const items=list.length?list.map(n=>`<div class="notification-item ${n.read?'':'unread'}"><i class="fa-solid fa-bell"></i><div><strong>${escapeHtml(n.text)}</strong><p>${new Date(n.date).toLocaleString('pt-BR')}</p></div></div>`).join(''):'<div class="empty-state">Nenhuma notificação.</div>';
    const oldItems=panel.querySelectorAll('.notification-item');oldItems.forEach(x=>x.remove());
    panel.insertAdjacentHTML('beforeend',items);
    list.forEach(n=>n.read=true);
    save();
  }
  function updateNotifBadge(){
    const unread=(state.notifications||[]).filter(n=>n.schoolId===sid()&&!n.read).length;
    let el=document.getElementById('notifCount');
    if(!el){const btn=document.getElementById('notificationButton');if(!btn)return;el=document.createElement('span');el.id='notifCount';el.className='notif-badge';btn.appendChild(el);}
    el.textContent=unread>9?'9+':String(unread);el.style.display=unread?'flex':'none';
  }


  function renderSettings(){
    content.innerHTML=`${pageHeader('Configurações','Preferências do ambiente de demonstração.')}
      <div class="card"><div class="card-title"><div><h3>Modo de demonstração</h3><span>Este sistema roda inteiramente no navegador (sem servidor). Os dados ficam salvos no localStorage deste navegador.</span></div></div>
      <p>Se algo ficou inconsistente durante os testes, você pode restaurar o cenário de demonstração original (Colégio Horizonte Azul, com alunos, professores, turmas, notas e frequência já preenchidos).</p>
      <div class="form-actions"><button type="button" class="btn-secondary" id="resetDemoBtn"><i class="fa-solid fa-rotate-left"></i> Restaurar dados de demonstração</button></div></div>`;
    document.getElementById('resetDemoBtn').onclick=()=>{
      confirmAction('Restaurar dados de demonstração','Isso apaga TODOS os dados atuais (inclusive o que você cadastrou nesta sessão) e recarrega o cenário de exemplo original. Esta ação não pode ser desfeita. Deseja continuar?',()=>{
        localStorage.removeItem(STORAGE);
        showToast('Dados restaurados. Recarregando...');
        setTimeout(()=>location.reload(),600);
      },'Restaurar dados');
    };
  }

  // ===== Dados de exemplo (carga inicial) — para o sistema já nascer com uma escola em funcionamento =====
  function seedDemoData(){
    const now=new Date().toISOString();
    const year=new Date().getFullYear();
    const today=new Date();
    const isoDaysAgo=n=>{const d=new Date(today);d.setDate(d.getDate()-n);return d.toISOString().slice(0,10);};
    const slug=t=>t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').split(' ').slice(0,2).join('.');
    const domain='@horizonteazul.edu.br';

    const school={id:crypto.randomUUID(),name:'Colégio Horizonte Azul',cnpj:'12.345.678/0001-90',inep:'28012345',email:'contato'+domain,phone:'(79) 3211-4455',address:'Av. Beira Mar, 1200 — Praia 13 de Julho',city:'Aracaju',state:'SE',createdAt:now};
    state.schools.push(school);
    state.currentSchoolId=school.id;

    const classDefs=[
      {grade:'5º ano do Ensino Fundamental',name:'A',shift:'Manhã',room:'Sala 12',vacancies:32},
      {grade:'1º ano do Ensino Médio',name:'A',shift:'Manhã',room:'Sala 21',vacancies:30},
      {grade:'3º ano do Ensino Médio',name:'A',shift:'Tarde',room:'Sala 05',vacancies:28}
    ];
    const classes=classDefs.map(cd=>{const subjects=getTemplate(cd.grade);return {id:crypto.randomUUID(),schoolId:school.id,year,grade:cd.grade,name:cd.name,shift:cd.shift,room:cd.room,vacancies:cd.vacancies,subjects,schedule:buildSchedule(subjects),updatedAt:now};});
    state.classes.push(...classes);

    // Professores (cadastro + funcionário) e distribuição por turma/disciplina
    const teacherDefs=[
      {name:'Marina Souza Lima',role:'Professora de Língua Portuguesa',formation:'Licenciatura em Letras',bond:'Efetivo',subjects:['Língua Portuguesa'],classIdx:[0,1,2],hours:3},
      {name:'Rafael Andrade Costa',role:'Professor de Matemática',formation:'Licenciatura em Matemática',bond:'Efetivo',subjects:['Matemática'],classIdx:[0,1,2],hours:3},
      {name:'Juliana Ferreira Melo',role:'Professora de Biologia',formation:'Licenciatura em Ciências Biológicas',bond:'Contratado',subjects:['Biologia'],classIdx:[1,2],hours:2},
      {name:'Eduardo Pontes Silva',role:'Professor de História',formation:'Licenciatura em História',bond:'Efetivo',subjects:['História'],classIdx:[0,1,2],hours:2},
      {name:'Camila Rocha Barros',role:'Professora de Educação Física',formation:'Licenciatura em Educação Física',bond:'Temporário',subjects:['Educação Física'],classIdx:[0,1,2],hours:1}
    ];
    const teacherIds=[];
    teacherDefs.forEach((t,idx)=>{
      const email=slug(t.name)+domain;const tid=crypto.randomUUID();teacherIds.push(tid);
      state.teachers.push({id:tid,schoolId:school.id,name:t.name,registration:'PROF-'+(1000+idx),cpf:`0${idx}1.234.567-${10+idx}`,email,phone:'(79) 99911-00'+(10+idx),formation:t.formation,bond:t.bond,contractHours:20,status:'Ativo',classId:classes[t.classIdx[0]].id,className:classes[t.classIdx[0]].name});
      state.employees.push({id:crypto.randomUUID(),schoolId:school.id,name:t.name,role:t.role,type:'Professor',admissionDate:`${year-2}-02-01`,regime:'Horista',cargaHorariaSemanal:20,valorHora:38,salary:Math.round(20*38*4.5*100)/100,status:'Ativo',hasAccess:true,email});
      t.classIdx.forEach(ci=>t.subjects.forEach(sn=>{
        if((classes[ci].subjects||[]).some(x=>x.name===sn)) state.teacherAssignments.push({id:crypto.randomUUID(),schoolId:school.id,teacherId:tid,classId:classes[ci].id,subject:sn,weeklyClasses:t.hours,weights:{av1:1,av2:1,trabalho:1}});
      }));
    });

    // Demais funcionários (gestão e apoio)
    const staffDefs=[
      {name:'Marcos Vieira Teixeira',role:'Diretor Escolar',salary:7800,profile:'Direção'},
      {name:'Patrícia Gomes Almeida',role:'Secretária Escolar',salary:2600,profile:'Secretaria'},
      {name:'Roberta Cavalcante',role:'Assistente de Atendimento',salary:2300,profile:'Secretaria'},
      {name:'Simone Albuquerque',role:'Analista de RH',salary:3900,profile:'Administrativo'},
      {name:'André Luiz Santana',role:'Coordenador Pedagógico',salary:4200,profile:'Administrativo'},
      {name:'Fernanda Dias Oliveira',role:'Auxiliar de Serviços Gerais',salary:1650,profile:'Apoio / Limpeza'}
    ];
    staffDefs.forEach(s=>state.employees.push({id:crypto.randomUUID(),schoolId:school.id,name:s.name,role:s.role,type:'Funcionário',admissionDate:`${year-1}-03-10`,regime:'Mensalista',cargaHorariaSemanal:0,valorHora:0,salary:s.salary,status:'Ativo',hasAccess:true,email:slug(s.name)+domain,accessProfile:s.profile}));

    // Responsáveis e alunos (30 alunos, 12 responsáveis; alguns responsáveis têm mais de um filho)
    const firstNames=['Ana','Bruno','Caio','Duda','Elisa','Felipe','Gabriela','Heitor','Igor','Júlia','Karina','Lucas','Mariana','Nicolas','Olívia','Pedro','Rafaela','Sofia','Thaís','Vinícius','Yara','Davi','Larissa','Enzo','Helena','Miguel','Beatriz','Arthur','Valentina','Gustavo'];
    // Alunos de exemplo para o módulo "Alunos em acompanhamento": 3 por nível de atenção (índices 18 a 29).
    // p = média-base por bimestre; weak/wd = nº de disciplinas mais fracas e o quanto caem; early/late = taxa de faltas
    // na 1ª e 2ª metade das aulas; occ = ocorrências em aberto. Normal = já estiveram em acompanhamento e se recuperaram.
    const CI_DEMO_LEVELS=['🟢 Normal','🟡 Atenção','🟠 Acompanhamento intensivo','🔴 Atenção imediata'];
    const DEMO_PROFILES={
      18:{lvl:'Normal',p:[8.2,8.5,8.7],weak:0,wd:0,early:.06,late:0,occ:0},
      19:{lvl:'Normal',p:[6.8,7.2,7.6],weak:0,wd:0,early:.12,late:.04,occ:0},
      20:{lvl:'Normal',p:[7.0,7.1,7.4],weak:0,wd:0,early:.1,late:.06,occ:1},
      21:{lvl:'Atenção',p:[6.8,6.4,6.0],weak:2,wd:1,early:.12,late:.2,occ:0},
      22:{lvl:'Atenção',p:[6.9,6.5,6.2],weak:3,wd:1.2,early:.15,late:.3,occ:1},
      23:{lvl:'Atenção',p:[6.6,6.5,6.4],weak:3,wd:.8,early:.1,late:.25,occ:0},
      24:{lvl:'Intensivo',p:[6.4,5.8,5.4],weak:3,wd:1,early:.2,late:.35,occ:1},
      25:{lvl:'Intensivo',p:[6.5,6.0,5.6],weak:2,wd:1,early:.2,late:.4,occ:0},
      26:{lvl:'Intensivo',p:[6.0,5.6,5.4],weak:3,wd:1,early:.2,late:.35,occ:1},
      27:{lvl:'Imediata',p:[5.8,5.0,4.4],weak:5,wd:1,early:.35,late:.6,occ:2},
      28:{lvl:'Imediata',p:[4.5,3.9,3.2],weak:6,wd:.5,early:.25,late:.35,occ:3},
      29:{lvl:'Imediata',p:[6.2,5.6,5.0],weak:4,wd:1,early:.32,late:.62,occ:1}
    };
    const lastNames=['Almeida','Barros','Costa','Dantas','Esteves','Farias','Gonçalves','Henriques','Ibiapina','Jardim','Lacerda','Menezes'];
    const guardianFirst=['Maria','José','Cláudia','Roberto','Sandra','Paulo','Luciana','Ricardo','Adriana','Marcelo','Tânia','Fábio'];
    const guardians=guardianFirst.map((fn,i)=>{const g={id:crypto.randomUUID(),schoolId:school.id,name:`${fn} ${lastNames[i]}`,cpf:`1${String(i).padStart(2,'0')}.456.789-0${i%10}`,phone:`(79) 99${String(8000+i*37).slice(0,3)}-${String(1000+i*91).slice(0,4)}`,email:slug(`${fn} ${lastNames[i]}`)+'@email.com',emergency:'Sim',canPickup:'Sim',status:'Ativo'};state.guardians.push(g);return g;});
    const students=[];let si=0;
    const slots=[];classes.forEach((cls,ci)=>{for(let i=0;i<6;i++)slots.push([cls,ci]);});
    for(let e=0;e<12;e++)slots.push([classes[e%3],e%3]);
    slots.forEach(([cls,ci])=>{
      const gi=si%12;const g=guardians[gi];
      const birthYear=year-(ci===0?10:ci===1?15:17);
      const st={id:crypto.randomUUID(),schoolId:school.id,name:`${firstNames[si]} ${lastNames[gi]}`,socialName:'',birthDate:`${birthYear}-0${(si%9)+1}-1${si%9}`,cpf:`2${String(si).padStart(2,'0')}.111.222-${String(10+si).slice(-2)}`,rg:`${1000000+si*13}-SSP/SE`,gender:si%2?'Masculino':'Feminino',nationality:'Brasileira',birthplace:'Aracaju/SE',mother:g.name,father:'',cep:'49030-000',street:'Rua das Acácias',number:String(100+si),complement:'',neighborhood:'Jardins',city:'Aracaju',uf:'SE',phone:'',cellphone:g.phone,email:'',classId:cls.id,className:cls.name,status:'Ativo',modality:'Regular',previousSchool:si%5===0?'Escola Municipal Santos Dumont':'',enrollmentDate:`${year}-01-2${si%9}`,emergencyContact:`${g.name} — ${g.phone}`,pickupAuthorized:g.name,aee:si===4?'Sim':'Não',aeeNotes:si===4?'Acompanhamento com sala de recursos multifuncionais (2x/semana).':'',pedagogicalNotes:'',registration:'ALU-'+(2000+si),guardians:[{guardianId:g.id,kinship:si%2?'Pai':'Mãe'}],history:[{date:`${year}-01-2${si%9}`,text:`Matrícula efetivada na turma ${classLabel(cls)}`,by:'Secretaria'}]};
      state.students.push(st);students.push(st);si++;});

    // Lançamentos de aulas e frequência (coerentes com turmas, professores e alunos)
    const asgs=state.teacherAssignments.filter(a=>a.schoolId===school.id);
    asgs.forEach((a,ai)=>{
      const studs=students.filter(s=>s.classId===a.classId);
      for(let k=0;k<8;k++){
        const attendance=studs.map((s,idx)=>{const n=students.indexOf(s);let status='Presente';const seed=(n*3+k*5+ai)%11;const dp=DEMO_PROFILES[n];if(dp){const r=k<5?dp.early:dp.late,q=k<5?ai*5+k:ai*3+(k-5);if(Math.floor((q+1)*r+1e-9)>Math.floor(q*r+1e-9))status='Falta';return {studentId:s.id,status};}if(n===3&&k%2===0)status='Falta';else if(n===8&&k%3===0)status='Falta';else if(seed===0)status='Falta';else if((n+k+ai)%13===0)status='Falta Justificada';return {studentId:s.id,status};});
        state.lessonRecords.push({id:crypto.randomUUID(),schoolId:school.id,classId:a.classId,subject:a.subject,date:isoDaysAgo(56-k*7-(ai%3)),teacherId:a.teacherId,title:`${a.subject} — aula ${k+1}`,description:'Conteúdo do bimestre conforme planejamento.',methodology:k%2?'Aula expositiva dialogada':'Atividade em grupo',notes:'',attendance});
      }
    });

    // Notas do 1º e 2º bimestres (completas) e 3º (parcial)
    students.forEach((s,n)=>{
      const cls=classById(s.classId);
      (cls.subjects||[]).forEach((sub,ki)=>{
        PERIODS.slice(0,3).forEach((per,pi)=>{
          if(pi===2&&(n+ki)%2===0&&!DEMO_PROFILES[n]) return;
          let base=6.2+((n*7+ki*3+pi*5)%37)/10;
          if(n===3) base=4.2+((ki*3+pi)%9)/10;
          if(n===8) base=5.4+((ki+pi)%6)/10;
          const dp=DEMO_PROFILES[n];if(dp) base=Math.max(0,dp.p[pi]-(ki<dp.weak?dp.wd:0)+(((ki*5)%3)-1)*0.15);
          if(base>9.8) base=9.8;
          const av1=Math.round(base*10)/10;
          const av2=pi===2?null:Math.min(10,Math.round((base+(((n+ki)%5)-2)*0.4)*10)/10);
          const trab=pi===2?null:Math.min(10,Math.round((base+0.5)*10)/10);
          const rec=(pi===1&&av2!==null&&base<5.8&&(n+ki)%2===0&&!dp)?Math.min(10,Math.round((base+2)*10)/10):null;
          state.grades.push({id:crypto.randomUUID(),schoolId:school.id,classId:cls.id,subject:sub.name,period:per,studentId:s.id,av1,av2:av2<0?0:av2,trabalho:trab,recuperacao:rec,history:[{date:now,by:'Carga inicial',field:'av1',from:null,to:av1}]});
        });
      });
    });

    // Contas de demonstração (login simulado)
    const mk=(name,role,email,password,vinculo,vinculoLabel,matricula)=>state.mockUsers.push({id:crypto.randomUUID(),name,role,email,password,schoolId:school.id,status:'Ativo',vinculo:vinculo||null,vinculoLabel:vinculoLabel||'',matricula});
    mk('Marcos Vieira Teixeira','direcao','diretor'+domain,'direcao123',null,'Diretor Escolar','FUNC-0001');
    mk('Patrícia Gomes Almeida','secretaria','secretaria'+domain,'secretaria123',null,'Secretária Escolar','FUNC-0002');
    mk('Simone Albuquerque','rh','rh'+domain,'rh123',null,'Analista de RH','FUNC-0004');
    mk('Marina Souza Lima','professor',slug('Marina Souza Lima')+domain,'professor123',teacherIds[0],'Professora de Língua Portuguesa','PROF-1000');
    mk(students[0].name,'aluno','aluno.'+slug(students[0].name)+'@aluno.horizonteazul.edu.br','aluno123',students[0].id,`Aluno(a) — ${classLabel(classes[0])}`,students[0].registration);
    mk(guardians[0].name,'responsavel',guardians[0].email,'responsavel123',guardians[0].id,`Responsável por ${students.filter(x=>x.guardians[0].guardianId===guardians[0].id).length} alunos`,'RESP-0001');

    // Pipeline de contratação (BPMN)
    state.jobs.push({id:crypto.randomUUID(),schoolId:school.id,title:'Professor de Educação Física (2ª vaga)',sector:'Pedagógico',type:'Professor',description:'Reforço para turmas do Ensino Fundamental no turno da manhã.',status:'Aguardando aprovação'});
    const jobOpen={id:crypto.randomUUID(),schoolId:school.id,title:'Auxiliar Administrativo',sector:'Administrativo',type:'Funcionário',description:'Apoio à secretaria escolar no atendimento e organização de documentos.',status:'Aberta'};
    state.jobs.push(jobOpen);
    [{name:'Beatriz Nunes Carvalho',status:'Aprovado'},{name:'Thiago Moreira Ramos',status:'Entrevista'},{name:'Larissa Prado Teixeira',status:'Triagem'}].forEach(c=>state.candidates.push({id:crypto.randomUUID(),schoolId:school.id,jobId:jobOpen.id,name:c.name,contact:'(79) 9 9988-7766',status:c.status}));
    state.employees.push({id:crypto.randomUUID(),schoolId:school.id,name:'Beatriz Nunes Carvalho',role:'Auxiliar Administrativo',type:'Funcionário',admissionDate:todayIso(),regime:'Mensalista',cargaHorariaSemanal:0,valorHora:0,salary:1800,status:'Aguardando Financeiro',hasAccess:false});
    state.employees.push({id:crypto.randomUUID(),schoolId:school.id,name:'Carlos Eduardo Lima',role:'Professor de Geografia',type:'Professor',admissionDate:todayIso(),regime:'Horista',cargaHorariaSemanal:16,valorHora:35,salary:Math.round(16*35*4.5*100)/100,status:'Aguardando Liberação de Acesso',hasAccess:false});
    state.teachers.push({id:crypto.randomUUID(),schoolId:school.id,name:'Carlos Eduardo Lima',registration:'PROF-1099',email:'',classId:null,className:'Sem vínculo',status:'Ativo',bond:'Contratado',formation:'Licenciatura em Geografia',contractHours:16});

    // Matrículas, período letivo, comunicados, financeiro, protocolo, ocorrência
    state.enrollmentRequests.push({id:crypto.randomUUID(),schoolId:school.id,studentName:'Vitor Hugo Nascimento',type:'Matrícula Inicial',requestDate:todayIso(),notes:'Documentação entregue; ao concluir esta solicitação, o cadastro do aluno é criado automaticamente.',status:'Em análise'});
    state.enrollmentRequests.push({id:crypto.randomUUID(),schoolId:school.id,studentName:'Yasmin Cordeiro Reis',type:'Transferência Recebida',requestDate:todayIso(),notes:'Aguardando envio do histórico escolar pela escola de origem.',status:'Pendente de documentos'});
    state.academicPeriods.push({id:crypto.randomUUID(),schoolId:school.id,name:`${year} — Ano Letivo`,type:'Ano Letivo',startDate:`${year}-02-03`,endDate:`${year}-12-18`,schoolDays:200,status:'Em andamento'});
    state.announcements.push({id:crypto.randomUUID(),schoolId:school.id,title:'Reunião de pais e mestres — 3º bimestre',audience:'Responsáveis',message:'Convidamos os responsáveis para a reunião de acompanhamento pedagógico, na próxima sexta-feira, às 18h.',sendDate:todayIso(),status:'Enviado'});
    state.announcements.push({id:crypto.randomUUID(),schoolId:school.id,title:'Semana Pedagógica confirmada',audience:'Professores',message:'A Semana Pedagógica acontecerá antes do início do próximo semestre, com palestras e planejamento.',sendDate:todayIso(),status:'Enviado'});
    state.announcements.push({id:crypto.randomUUID(),schoolId:school.id,title:'Calendário de avaliações do 3º bimestre',audience:'Alunos',message:'As avaliações do 3º bimestre seguem o calendário publicado no portal. Bons estudos!',sendDate:todayIso(),status:'Enviado'});
    state.financeRecords.push({id:crypto.randomUUID(),schoolId:school.id,studentId:students[0].id,type:'Taxa / material',amount:120,dueDate:`${year}-11-10`,status:'Em aberto'});
    state.financeRecords.push({id:crypto.randomUUID(),schoolId:school.id,studentId:students[1].id,type:'Taxa / material',amount:120,dueDate:`${year}-09-10`,status:'Atrasado'});
    state.serviceRequests.push({id:crypto.randomUUID(),schoolId:school.id,protocol:'ATD-'+year+'-000123',type:'Declaração Escolar',requester:students[0].name,priority:'Normal',dueDate:`${year}-10-05`,notes:'Declaração para fins de auxílio-transporte.',status:'Em análise'});
    state.occurrences.push({id:crypto.randomUUID(),schoolId:school.id,studentName:students[3].name,studentId:students[3].id,type:'Comportamental',description:'Faltas recorrentes em aulas da manhã; família contatada pela coordenação.',date:isoDaysAgo(5),status:'Encaminhada'});
    // Ocorrências em aberto dos alunos de exemplo (alimentam o componente "Ocorrências" do índice de atenção)
    const demoOccTexts=['Atrasos e saídas antecipadas recorrentes; coordenação conversou com o aluno.','Desinteresse nas atividades em sala e conversas paralelas durante as explicações.','Faltas seguidas sem justificativa; responsável será contatado.'];
    students.forEach((st,n)=>{const dp=DEMO_PROFILES[n];if(!dp)return;for(let o=0;o<dp.occ;o++)state.occurrences.push({id:crypto.randomUUID(),schoolId:school.id,studentName:st.name,studentId:st.id,type:['Comportamental','Sala de Aula','Disciplinar'][(n+o)%3],description:demoOccTexts[(n+o)%3],date:isoDaysAgo(3+o*6+(n%4)),status:o===0?'Em aberto':'Encaminhada'});});
    // Alunos "Normal": já estiveram em acompanhamento e se recuperaram (o sistema sugere revisar/encerrar; nunca encerra sozinho)
    state.followUps=state.followUps||[];
    const demoDaysAgoIso=d=>new Date(Date.now()-d*864e5).toISOString();
    [[18,58,{media:5.4,freq:68,recCount:4,index:61,levelIdx:2},['Frequência abaixo do limite','Média geral baixa','4 disciplinas abaixo da média']],
     [19,47,{media:5.7,freq:73,recCount:3,index:54,levelIdx:2},['Frequência abaixo do limite','Média geral baixa','3 disciplinas abaixo da média']],
     [20,36,{media:5.9,freq:78,recCount:2,index:41,levelIdx:1},['Média geral baixa','2 disciplinas abaixo da média']]
    ].forEach(([n,days,base,reasons])=>{const st=students[n];const lv=CI_DEMO_LEVELS[base.levelIdx];
      state.followUps.push({id:crypto.randomUUID(),schoolId:school.id,studentId:st.id,status:'Ativo',openedAt:demoDaysAgoIso(days),auto:true,ack:true,entryReasons:reasons,baseline:{date:demoDaysAgoIso(days),...base},levelIdx:base.levelIdx,index:base.index,alertKeys:[],evoState:'stable',closeSuggestedAt:null,closeDismissedSig:null,suggestions:[],reentry:false,
        events:[{at:demoDaysAgoIso(days),type:'entrada',text:`Entrou em acompanhamento automaticamente. Motivos: ${reasons.join(' + ')}.`},{at:demoDaysAgoIso(days),type:'nivel',text:`Nível de atenção inicial: ${lv} (índice ${base.index}%).`}]});
      state.trackingRecords.push({id:crypto.randomUUID(),schoolId:school.id,studentId:st.id,date:isoDaysAgo(days-5),at:demoDaysAgoIso(days-5),reasons:reasons,notes:'Reunião com o responsável e definição de metas de frequência e de um plano de reforço.',actionType:'Reunião / atendimento',responsible:'André Luiz Santana',status:'Em acompanhamento'});
      state.trackingRecords.push({id:crypto.randomUUID(),schoolId:school.id,studentId:st.id,date:isoDaysAgo(Math.round(days/2)),at:demoDaysAgoIso(Math.round(days/2)),reasons:reasons,notes:'Reforço escolar semanal nas disciplinas com média baixa; professores acompanham a entrega das atividades.',actionType:'Reforço escolar',responsible:'André Luiz Santana',status:'Em acompanhamento'});});
    // Ações já registradas para alguns alunos de outros níveis
    [[27,'Contato com o responsável','Responsável contatado por telefone; família relatou dificuldades de transporte. Combinado retorno em 7 dias.'],
     [24,'Conversa com professor','Professores de Matemática e Ciências relataram queda de participação; atividades de recuperação combinadas.'],
     [28,'Reunião / atendimento','Atendimento com aluno e responsável; encaminhamento ao conselho de classe sugerido.']
    ].forEach(([n,type,notes],i)=>state.trackingRecords.push({id:crypto.randomUUID(),schoolId:school.id,studentId:students[n].id,date:isoDaysAgo(4+i*3),at:demoDaysAgoIso(4+i*3),reasons:[],notes,actionType:type,responsible:'André Luiz Santana',status:'Em acompanhamento'}));
    state.notifications.push({id:crypto.randomUUID(),schoolId:school.id,type:'comunicado',text:'Reunião de pais e mestres — 3º bimestre.',studentId:null,date:now,read:false});

    const seedLog=(module,action,summary)=>state.auditLog.unshift({id:crypto.randomUUID(),schoolId:school.id,when:now,user:'Sistema',role:'Carga inicial',module,action,summary});
    seedLog('Escolas','Cadastro','Colégio Horizonte Azul cadastrado como escola de demonstração.');
    seedLog('Alunos','Cadastro','30 alunos com 12 responsáveis, distribuídos em 3 turmas.');
    seedLog('Diário','Lançamento de frequência','Aulas e chamadas registradas para as turmas do ano letivo.');
    seedLog('Notas','Lançamento de nota','Notas dos 1º e 2º bimestres lançadas (3º parcial).');
    save();
  }
  if(!state.schools.length){ seedDemoData(); }
  if(!Object.keys(state.permissions||{}).length){ state.permissions = seedDefaultPermissions(); save(); }
  // ===== Dados de exemplo para as áreas que estavam vazias (geram-se uma única vez; podem ser editados) =====
  function fillExampleData(){
    if(state.examplesV1) return false;
    const sch=state.schools[0];if(!sch){return false;}
    const today=dToday();const isoToday=todayIso();
    const empty=k=>!(state[k]||[]).length;
    const add=(k,list)=>{if(!empty(k))return;state[k]=list.map(x=>({id:crypto.randomUUID(),schoolId:sch.id,...x}));};
    const E=(state.employees||[]).filter(e=>e.schoolId===sch.id);
    const prof=E.find(e=>e.type==='Professor')||E[0],func=E.find(e=>e.type==='Funcionário')||E[0],third=E[2]||E[0];
    const S=(state.students||[]).filter(s=>s.schoolId===sch.id);const C=(state.classes||[]).filter(c=>c.schoolId===sch.id);
    const stu=i=>S[i]||S[0];
    if(E.length){
      add('benefits',[{employeeId:prof.id,type:'Plano de Saúde',description:'Plano de saúde coletivo',value:320,status:'Ativo'},{employeeId:func.id,type:'Vale-Transporte',description:'Vale-transporte mensal',value:180,status:'Ativo'}]);
      add('leaves',[{employeeId:third.id,type:'Atestado Médico',startDate:dAdd(today,-3),endDate:dAdd(today,2),notes:'Atestado médico de 5 dias.',status:'Em andamento'}]);
      add('terminations',[{employeeId:E[E.length-1].id,date:dAdd(today,-20),reason:'Pedido de demissão',severance:4200,status:'Calculada'}]);
      add('evaluations',[{employeeId:prof.id,period:'1º semestre/2026',coordScore:8.5,selfScore:8,feedbackScore:9,notes:'Bom desempenho em sala e bom relacionamento com a equipe.'}]);
      add('careerPlans',[{employeeId:prof.id,level:'Professor II',titulacao:'Especialização',tempoCasaAnos:3,nextProgression:'Janeiro/2027',status:'Em dia'}]);
      add('safety',[{employeeId:prof.id,examType:'Exame Periódico',date:dAdd(today,-200),dueDate:dAdd(today,165),status:'Em dia'},{employeeId:func.id,examType:'Exame Admissional',date:dAdd(today,7),dueDate:'',status:'Agendado'}]);
      add('payrollRuns',[{date:dAdd(today,-30),count:E.length,total:Math.round(E.reduce((a,e)=>a+(Number(e.salary)||0),0)*100)/100}]);
    }
    add('substitutes',[{name:'Luciana Martins Prado',subject:'Matemática',phone:'(85) 99999-0101',availability:'Imediata',status:'Disponível'},{name:'Thiago Bezerra Lima',subject:'Língua Portuguesa',phone:'(85) 99999-0102',availability:'Apenas manhã',status:'Disponível'}]);
    add('trainings',[{title:'Semana Pedagógica 2026',type:'Semana Pedagógica',date:dAdd(today,-60),participants:24,notes:'Planejamento do ano letivo.',status:'Concluído'},{title:'Capacitação em avaliação da aprendizagem',type:'Capacitação de Equipe de Frente',date:dAdd(today,15),participants:18,notes:'Oficina para professores e coordenação.',status:'Planejado'}]);
    add('climateSurveys',[{title:'Pesquisa de clima — 1º semestre',date:dAdd(today,-30),respondents:18,avgScore:4.2,notes:'Pontos fortes: ambiente colaborativo. Ponto de atenção: carga de trabalho.'}]);
    add('wellbeing',[{title:'Roda de conversa: prevenção ao burnout',type:'Prevenção ao Burnout',date:dAdd(today,10),notes:'Encontro com a equipe docente.',status:'Planejado'}]);
    add('unions',[{name:'Sindicato dos Professores da Rede Privada',category:'Professores',cctValidity:dAdd(today,200),notes:'Convenção coletiva vigente.'}]);
    add('lgpd',[{item:'Política de privacidade publicada',responsible:'Direção',status:'Conforme',notes:''},{item:'Registro de tratamento de dados de alunos',responsible:'Secretaria',status:'Em adequação',notes:'Mapeamento em andamento.'}]);
    add('ethicsCases',[{protocol:'ETI-2026-0001',category:'Conduta Inadequada com Aluno',notes:'Caso de exemplo para demonstrar o fluxo de apuração.',status:'Em apuração'}]);
    add('interns',[{name:'Bruna Sales Oliveira',course:'Pedagogia',institution:'Universidade parceira',supervisor:prof?prof.name:'',startDate:dAdd(today,-90),endDate:dAdd(today,90),status:'Ativo'}]);
    add('appointments',[{title:'Reunião com responsável sobre matrícula',withWhom:'Secretaria',date:dAdd(today,1),time:'09:00',status:'Agendado'},{title:'Orientação pedagógica',withWhom:'Coordenação Pedagógica',date:today,time:'14:30',status:'Confirmado'}]);
    add('queueTickets',[{date:isoToday,number:1,type:'Normal',status:'Aguardando'},{date:isoToday,number:2,type:'Prioritária',status:'Aguardando'}]);
    add('spaces',[{name:'Sala 101',type:'Sala de Aula',capacity:35,resources:'Projetor, ar-condicionado e quadro branco.',status:'Disponível'},{name:'Laboratório de Informática',type:'Laboratório',capacity:24,resources:'24 computadores e internet.',status:'Disponível'},{name:'Biblioteca',type:'Biblioteca',capacity:30,resources:'Acervo e mesas de estudo.',status:'Em manutenção'}]);
    add('assets',[{name:'Carteira escolar',category:'Mobiliário',quantity:120,location:'Salas de aula',status:'Em uso'},{name:'Computador desktop',category:'Equipamento de TI',quantity:24,location:'Laboratório de Informática',status:'Em uso'}]);
    add('library',[{title:'Dom Casmurro',borrower:stu(0)?stu(0).name:'',loanDate:dAdd(today,-5),dueDate:dAdd(today,9),status:'Emprestado'},{title:'O Pequeno Príncipe',borrower:stu(1)?stu(1).name:'',loanDate:dAdd(today,-20),dueDate:dAdd(today,-6),status:'Devolvido'}]);
    add('transportVehicles',[{plate:'ABC-1D23',model:'Micro-ônibus escolar',capacity:28,docExpiry:dAdd(today,120),lastMaintenance:dAdd(today,-45),status:'Em operação'}]);
    add('transportDrivers',[{name:'José Ribamar Nogueira',cnh:'12345678900',cnhExpiry:dAdd(today,300),phone:'(85) 99999-0202',status:'Ativo'}]);
    add('transportRoutes',[{name:'Rota Centro — manhã',vehicle:'ABC-1D23',driver:'José Ribamar Nogueira',monitor:'Aparecida Lima',shift:'Manhã',studentsCount:22,status:'Ativa'}]);
    add('meals',[{title:'Arroz, feijão, frango grelhado e salada',date:today,restrictions:'Opção sem lactose disponível.',status:'Planejado'}]);
    if(S.length){
      add('healthRecords',[{studentId:stu(0).id,type:'Registro de Atendimento',description:'Aluno atendido com dor de cabeça leve; responsável avisado.',date:dAdd(today,-4),status:'Resolvido'}]);
      add('aeeRecords',[{studentId:stu(1).id,need:'Deficiência Intelectual',professional:'Profissional do AEE',resources:'Material adaptado e apoio individual.',schedule:'Terças, 14h',evolution:'Boa adaptação às atividades propostas.',status:'Em atendimento'}]);
      add('documentIssuances',[{studentName:stu(0).name,docType:'Declaração de Matrícula',issueDate:dAdd(today,-2),notes:'',protocol:'DOC-2026-0001'}]);
      add('studentDocuments',[{studentId:stu(0).id,docType:'Certidão de Nascimento',file:'',notes:'Conferida na secretaria.',status:'Aprovado'},{studentId:stu(1).id,docType:'RG',file:'',notes:'Aguardando entrega pelo responsável.',status:'Pendente'}]);
      add('certificates',[{studentId:stu(2).id,studentName:stu(2).name,start:dAdd(today,-3),end:dAdd(today,-1),reason:'Atestado médico (gripe).',document:'Atestado nº 2026/118',updatedAt:new Date().toISOString()}]);
    }
    add('contactLogs',[{subject:'Dúvida sobre o calendário de provas',channel:'Telefone',notes:'Responsável orientado sobre as datas do 3º bimestre.',forwardedTo:'',status:'Concluído'},{subject:'Solicitação de segunda via de boletim',channel:'Presencial',notes:'Encaminhado à secretaria.',forwardedTo:'Secretaria',status:'Encaminhado'}]);
    add('lessonPlans',[{title:'Frações — introdução',subject:'Matemática',date:dAdd(today,2),content:'Conceito de fração, representação e exemplos do cotidiano.',status:'Planejado'}]);
    if(C.length) add('classCouncils',[{classId:C[0].id,period:'1º Bimestre',date:dAdd(today,-10),participants:'Direção, coordenação e professores',agenda:'Análise de desempenho e frequência.',decisions:'Reforço para os alunos com baixo rendimento.',status:'Realizado'}]);
    add('inventory',[{name:'Papel A4 (resma)',category:'Material de escritório',unit:'cx',quantity:12,minQuantity:5,supplier:'Papelaria Central',location:'Almoxarifado'},{name:'Detergente 5L',category:'Material de limpeza',unit:'un',quantity:2,minQuantity:6,supplier:'Distribuidora Limpa',location:'Depósito'}]);
    add('publicFunds',[{source:'Repasse Federal (PDDE)',description:'Repasse anual do PDDE',amount:18500,receivedDate:dAdd(today,-60),status:'Recebido'}]);
    add('publicExpenses',[{category:'Material Didático/Escolar',description:'Compra de material didático',amount:2300,supplier:'Papelaria Central',document:'NF 1245',date:dAdd(today,-25),status:'Pago'}]);

    // --- Departamento de Educação: matriz e vínculo da escola ---
    if(empty('matrizes')){
      const m={id:crypto.randomUUID(),name:'Rede Horizonte de Ensino',cnpj:'12.345.678/0001-90',net:'Privada',address:sch.address||'',city:sch.city||'',state:sch.state||'',phone:sch.phone||'',email:sch.email||'',responsible:'Direção Geral',status:'Ativa',createdBy:'Exemplo',createdAt:new Date().toISOString()};
      state.matrizes=[m];
      if(!sch.matrizId){sch.matrizId=m.id;sch.unitType='Sede';}
    }
    // --- RH: ingresso e contrato de alguns profissionais ---
    const profs=E.filter(e=>e.type==='Professor');
    const setF=(e,ing,det,ct)=>{if(e&&!e.ingressType){e.ingressType=ing;e.ingressDetail=det;e.contract=ct;e.hrHistory=[{at:new Date().toISOString(),user:'Exemplo',text:`Ficha preenchida: ${ing} / ${ct.type}`}];}};
    setF(profs[0],'Concurso público','Edital 01/2019',{type:'Estatutário (efetivo)',number:'EST-0001',start:profs[0]?.admissionDate||'',end:'',weeklyHours:profs[0]?.cargaHorariaSemanal||'',status:'Vigente',notes:''});
    setF(profs[1],'Processo seletivo (recrutamento do RH)','Processo seletivo 2024/1',{type:'CLT — prazo indeterminado',number:'CLT-0102',start:profs[1]?.admissionDate||'',end:'',weeklyHours:profs[1]?.cargaHorariaSemanal||'',status:'Vigente',notes:''});
    setF(profs[2],'Contrato temporário','Substituição de licença',{type:'Contrato temporário (administrativo)',number:'TMP-0007',start:dAdd(today,-160),end:dAdd(today,20),weeklyHours:profs[2]?.cargaHorariaSemanal||'',status:'Vigente',notes:'Contrato com término próximo.'});

    // --- DIES: inspeções, documentos, irregularidades e denúncia de exemplo ---
    if(empty('diesInspections')&&empty('diesIrregularities')&&empty('diesDocuments')&&empty('diesComplaints')){
      const cfg=diesCfg();const snap=cfg.checklist.filter(c=>c.active).map(c=>({id:c.id,category:c.category,text:c.text,required:false}));
      const answers={};snap.forEach(it=>{answers[it.id]={answer:'Conforme'};});
      const ncItem=snap.find(x=>x.text==='Registros e atas escolares')||snap[2];
      const insp=(over)=>({id:crypto.randomUUID(),schoolId:sch.id,inspector:'Carlos Henrique Dantas',createdBy:'Carlos Henrique Dantas',createdAt:new Date().toISOString(),history:[],...over});
      const i1=insp({protocol:'',type:'Inspeção de rotina',plannedDate:dAdd(today,-40),doneDate:dAdd(today,-38),objective:'Verificar a regularidade documental e os registros escolares.',description:'Inspeção de exemplo.',status:'Concluída',result:'Regular com pendências',notes:'Documentação em ordem, exceto pela organização das atas escolares.',checklistItems:snap,answers});
      const irr1={id:crypto.randomUUID(),protocol:'',schoolId:sch.id,inspectionId:i1.id,category:ncItem?ncItem.category:'Documentação e regularidade',description:`${ncItem?ncItem.text:'Registros e atas escolares'}: atas sem assinatura de todos os responsáveis.`,identifiedDate:dAdd(today,-38),createdBy:'Carlos Henrique Dantas',evidence:[],evidenceNotes:'Atas do 1º bimestre.',measure:'Colher as assinaturas pendentes e reenviar as atas.',deadline:dAdd(today,8),owner:'Carlos Henrique Dantas',status:'Aguardando correção',history:[]};
      if(ncItem) answers[ncItem.id]={answer:'Não conforme',desc:'Atas sem assinatura de todos os responsáveis.',evidence:'Atas do 1º bimestre.',measure:irr1.measure,irrId:irr1.id};
      state.diesInspections=[i1];
      i1.protocol=nextProtocol('INS','diesInspections');dHist(i1,'Inspeção agendada.');dHist(i1,'Inspeção iniciada.');dHist(i1,'Inspeção concluída: Regular com pendências. 1 irregularidade registrada.');
      const i2=insp({protocol:'',type:'Inspeção documental',plannedDate:dAdd(today,12),objective:'Conferir documentos de matrícula e transferência.',description:'',status:'Agendada'});state.diesInspections.push(i2);i2.protocol=nextProtocol('INS','diesInspections');dHist(i2,'Inspeção agendada.');
      const i3=insp({protocol:'',type:'Inspeção de acompanhamento de irregularidades',plannedDate:dAdd(today,-2),objective:'Verificar a correção das atas escolares.',description:'',status:'Agendada'});state.diesInspections.push(i3);i3.protocol=nextProtocol('INS','diesInspections');dHist(i3,'Inspeção agendada.');
      state.diesIrregularities=[irr1];irr1.protocol=nextProtocol('IRR','diesIrregularities');
      dHist(irr1,`Registrada a partir da inspeção ${i1.protocol}.`);dHist(irr1,'Aberta → Notificada. Escola notificada (notificação interna do SIGED).');dHist(irr1,'Notificada → Aguardando correção. Escola em prazo de correção.');
      const irr2={id:crypto.randomUUID(),protocol:'',schoolId:sch.id,inspectionId:null,category:'Funcionamento acadêmico',description:'Calendário escolar sem a previsão de dias letivos de reposição.',identifiedDate:dAdd(today,-70),createdBy:'Carlos Henrique Dantas',evidence:[],evidenceNotes:'',measure:'Atualizar o calendário escolar.',deadline:dAdd(today,-50),owner:'Carlos Henrique Dantas',status:'Resolvida',schoolResponse:'Calendário atualizado e republicado.',responseAt:dAdd(today,-55)+'T12:00:00.000Z',opinion:'Calendário conferido e regular.',resolvedDate:dAdd(today,-55),history:[]};
      state.diesIrregularities.push(irr2);irr2.protocol=nextProtocol('IRR','diesIrregularities');dHist(irr2,'Irregularidade registrada.');dHist(irr2,'Em análise → Resolvida. Parecer: Calendário conferido e regular.');
      const doc=(over)=>({id:crypto.randomUUID(),schoolId:sch.id,number:'',issueDate:'',validityDate:'',notes:'',attachments:[],createdBy:'Carlos Henrique Dantas',createdAt:new Date().toISOString(),history:[],...over});
      state.diesDocuments=[
        doc({category:'Ato autorizativo',title:'Portaria de autorização de funcionamento',number:'Portaria 123/2021',issueDate:dAdd(today,-1200),validityDate:dAdd(today,25),status:'Conferido',checkedBy:'Carlos Henrique Dantas',checkedAt:new Date().toISOString()}),
        doc({category:'Documento institucional',title:'Regimento escolar',number:'',issueDate:dAdd(today,-700),validityDate:'',status:'Conferido',checkedBy:'Carlos Henrique Dantas',checkedAt:new Date().toISOString()}),
        doc({category:'Declaração',title:'Declaração de regularidade fiscal',number:'DRF-88',issueDate:dAdd(today,-400),validityDate:dAdd(today,-10),status:'Recebido'}),
        doc({category:'Ata de resultado final',title:'Atas de resultado final do ano anterior',status:'Pendente de envio'})
      ];
      state.diesDocuments.forEach(d=>dHist(d,`Documento registrado (${d.status}).`));
      const c1={id:crypto.randomUUID(),protocol:'',receivedDate:dAdd(today,-6),schoolId:sch.id,category:'Documentação escolar',channel:'Ouvidoria (exemplo)',description:'Denúncia de exemplo: suposta demora na entrega de históricos escolares.',evidence:[],responsible:'Carlos Henrique Dantas',inspectionIds:[i2.id],actions:[{at:new Date().toISOString(),user:'Carlos Henrique Dantas',text:'Solicitada a relação de históricos pendentes à escola.'}],opinion:'',forward:'',status:'Em apuração',createdBy:'Carlos Henrique Dantas',history:[]};
      state.diesComplaints=[c1];c1.protocol=nextProtocol('DEN','diesComplaints');dHist(c1,'Denúncia registrada.');dHist(c1,'Apuração iniciada. Responsável: Carlos Henrique Dantas.');
    }
    state.examplesV1=true;
    return true;
  }
  // Atalhos de acessibilidade do modal: Esc fecha e clicar fora do quadro também
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.getElementById('modal').classList.contains('hidden'))closeModal();});
  document.getElementById('modal')?.addEventListener('click',e=>{if(e.target.id==='modal')closeModal();});
  // ===== Exemplos da rede (2ª rodada): outras escolas só com cadastro, para demonstrar comparativos e alertas =====
  function fillNetworkExamples(){
    if(state.examplesV2) return false;
    const base=state.schools[0];if(!base){return false;}
    if(state.schools.length<2){
      const mk=(over)=>({id:crypto.randomUUID(),createdAt:new Date().toISOString(),state:'CE',zone:'Urbana',adminCategory:'Não se aplica (rede pública)',operatingStatus:'Em atividade',shifts:['Manhã','Tarde'],networkStatus:'Ativa',statusHistory:[{at:new Date().toISOString(),user:'Exemplo',from:'—',to:'Ativa',reason:'Cadastro da escola na rede'}],...over});
      const mid=(state.matrizes[0]||{}).id||'';
      state.schools.push(mk({name:'Escola Municipal Rio Claro',fantasyName:'Rio Claro',dependency:'Municipal',city:'Fortaleza',address:'Rua das Palmeiras',number:'120',neighborhood:'Centro',stagesOffered:['Ensino Fundamental — anos iniciais'],matrizId:mid,unitType:'Unidade / anexo'}));
      state.schools.push(mk({name:'Colégio Estadual Vale Verde',fantasyName:'Vale Verde',dependency:'Estadual',city:'Caucaia',address:'Av. Central',number:'800',neighborhood:'Jurema',phone:'(85) 3333-0000',email:'contato@valeverde.exemplo.br',inep:'23000001',managerName:'Helena Prado',managerEmail:'direcao@valeverde.exemplo.br',stagesOffered:['Ensino Médio'],matrizId:mid,unitType:'Sede',networkStatus:'Suspensa',statusHistory:[{at:new Date().toISOString(),user:'Exemplo',from:'Ativa',to:'Suspensa',reason:'Reforma estrutural do prédio (exemplo)'}]}));
    }
    state.examplesV2=true;return true;
  }
  // Migra dados já salvos: une as secretarias e garante os ambientes DIES e Departamento de Educação
  (function ensureEnvironments(){
    let ch=false;const P=state.permissions=state.permissions||{};
    (state.mockUsers||[]).forEach(u=>{if(u.role==='secretaria_gestao'||u.role==='secretaria_atendimento'){u.role='secretaria';ch=true;}});
    if(state.role==='secretaria_gestao'||state.role==='secretaria_atendimento'){state.role='secretaria';ch=true;}
    if(P.secretaria_gestao||P.secretaria_atendimento){
      const a=P.secretaria_gestao||{},b=P.secretaria_atendimento||{};
      P.secretaria=Object.fromEntries(PERMISSION_MODULES.map(m=>[m,Object.fromEntries(['view','create','edit','delete','approve','export'].map(k=>[k,!!((a[m]||{})[k]||(b[m]||{})[k])]))]));
      delete P.secretaria_gestao;delete P.secretaria_atendimento;ch=true;
    }
    // Mantém uma só conta de secretaria e uma só de professor nos logins de demonstração
    const dup=['atendimento@horizonteazul.edu.br','rafael.andrade@horizonteazul.edu.br'];
    const before=(state.mockUsers||[]).length;
    const keep={secretaria:(state.mockUsers||[]).find(u=>u.email==='secretaria@horizonteazul.edu.br'),professor:(state.mockUsers||[]).find(u=>u.email==='marina.souza@horizonteazul.edu.br')};
    state.mockUsers=(state.mockUsers||[]).filter(u=>{
      if(!dup.includes(u.email))return true;
      if(state.currentUserId===u.id&&keep[u.role]){state.currentUserId=keep[u.role].id;state.user=keep[u.role].name;}
      return false;
    });
    if(state.mockUsers.length!==before) ch=true;
    const seeded=seedDefaultPermissions();
    ['secretaria','dies','educacao'].forEach(r=>{if(!P[r]){P[r]=seeded[r];ch=true;}});
    Object.keys(P).forEach(r=>['dies','educacao'].forEach(m=>{if(!P[r][m]){P[r][m]=r==='direcao'?{...FULL_ACCESS}:{...NO_ACCESS};ch=true;}}));
    if(!P.educacao.estrutura||!P.educacao.estrutura.create){P.educacao.estrutura={...FULL_ACCESS,delete:false};ch=true;}
    const add=(role,name,email,pass,label,mat)=>{if(state.schools.length&&!(state.mockUsers||[]).some(u=>u.role===role)){state.mockUsers.push({id:crypto.randomUUID(),name,role,email,password:pass,schoolId:state.schools[0].id,status:'Ativo',vinculo:null,vinculoLabel:label,matricula:mat});ch=true;}};
    add('dies','Carlos Henrique Dantas','inspetor@dies.edu.br','dies123','Inspetor Escolar','DIES-0001');
    add('educacao','Marcos Antônio Silveira','operador@educacao.edu.br','educacao123','Operador de Educação','EDU-0001');
    if(fillExampleData()) ch=true;
    if(fillNetworkExamples()) ch=true;
    if(ch) save();
  })();
  renderAccountCards();

});
