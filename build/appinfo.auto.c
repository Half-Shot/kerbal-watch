#include "pebble_app_info.h"
#include "src/resource_ids.auto.h"

const PebbleAppInfo __pbl_app_info __attribute__ ((section (".pbl_header"))) = {
  .header = "PBLAPP",
  .struct_version = { APP_INFO_CURRENT_STRUCT_VERSION_MAJOR, APP_INFO_CURRENT_STRUCT_VERSION_MINOR },
  .sdk_version = { APP_INFO_CURRENT_SDK_VERSION_MAJOR, APP_INFO_CURRENT_SDK_VERSION_MINOR },
  .app_version = { 1, 0 },
  .load_size = 0xb6b6,
  .offset = 0xb6b6b6b6,
  .crc = 0xb6b6b6b6,
  .name = "KerbalWatch",
  .company = "TronLaser",
  .icon_resource_id = RESOURCE_ID_MENULOGO,
  .sym_table_addr = 0xA7A7A7A7,
  .flags = 0,
  .num_reloc_entries = 0xdeadcafe,
  .uuid = { 0x32, 0x48, 0x7E, 0xA5, 0x1B, 0xE2, 0x44, 0x12, 0xA3, 0xFE, 0x96, 0xB4, 0xBD, 0xA1, 0xE2, 0x7A },
  .virtual_size = 0xb6b6
};
