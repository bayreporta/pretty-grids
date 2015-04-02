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

## PROCESS DATA FUNCTIONS
#======================================
def process_data(d, c):
	o = []

	### SET UP DATA STRUCTURE ###
	for i in range(0, c[0]):
		o.insert(i, [])
		for ii in range(0, c[1]):
			o[i].insert(ii, [])
			for iii in range(0, c[2]):
				o[i][ii].insert(iii, [])

	### FILL IN DATA
	for i in range(1,len(d)):
		for ii in range(0, c[0]):
			if int(d[i][1]) == ii:
				for iii in range(0, c[1]):
					if int(d[i][3]) == iii:
						for iv in range(0, c[2]):
							if int(d[i][2]) == iv:
								o[ii][iii][iv].insert(0, d[i][0])
								o[ii][iii][iv].insert(1, d[i][4])
								o[ii][iii][iv].insert(2, d[i][5])
	return o



## THE MAIN FUNCTION
#======================================

def main():
	calibrate = [2,16,6]
	path = 'data'

	data = import_csv(path, 'rU')
	output = process_data(data, calibrate)

	output_json(path, output)


if __name__ == '__main__':
	main();