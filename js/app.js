function getCurrentUrl() {
  const url = location.href.split('?').shift()

  if (url.match(/\/$/)) {
    return url.replace(/\/$/, '')
  }

  if (url.match(/index\.html$/)) {
    return url.replace(/index\.html$/, '')
  }

  return url
}

const el = new Vue({
  el: '#app',
  data: {
    baseApiUrl: getCurrentUrl() + '/api',
    provinces: [],
    regencies: [],
    districts: [],
    villages: [],
    tpss: [],
    fetchingProvinces: false,
    fetchingRegencies: false,
    fetchingDistricts: false,
    fetchingVillages: false,
    fetchingTpss: false,
    provinceId: '',
    regencyId: '',
    districtId: '',
    villageId: '',
    tpsId: '',
    completed: false,
  },
  watch: {
    provinceId() {
      this.regencyId = ''
      this.districtId = ''
      this.villageId = ''
      this.fetchRegencies()
    },
    regencyId() {
      this.districtId = ''
      this.villageId = ''
      this.fetchDistricts()
    },
    districtId() {
      this.villageId = ''
      this.fetchVillages()
    },
    villageId() {
      this.tpsId = ''
      this.fetchTpss()
    },
    tpsId() {
      this.completed = true
    }
  },
  computed: {
    urlApiProvinces() {
      return `${this.baseApiUrl}/provinces.json`
    },
    urlApiRegencies() {
      return `${this.baseApiUrl}/regencies/${this.provinceId}.json`
    },
    urlApiDistricts() {
      return `${this.baseApiUrl}/districts/${this.regencyId}.json`
    },
    urlApiVillages() {
      return `${this.baseApiUrl}/villages/${this.districtId}.json`
    },
    urlApiTpss() {
      return `${this.baseApiUrl}/tpss/${this.villageId}.json`
    },
    fetchProvincesCode() {
      return [
        `fetch(\`<a href="${this.urlApiProvinces}" target="_blank">${this.urlApiProvinces}</a>\`)`,
        '.then(response => response.json())',
        '.then(provinces => console.log(provinces));'
      ].join('\n')
    },
    fetchRegenciesCode() {
      return !this.provinceId ? '' : [
        `<small class="text-fade-50">// ID Provinsi ${this.selectedProvince.name} = ${this.provinceId}</small>`,
        `fetch(\`<a href="${this.urlApiRegencies}" target="_blank">${this.urlApiRegencies}</a>\`)`,
        '.then(response => response.json())',
        '.then(regencies => console.log(regencies));'
      ].join('\n')
    },
    fetchDistrictsCode() {
      return !this.regencyId ? '' : [
        `<small class="text-fade-50">// ID ${this.selectedRegency.name} = ${this.regencyId}</small>`,
        `fetch(\`<a href="${this.urlApiDistricts}" target="_blank">${this.urlApiDistricts}</a>\`)`,
        '.then(response => response.json())',
        '.then(districts => console.log(districts));'
      ].join('\n')
    },
    fetchVillagesCode() {
      return !this.districtId ? '' : [
        `<small class="text-fade-50">// ID Kecamatan ${this.selectedDistrict.name} = ${this.districtId}</small>`,
        `fetch(\`<a href="${this.urlApiVillages}" target="_blank">${this.urlApiVillages}</a>\`)`,
        '.then(response => response.json())',
        '.then(villages => console.log(villages));'
      ].join('\n')
    },
    fetchTpssCode() {
      return !this.villageId ? '' : [
        `<small class="text-fade-50">// ID Desa ${this.selectedVillage.name} = ${this.villageId}</small>`,
        `fetch(\`<a href="${this.urlApiTpss}" target="_blank">${this.urlApiTpss}</a>\`)`,
        '.then(response => response.json())',
        '.then(tpss => console.log(tpss));'
      ].join('\n')
    },
    selectedProvince() {
      return this.provinces.find(item => item.id == this.provinceId)
    },
    selectedRegency() {
      return this.regencies.find(item => item.id == this.regencyId)
    },
    selectedDistrict() {
      return this.districts.find(item => item.id == this.districtId)
    },
    selectedVillage() {
      return this.villages.find(item => item.id == this.villageId)
    },
    selectedTps() {
      return this.tpss.find(item => item.id == this.tpsId)
    },
    responseProvinces() {
      return JSON.stringify(this.provinces, null, 2)
    },
    responseRegencies() {
      return JSON.stringify(this.regencies, null, 2)
    },
    responseDistricts() {
      return JSON.stringify(this.districts, null, 2)
    },
    responseVillages() {
      return JSON.stringify(this.villages, null, 2)
    },
    responseTpss() {
      return JSON.stringify(this.tpss, null, 2)
    },
  },
  created() {
    this.fetchProvinces()
  },
  mounted() {
    [...document.querySelectorAll('.unhide-on-mounted')].forEach(el => {
      el.classList.remove('d-none')
    })
  },
  methods: {
    async fetchProvinces() {
      this.fetchingProvinces = true
      const result = await fetch(`api/provinces.json`)
      this.fetchingProvinces = false
      this.provinces = await result.json()
    },
    async fetchRegencies() {
      if (!this.provinceId) {
        this.regencies = []
        return
      }
      this.fetchingRegencies = true
      const result = await fetch(`api/regencies/${this.provinceId}.json`)
      this.fetchingRegencies = false
      this.regencies = await result.json()
    },
    async fetchDistricts() {
      if (!this.regencyId) {
        this.districts = []
        return
      }

      this.fetchingDistricts = true
      const result = await fetch(`api/districts/${this.regencyId}.json`)
      this.fetchingDistricts = false
      this.districts = await result.json()
    },
    async fetchVillages() {
      if (!this.districtId) {
        this.villages = []
        return
      }

      this.fetchingVillages = true
      const result = await fetch(`api/villages/${this.districtId}.json`)
      this.fetchingVillages = false
      this.villages = await result.json()
    },
    async fetchTpss() {
      if (!this.villageId) {
        this.tpss = []
        return
      }

      this.fetchingTpss = true
      const result = await fetch(`api/tpss/${this.villageId}.json`)
      this.fetchingTpss = false
      this.tpss = await result.json()
    }
  }
})
