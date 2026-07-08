export interface TribeData {
  name: string;
  points: number;
}

export interface MemberData {
  name: string;
  age?: number;
  phone?: string;
  isLeader?: boolean;
}

// Mapeamento exato dos nomes que vêm da planilha para as chaves internas
export type TribeKey = 'Benjarion' | 'Levior' | 'Judarion' | 'Danvar';

export const fetchTribeScores = async (): Promise<TribeData[]> => {
  const spreadsheetId = '1D1z8ZSlS-d5-rXouMAVGLW3DpgA9sOBYpbbhryxuMn8';
  // O link exporta a planilha principal como CSV
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const text = await response.text();

    // Divide por linhas, limpa espaços vazios e quebras de linha carriage return
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (lines.length < 2) {
      throw new Error('Planilha com dados insuficientes ou vazia.');
    }

    // A primeira linha contém os nomes das tribos: Benjarion,Levior,Judarion,Danvar
    const headers = lines[0].split(',').map(h => h.replace(/[\r"]/g, '').trim());
    // A segunda linha contém os pontos: 50,20,15,35
    const values = lines[1].split(',').map(v => v.replace(/[\r"]/g, '').trim());

    const data: TribeData[] = headers.map((header, index) => {
      const pointsRaw = values[index];
      const points = parseInt(pointsRaw, 10);
      return {
        name: header,
        points: isNaN(points) ? 0 : points,
      };
    });

    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do Google Sheets:', error);
    throw error;
  }
};

// Converte valores comuns de "sim/verdadeiro" vindos da planilha em boolean
const parseBoolean = (raw?: string): boolean => {
  if (!raw) return false;
  const normalized = raw.trim().toLowerCase();
  return ['true', 'sim', 'yes', '1', 'x', 'líder', 'lider'].includes(normalized);
};

// Busca a lista de membros por tribo da planilha de membros
export const fetchTribeMembers = async (): Promise<Record<string, MemberData[]>> => {
  const spreadsheetId = '1pCcvw8tQj84CxnUYvV-g7lZLx5sPdYREmJPuGq5KTY0';
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const text = await response.text();
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (lines.length < 2) return {};

    // Pula o cabeçalho (Tribo,Nome,Idade,Número,Líder)
    const result: Record<string, MemberData[]> = {};

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.replace(/[\r"]/g, '').trim());
      const tribe = cols[0]?.toLowerCase();
      const memberName = cols[1];
      const age = cols[2] ? parseInt(cols[2], 10) : undefined;
      const phone = cols[3] ? cols[3] : undefined;
      const isLeader = parseBoolean(cols[4]);

      if (!tribe || !memberName) continue;

      if (!result[tribe]) result[tribe] = [];
      result[tribe].push({
        name: memberName,
        age: isNaN(age as number) ? undefined : age,
        phone,
        isLeader,
      });
    }

    return result;
  } catch (error) {
    console.error('Erro ao buscar membros do Google Sheets:', error);
    return {};
  }
};

// Mock de dados caso a rede falhe ou durante o carregamento inicial offline
export const mockTribeScores: TribeData[] = [
  { name: 'Benjarion', points: 50 },
  { name: 'Levior', points: 20 },
  { name: 'Judarion', points: 15 },
  { name: 'Danvar', points: 35 },
];
