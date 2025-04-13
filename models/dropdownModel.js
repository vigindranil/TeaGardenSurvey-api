import pool from "../db.js";

export async function getDistrictsByStateModel(state_id) {
  try {
    const [rows] = await pool.query("CALL sp_getDistrictsByState(?);",[state_id]);
    
    console.log("SP Result:", rows);

    // If it's a nested result (typical with CALL), return first result set
    return rows?.[0] || [];
  } catch (e) {
    console.error("Error fetching districts:", e.message);
    return [];
  }
}


export async function getSubDivisionsByDistrictModel(dist_id) {
  try {
    const [rows] = await pool.query("CALL sp_getSubDivisionsByDistrict(?);", [dist_id]);
    
    console.log("SP Result:", rows);

    return rows?.[0] || [];
  } catch (e) {
    console.error("Error fetching subdivisions:", e.message);
    return [];
  }
}


export async function getBlocksBySubDivisionModel(sub_div_id) {
  try {
    const [rows] = await pool.query("CALL sp_getBlocksBySubDivision(?);", [sub_div_id]);

    console.log("SP Result:", rows);

    return rows?.[0] || [];
  } catch (e) {
    console.error("Error fetching blocks:", e.message);
    return [];
  }
}


export async function getGPsByBlockModel(blk_id) {
  try {
    const [rows] = await pool.query("CALL sp_getGPsByBlock(?);", [blk_id]);

    console.log("SP Result:", rows);

    return rows?.[0] || [];
  } catch (e) {
    console.error("Error fetching GPs:", e.message);
    return [];
  }
}


export async function getTotalHouseholdsSurveyedDetailsModel(
  state_id,
  district_id,
  subdivision_id,
  block_id,
  village_id,
  start_date,
  end_date
) {
  try {
    const [rows] = await pool.query(
      "CALL sp_getTotalHouseholdsSurveyedDetails(?, ?, ?, ?, ?, ?, ?);",
      [
        state_id,
        district_id,
        subdivision_id,
        block_id,
        village_id,
        start_date,
        end_date,
      ]
    );

    return rows?.[0] || []; // Return first result set, or empty array
  } catch (error) {
    console.error("getTotalHouseholdsSurveyedDetailsModel error:", error.message);
    throw error;
  }
}


export async function getHealthDetailsWithFiltersModel(
  state_id,
  district_id,
  subdivision_id,
  block_id,
  village_id,
  start_date,
  end_date,
  nutrition_status,
  bp_status,
  blood_sugar,
  gender,
  household_id,
  age_group
) {
  try {
    const [rows] = await pool.query(
      "CALL sp_getHealthDetailsWithFiltersAndAgeGroup(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [
        state_id,
        district_id,
        subdivision_id,
        block_id,
        village_id,
        start_date,
        end_date,
        nutrition_status,
        bp_status,
        blood_sugar,
        gender,
        household_id,
        age_group,
      ]
    );

    return rows?.[0] || []; // First result set
  } catch (error) {
    console.error("getHealthDetailsWithFiltersModel error:", error.message);
    throw error;
  }
}
