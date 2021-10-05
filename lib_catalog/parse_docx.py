import docx
import json

doc = docx.Document('bbk new.docx')
bbk_dict = []
pars = doc.paragraphs[3:]
for i in range(len(pars)):
    res = pars[i].text.split('\t')
    bbk = {}
    bbk['model'] = 'catalog.bbk'
    bbk['fields'] = {}
    bbk['fields']['id'] = i+1
    bbk['fields']['code'] = res[0]
    bbk['fields']['description'] = res[-1]
    bbk_dict.append(bbk)
res_json = json.dumps(bbk_dict, ensure_ascii=False).encode('utf8')
json_file = open('catalog/fixtures/bbk_data.json', 'wb')
n = json_file.write(res_json)
json_file.close()


