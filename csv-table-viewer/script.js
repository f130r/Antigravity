document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('csv-file');
    const dropZone = document.getElementById('drop-zone');
    const tableContainer = document.getElementById('table-container');

    // Handle Drag and Drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--primary)';
        dropZone.style.background = 'rgba(255, 255, 255, 0.08)';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = 'var(--glass-border)';
        dropZone.style.background = 'var(--glass-bg)';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--glass-border)';
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith('.csv')) {
            processFile(file);
        } else {
            alert('CSVファイルを選択してください。');
        }
    });

    // Handle File Input
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    });

    function processFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const data = parseCSV(text);
            generateTable(data);
        };
        reader.readAsText(file);
    }

    function parseCSV(text) {
        const lines = text.trim().split('\n');
        return lines.map(line => {
            // Very basic CSV parsing (comma distribution)
            // Note: Does not handle commas inside quoted strings for this simple version
            return line.split(',').map(cell => cell.trim());
        });
    }

    function generateTable(data) {
        if (data.length === 0) return;

        let html = '<table>';
        
        // Header
        html += '<thead><tr>';
        data[0].forEach(header => {
            html += `<th>${header}</th>`;
        });
        html += '</tr></thead>';

        // Body
        html += '<tbody>';
        for (let i = 1; i < data.length; i++) {
            html += '<tr>';
            data[i].forEach(cell => {
                html += `<td>${cell}</td>`;
            });
            html += '</tr>';
        }
        html += '</tbody></table>';

        tableContainer.innerHTML = html;
        tableContainer.classList.add('active');
    }
});
