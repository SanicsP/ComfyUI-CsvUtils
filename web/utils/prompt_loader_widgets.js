
export function create_csv_info_widget(file_info) {
    
    return `
        <span class="csv-u-info-span">row count : ${file_info.count} </span>
    `
}