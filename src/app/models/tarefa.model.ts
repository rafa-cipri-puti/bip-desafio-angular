export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  status: 'pendente' | 'em andamento' | 'concluída';
  prioridade: 'baixa' | 'media' | 'alta';
  projetoId: number;
}