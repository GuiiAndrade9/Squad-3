# SIGED — Sistema Escolar (protótipo front-end)

Este projeto é **exclusivamente front-end**: HTML + CSS + JavaScript puro, sem build step, sem backend, sem API real e sem banco de dados. Toda a "persistência" é feita com `localStorage` do navegador. Abra `index.html` diretamente no navegador para usar.

> A pasta `apps/api` (NestJS/Prisma) e `database/schema.sql` são um esboço de uma eventual evolução para backend real, feito em uma etapa anterior do projeto. **Eles não são usados pela aplicação atual** e não precisam existir para o SIGED funcionar — o app inteiro roda a partir de `index.html`, `style.css` e `script.js`.

## Como entrar

Não existe cadastro livre de usuário: o login é **simulado com contas de demonstração**. Na tela inicial, clique em uma das contas listadas (isso preenche e-mail/senha automaticamente) e clique em "Entrar". As contas de demonstração, todas da escola fictícia **Colégio Horizonte Azul** (Aracaju/SE):

| Perfil | Nome | E-mail | Senha |
|---|---|---|---|
| Direção | Marcos Vieira Teixeira | diretor@horizonteazul.edu.br | direcao123 |
| Secretaria Escolar (perfil único) | Patrícia Gomes Almeida | secretaria@horizonteazul.edu.br | secretaria123 |
| Secretaria Escolar (perfil único) | Roberta Cavalcante | atendimento@horizonteazul.edu.br | atendimento123 |
| Recursos Humanos | Simone Albuquerque | rh@horizonteazul.edu.br | rh123 |
| DIES — Inspeção Escolar | Carlos Henrique Dantas | inspetor@dies.edu.br | dies123 |
| Departamento de Educação (Operador) | Marcos Antônio Silveira | operador@educacao.edu.br | educacao123 |
| Portal do Professor | Marina Souza Lima | marina.souza@horizonteazul.edu.br | professor123 |
| Portal do Professor (2ª conta) | Rafael Andrade Costa | rafael.andrade@horizonteazul.edu.br | professor123 |
| Portal do Aluno | (1º aluno da turma 5º A) | aluno.ana.almeida@aluno.horizonteazul.edu.br | aluno123 |
| Portal do Responsável | (mãe de 2 alunos) | maria.almeida@email.com | responsavel123 |

Cada conta é uma pessoa real dentro dos dados de exemplo: o professor só vê as turmas/disciplinas atribuídas a ele (tela "Distribuição de professores"), o aluno só vê o próprio boletim, e o responsável pode alternar entre os filhos vinculados a ele.

Em Configurações → **Restaurar dados de demonstração** você apaga tudo e recarrega esse cenário original a qualquer momento.

## O que está implementado de verdade (não é só tela bonita)

**Login e permissões**
- Contas mockadas com e-mail/senha validados contra `state.mockUsers`; mensagens de erro inline (não `alert()`).
- Matriz de permissões (Direção → Permissões por Perfil) com 6 ações (visualizar/criar/editar/excluir/aprovar/exportar) por módulo e por perfil, **de fato aplicada**: itens de menu somem quando o perfil não tem "visualizar", botões de criar/editar/aprovar são ocultados quando não permitido, e tentativas de ação são bloqueadas com toast explicativo (`can()`/`denyToast()` em `script.js`).

**Vida acadêmica integrada (o núcleo do pedido)**
- **Alunos**: cadastro completo (identificação, endereço, contatos, vida escolar, responsáveis vinculados, dados educacionais/AEE restritos por permissão), com validação de CPF/e-mail/telefone, checagem de duplicidade, controle de vagas da turma e histórico de alterações.
- **Responsáveis**: cadastro próprio, um responsável pode ter vários filhos; o Portal do Responsável mostra os filhos vinculados com um seletor que atualiza boletim, frequência e dashboard.
- **Professores + Distribuição**: cadastro funcional completo e uma tela dedicada de atribuição professor↔disciplina↔turma, com bloqueio de disciplina duplicada na mesma turma e checagem simples de carga horária/conflito de turno.
- **Diário de classe**: tela real (não CRUD genérico) — o professor escolhe turma/disciplina/data, faz a chamada (Presente/Falta/Falta Justificada) e registra conteúdo/metodologia/observações.
- **Frequência**: calculada automaticamente a partir dos diários lançados, com alerta abaixo de 75%, filtros e exportação CSV.
- **Notas**: lançamento por turma/disciplina/período (Av.1, Av.2, Trabalho, Recuperação), pesos configuráveis, média e situação (Aprovado/Recuperação/Reprovado) calculadas automaticamente, com confirmação ao sobrescrever nota já lançada.
- **Boletim**: documento visual (não tabela de cadastro) por aluno, com notas dos 4 bimestres, frequência, resultado final, código de validação simulado e impressão.
- **Integração real**: uma nota lançada pelo professor aparece imediatamente no boletim do aluno e do responsável e nos indicadores da Direção — é a mesma fonte de dados (`state.grades`, `state.lessonRecords`) para todos os perfis.

**Matrícula, acompanhamento e gestão**
- Fluxo de matrícula com status (Em análise → Pendente de documentos → Concluída/Negada); ao concluir uma "Matrícula Inicial", o aluno é **criado automaticamente** e vinculado à solicitação.
- "Alunos em Acompanhamento": identifica automaticamente frequência baixa, média baixa ou múltiplas disciplinas em recuperação, com registro de ações realizadas (não é diagnóstico).
- Conselho de classe, distribuição de professores, ano letivo/períodos, ocorrências, comunicados por público — todos com CRUD funcional e com efeito real nos dados.
- Fluxo de contratação Direção→RH→Financeiro→TI (vaga aprovada pela Direção, confirmação financeira e liberação de acesso) preservado da etapa anterior.
- **Financeiro em contexto de escola pública**: substituído o foco em "mensalidade" por Recursos (repasses/PDDE/convênios) e Despesas, além de taxas pontuais — tudo simulado, sem cobrança real.
- **Censo Escolar**: painel com botão "Executar validação" que verifica aluno sem CPF, sem turma, sem responsável, professor sem disciplina atribuída e turma sem horário.
- **Auditoria**: login/logout, criação/edição de aluno, lançamento e alteração de nota (com valor antigo → novo), frequência, matrícula, permissões, censo e mais — tudo em `state.auditLog`.
- **Notificações**: central com contador no sino do topo, geradas automaticamente por falta, nova nota, matrícula e comunicado.
- **Busca global**: ícone de lupa no topo abre busca por aluno, professor, funcionário, turma, responsável e protocolo, respeitando a permissão de cada perfil.
- Estoque separado de Patrimônio; Educação Especial (AEE) e Saúde como módulos próprios com visibilidade restrita por permissão; veículos e motoristas do transporte escolar.

**Qualidade/UX**
- Validações inline (`formError`) em vez de `alert()`; confirmação (`confirmAction`) antes de sobrescrever nota, remover atribuição, restaurar dados de demonstração ou sair do sistema.
- Estados vazios com texto e, quando faz sentido, ação ("+ Cadastrar aluno").
- Paginação (`paginate`/`paginationHtml`) e filtros em listas grandes (alunos, responsáveis, frequência).
- `aria-label`, `sr-only`, foco visível (`:focus-visible`) e navegação por teclado nos formulários novos.
- Tema escuro simples (ícone de lua no topo) e impressão dedicada do boletim.
- Todos os botões do topo (busca, tema, notificações, avatar/sair) estão funcionando — nenhum é decorativo.

## O que ficou mais simples (para você saber onde não exagerar a expectativa)

Dado o tamanho do pedido, algumas áreas ficaram em um nível **funcional, porém mais simples** do que o detalhamento máximo pedido:
- **Conselho Escolar** (colegiado/mandatos/atas) e **PPP/Planejamento Institucional** não foram implementados nesta rodada.
- **Biblioteca** e **Alimentação Escolar** continuam nos módulos básicos já existentes (cadastro simples), sem o detalhamento completo de acervo/ISBN/cardápio por faixa etária/agricultura familiar pedido no documento.
- **Recuperação** não é uma tela própria separada — está integrada ao lançamento de notas (campo "Recuperação" + situação calculada).
- **Paginação e exportação CSV** foram aplicadas nas telas de maior volume (alunos, responsáveis, frequência) como padrão demonstrado (`paginate`/`exportCsv`), não em literalmente toda tabela do sistema.
- **Acessibilidade e responsividade** foram melhoradas (rótulos, foco, `aria-*`, tabelas com rolagem horizontal) mas não passaram por uma auditoria formal com leitor de tela ou teste em todos os breakpoints.
- **Coordenação Pedagógica** não é um 8º ambiente de login separado — suas funções (acompanhamento de alunos em risco, conselho de classe, planejamento de aulas) ficam dentro dos menus de Direção e Secretaria — Gestão Escolar.
- **Financeiro** e **TI** continuam sem perfil de login próprio: a Direção assume essas duas etapas na tela de Funcionários (isso é dito explicitamente na própria tela).

## Testes automatizados feitos durante o desenvolvimento

Como o ambiente não tem um navegador real disponível, a verificação foi feita por simulação em Node (mock de `document`/`localStorage`) cobrindo:
- Login e navegação de **todas as páginas do menu para as 8 contas de demonstração**, sem erros de execução.
- Fluxo completo aluno → matrícula concluída → aluno criado automaticamente e vinculado.
- Lançamento de nota → média e situação calculadas corretamente.
- Lançamento de frequência → contabilizada corretamente por disciplina.
- Bloqueio de permissão (aluno não pode criar em RH, mas pode ver o próprio boletim).
- Vínculo responsável↔filhos e boletim do filho selecionado pelo responsável.
- Validação do Censo Escolar rodando sem exceções.

Ainda assim, recomenda-se um teste manual no navegador antes de qualquer apresentação, já que a simulação em Node não cobre 100% da renderização visual (CSS, responsividade, impressão).

## Arquitetura do front-end
- `index.html`: estrutura da tela de login e do shell do app (topbar, menu lateral, área de conteúdo, modal).
- `style.css`: todo o visual, incluindo os estilos novos de filtros, paginação, boletim/impressão e tema escuro.
- `script.js`: toda a lógica. Principais blocos:
  - Estado e persistência (`defaultData`, `save`, `load`, chave `siged_saas_v6` no `localStorage`).
  - Login, menu e permissões (`roles`, `PERMISSION_MODULES`, `can`, `buildMenu`).
  - CRUD genérico (`crudModules`, `renderCrud`, `openCrudEditor`) para cadastros simples.
  - Vida acadêmica dedicada (`renderStudents`, `renderGuardians`, `renderDiaryBook`, `renderAttendance`, `renderGradebook`, `renderReportCard`, `renderAssignments`) para os módulos que exigem telas próprias.
  - Utilidades (`confirmAction`, `formError`, `notify`, `paginate`, `exportCsv`, `validCpf`/`validEmail`/`validPhone`).
  - `seedDemoData()`: gera toda a escola de exemplo na primeira execução.

## Atualizações desta rodada

- **Anexo de arquivo em Solicitações e em Documentos do Aluno**: ao abrir "Minhas Solicitações" (Portal do Aluno/Responsável) ou "Gestão Documental", agora é possível anexar um arquivo real (PDF ou imagem, até 4 MB) — por exemplo, o PDF de um atestado. O anexo fica salvo como `dataURL` no `localStorage`, aparece como link de download na tabela e pode ser removido ao editar o registro.
- **Tela de login sem nomes de pessoas**: as contas de demonstração agora mostram o cargo genérico (Diretor(a), Secretário(a) Escolar, Atendente da Secretaria, Recursos Humanos, Professor(a), Aluno(a), Responsável) em vez do nome da pessoa. O texto auxiliar (ex.: a disciplina do professor) ajuda a diferenciar contas do mesmo perfil.
- **Novo layout da tela inicial**: mantendo a mesma paleta de cores e todas as funções (login por conta de demonstração, cadastro de escola, mensagens de erro), a tela foi reorganizada em uma barra superior + painel central com destaque de funcionalidades ao lado do formulário, em vez do layout anterior de duas colunas de altura total.
- **Cadastro de escola em tela própria, muito mais completo**: o botão "Adicione sua escola" agora leva a uma tela dedicada (não mais um modal) com 8 seções, no mesmo espírito dos campos usados pelo Censo Escolar/INEP: identificação (CNPJ, INEP, dependência administrativa, categoria, situação), localização (endereço completo, zona urbana/rural), contato, gestão escolar, etapas e turnos ofertados, infraestrutura (salas, laboratórios, acessibilidade, água/energia) e serviços (alimentação, transporte), além da conta de acesso do responsável pelo cadastro. A mesma tela de formulário é reaproveitada em Direção → Dados da Escola → Alterar dados, agora também como página própria em vez de modal.

## Central Inteligente de Acompanhamento (Alunos em Acompanhamento)

A tela **Pedagógico → Alunos em acompanhamento** foi evoluída para uma central com análise automática. Nada fora dessa tela foi alterado (no `script.js` só o bloco "Acompanhamento pedagógico" mudou; no `style.css` só foi acrescentado um bloco com classes `ci-*` no final).

- **Detecção automática**: a cada abertura da tela (ou no botão *Reanalisar*) o sistema analisa notas, médias, frequência, disciplinas abaixo da média e ocorrências e abre o acompanhamento sozinho quando encontra situação de atenção. Os casos ficam em `state.followUps` (localStorage).
- **Índice de atenção (0–100%)**: soma ponderada de Frequência (30), Desempenho (30), Evolução/piora recente (15), Recuperações (15) e Ocorrências (10). As regras e faixas estão explicadas na própria tela ("Como o índice é calculado").
- **Níveis**: 🟢 Normal (0–24) · 🟡 Atenção (25–49) · 🟠 Acompanhamento intensivo (50–69) · 🔴 Atenção imediata (70+), com regras de prioridade para frequência + média abaixo do mínimo. Cada aluno mostra "por que este nível?".
- **Mudanças**: queda de média por disciplina/geral entre os últimos bimestres lançados e queda da frequência recente × anterior.
- **Sugestões**: contato com responsável, reforço, conversa com professor, plano de recuperação, revisão de ocorrência, conselho de classe — o usuário pode **aceitar, editar ou ignorar**; aceitas podem ser marcadas como realizadas (vira registro de ação).
- **Evolução**: foto "antes" (no momento da entrada) × "atual", com detecção de evolução positiva/piora.
- **Encerramento**: o sistema só **sugere** quando a melhora é consistente (média e frequência acima do mínimo, dois últimos bimestres ≥ 6,0, sem alertas nem ocorrências abertas, nível Normal). O encerramento exige confirmação do usuário e pode ser reaberto.
- **Linha do tempo** por aluno: entrada, alertas, mudanças de nível, sugestões, ações, evolução e encerramento.
- **Limitação**: "atividades não entregues" ainda não existem como dado no sistema, então não entram no cálculo.
- **Alunos de exemplo (carga inicial)**: além dos 18 alunos originais, a escola de demonstração traz mais 12 alunos criados para exemplificar cada nível — 3 em 🟢 Normal (já estiveram em acompanhamento e se recuperaram; o sistema sugere revisar/encerrar), 3 em 🟡 Atenção, 3 em 🟠 Acompanhamento intensivo e 3 em 🔴 Atenção imediata (Thaís Gonçalves, Vinícius Henriques, Yara Ibiapina · Davi Jardim, Larissa Lacerda, Enzo Menezes · Helena Almeida, Miguel Barros, Beatriz Costa · Arthur Dantas, Valentina Esteves, Gustavo Farias). Os níveis são calculados a partir das notas, frequência e ocorrências cadastradas, como para qualquer aluno. A chave de armazenamento foi atualizada para `siged_saas_v6`, então o navegador carrega esses exemplos automaticamente na primeira abertura (os dados da versão anterior ficam guardados sob a chave antiga, sem serem apagados).


## Melhorias gerais (revisão do sistema)

- **Data de hoje correta:** a data passou a ser calculada no horário local (antes, 13 pontos usavam UTC e viravam "amanhã" à noite no Brasil). Há um único `todayIso()`.
- **Código morto removido:** 6 funções de calendário que não eram chamadas em nenhum lugar.
- **Segurança de exibição:** textos livres (nomes, títulos, observações) são escapados antes de ir para a tela.
- **Navegação protegida:** cada tela confere a permissão do perfil e, se algo falhar, mostra um aviso com botão para voltar ao painel (em vez de ficar em branco).
- **Janelas (modais):** fecham com Esc ou clicando fora, devolvem o foco e têm atributos de acessibilidade; avisos usam `aria-live`.
- **Usuários e perfis:** agora lista todas as contas, com busca e filtro por perfil, ativar/desativar conta e redefinir senha (com auditoria e proteção da própria conta e da última Direção ativa).
- **Relatórios:** gráficos de alunos, frequência e média por turma e de ocorrências por tipo, com exportação CSV do resumo por turma.
- **Busca global:** resultados com atalho para a tela e inclusão de DIES, matrizes e escolas, respeitando as permissões de cada perfil.


## Operador de Educação (visão da rede)

Perfil `operador@educacao.edu.br` / `educacao123`. Atua sobre **todas as escolas**, sem abrir escola por escola, e só vê dados agregados (escola, série, turma), nunca nomes de alunos.

- **Painel geral:** alunos, turmas, professores, frequência, média e evasão da rede, além do *painel inteligente* com alertas priorizados e o botão “ver dados” que mostra os números por trás de cada alerta.
- **Gestão de escolas e matrizes:** cadastro completo, vínculo com a matriz, tipo de unidade e situação na rede (Ativa, Suspensa, Desativada, sempre com justificativa e histórico). Escolas suspensas/desativadas ficam sem acesso.
- **Usuários e acessos:** criar contas de diretores e secretários, bloquear/liberar, redefinir senha (com gerador de senha temporária), restringir módulos por usuário e vincular funcionários a escolas.
- **Acompanhamento pedagógico:** por escola, série ou turma, com filtro por bimestre. Resultados de aprovação/reprovação são **parciais** até o fim do ano letivo.
- **Calendário escolar:** períodos letivos para toda a rede, cumprimento dos dias letivos e prazos de lançamento de notas e frequência (prazos iniciais são exemplos, ajuste ao calendário oficial).
- **Relatórios:** matrículas e transferências, aprovação/reprovação/abandono, comparativos entre escolas e entre bimestres, pendências e situação cadastral, com exportação em PDF (impressão), Excel (.xls) e CSV.
- **Pendências e notificações:** alertas calculados com limites configuráveis (frequência mínima, média baixa, reprovação, evasão, aumento de faltas, dados incompletos, notas atrasadas, matrículas paradas).
- **Histórico de atividades:** auditoria de toda a rede, com filtros por acessos, usuários, notas/frequência e escolas, e exportação CSV.
