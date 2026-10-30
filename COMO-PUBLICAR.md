# Como publicar no site da LCNI

Guia para quem é do Marketing (ou de qualquer GT) e precisa publicar um post ou evento. Não precisa saber programar.

## Antes da primeira vez

1. Tenha uma conta no GitHub e peça a quem administra o repositório para te adicionar como colaborador(a) (Settings → Collaborators).
2. Crie um **token de acesso** no GitHub: foto do perfil → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
   - Repository access: só o repositório `ligadecomerciopucrio.github.io`.
   - Permissions: **Contents: Read and write**.
   - Guarde o token num lugar seguro. Ele funciona como uma senha: não mande no grupo.

## Publicar um post

1. Abra o painel: **`<endereço do site>/admin/`**
2. Clique em **Sign In with Token** e cole o seu token.
3. No menu da esquerda, escolha a categoria: **Artigos**, **Análise de Conjuntura**, **Business Case** ou **Em Alta**.
4. Clique em **Novo** e preencha:
   - **Título**
   - **Data de publicação**
   - **Autores**: um nome por item.
   - **Breve descrição**: duas ou três frases. É o que aparece no card.
   - **Imagem de capa** e **Descrição da imagem**: diga o que aparece na foto (ex.: "Navio cargueiro no porto de Santos"). Isso ajuda quem usa leitor de tela.
   - **Texto**: cole o texto. Os botões da barra fazem negrito, subtítulo, link e imagem.
5. Clique em **Salvar** (ou Publicar). Em 1 ou 2 minutos o post aparece no site, já na seção certa.

Para **corrigir** um post, abra-o no painel, edite e salve de novo. Para **apagar**, use o botão Excluir dentro do post.

## Publicar um evento

Mesmo caminho, nas opções **Eventos: Visitas Guiadas**, **Eventos: Palestras** ou **Eventos: Semana**. Marque **Mostrar nos Destaques** se a visita deve aparecer na página inicial.

- **Visitas guiadas** aparecem com a foto à esquerda e a descrição à direita. Fotos na horizontal funcionam melhor.
- **Palestras** aparecem num carrossel que passa para o lado, da mais recente para a mais antiga. Não há limite: as novas entram no começo e as antigas ficam mais para o lado.

## Atualizar diretoria, depoimentos e contatos

No painel, em **Institucional**:

- **Diretoria**: troque a gestão (ex.: 2027.1), os nomes, cargos e fotos. Use fotos quadradas, se possível.
- **Depoimentos**: nome, identificação, texto, foto (de preferência na vertical) e link do LinkedIn. Aparecem dois por vez; os novos entram no carrossel sozinhos.
- **Membros**: a gestão e, para cada GT, nome, curso (opcional) e foto de cada membro. Aparecem na página Membros, aberta pelo botão embaixo da Diretoria.
- **Atividades das áreas**: nome, descrição, foto e link de cada atividade que aparece nos slides de Nossas Áreas.
- **Foto da Semana de Comércio e Negócios Internacionais**: a foto que aparece nos Destaques e na página Eventos.
- **Contatos e configurações**: e-mail, Instagram, LinkedIn e logo.

## Dicas

- **Imagens:** prefira JPG com até 1200 px de largura. Fotos de celular muito grandes deixam o site lento. Dá para reduzir em squoosh.app antes de enviar.
- **Copiou do Word ou do Google Docs?** Confira se os subtítulos e as listas vieram certos na pré-visualização do painel.
- **Algo deu errado?** Nada se perde: o GitHub guarda o histórico de todas as versões. Chame a pessoa responsável pelo site.

## Sem o painel (opção avançada)

1. No GitHub, abra a pasta da categoria em `src/conteudos/`.
2. Abra `src/conteudos/_modelo-post.md`, copie o conteúdo.
3. Na pasta da categoria, clique em **Add file → Create new file**, dê o nome `ano-mes-dia-titulo-curto.md` (sem acentos nem espaços), cole e preencha.
4. Imagens vão em `src/imagens/posts/` (Add file → Upload files).
5. Clique em **Commit changes**.
