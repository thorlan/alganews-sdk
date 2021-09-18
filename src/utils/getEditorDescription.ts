import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function getEditorDescription(editorCreationData: Date){
    const distance = formatDistance(editorCreationData, new Date(), {locale: ptBR});
    return `Editor há ${distance}`;
}

export default getEditorDescription;