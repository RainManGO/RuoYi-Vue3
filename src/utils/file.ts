export const downloadfile = (data: any) => {
  const blob = new Blob([data], { type: 'application/vnd.ms-excel' })
  const filename = 'user.xlsx'
  const elink = document.createElement('a')
  elink.style.display = 'none'
  elink.href = URL.createObjectURL(blob)
  elink.download = filename
  document.body.appendChild(elink)
  elink.click()
  document.body.removeChild(elink)
}
