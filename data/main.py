import json, csv

## UTILITY FUNCTIONS
#======================================

#### IMPORT CSV FILE ####
def import_csv(path, opt):
	d = []
	i=0
	with open(path + '.csv', opt) as csvFile:
		temp = csv.reader(csvFile, delimiter=',')
		for row in temp:
			d.insert(i, row)
			i += 1
	return d;

### OUTPUT JSON ###
def output_json(path, data):
	with open(path + '.json', "w") as file:
		json.dump(data, file)


## THE MAIN FUNCTION
#======================================

def main():
	path = 'data'
	data = import_csv(path, 'rU')
	output_json(path, data)


if __name__ == '__main__':
	main();