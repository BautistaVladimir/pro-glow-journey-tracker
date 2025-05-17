export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          calories_burned: number | null
          created_at: string
          date: string
          duration: number
          id: string
          intensity: string
          type: string
          user_id: string
        }
        Insert: {
          calories_burned?: number | null
          created_at?: string
          date?: string
          duration: number
          id?: string
          intensity: string
          type: string
          user_id: string
        }
        Update: {
          calories_burned?: number | null
          created_at?: string
          date?: string
          duration?: number
          id?: string
          intensity?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      bmi: {
        Row: {
          bmi_value: number
          category: string
          created_at: string
          date: string
          height: number
          id: string
          user_id: string
          weight: number
        }
        Insert: {
          bmi_value: number
          category: string
          created_at?: string
          date?: string
          height: number
          id?: string
          user_id: string
          weight: number
        }
        Update: {
          bmi_value?: number
          category?: string
          created_at?: string
          date?: string
          height?: number
          id?: string
          user_id?: string
          weight?: number
        }
        Relationships: []
      }
      goals: {
        Row: {
          category: string
          completed: boolean | null
          created_at: string
          currentvalue: number
          deadline: string | null
          description: string | null
          id: string
          startvalue: number
          targetvalue: number
          title: string
          unit: string
          user_id: string
        }
        Insert: {
          category: string
          completed?: boolean | null
          created_at?: string
          currentvalue: number
          deadline?: string | null
          description?: string | null
          id?: string
          startvalue: number
          targetvalue: number
          title: string
          unit: string
          user_id: string
        }
        Update: {
          category?: string
          completed?: boolean | null
          created_at?: string
          currentvalue?: number
          deadline?: string | null
          description?: string | null
          id?: string
          startvalue?: number
          targetvalue?: number
          title?: string
          unit?: string
          user_id?: string
        }
        Relationships: []
      }
      hydration: {
        Row: {
          amount: number
          created_at: string
          date: string
          id: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          date?: string
          id?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          date?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      nutrition: {
        Row: {
          calories: number | null
          carbs: number | null
          category: string
          created_at: string
          date: string
          fats: number | null
          food: string
          id: string
          mealtime: string
          portion: string
          proteins: number | null
          user_id: string
        }
        Insert: {
          calories?: number | null
          carbs?: number | null
          category: string
          created_at?: string
          date?: string
          fats?: number | null
          food: string
          id?: string
          mealtime: string
          portion: string
          proteins?: number | null
          user_id: string
        }
        Update: {
          calories?: number | null
          carbs?: number | null
          category?: string
          created_at?: string
          date?: string
          fats?: number | null
          food?: string
          id?: string
          mealtime?: string
          portion?: string
          proteins?: number | null
          user_id?: string
        }
        Relationships: []
      }
      sleep: {
        Row: {
          created_at: string
          date: string
          hoursslept: number
          id: string
          quality: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          hoursslept: number
          id?: string
          quality?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          hoursslept?: number
          id?: string
          quality?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          age: number | null
          avatar: string | null
          created_at: string
          email: string
          gender: string | null
          height: number | null
          id: string
          name: string | null
          role: string | null
          updated_at: string
          weight: number | null
        }
        Insert: {
          age?: number | null
          avatar?: string | null
          created_at?: string
          email: string
          gender?: string | null
          height?: number | null
          id: string
          name?: string | null
          role?: string | null
          updated_at?: string
          weight?: number | null
        }
        Update: {
          age?: number | null
          avatar?: string | null
          created_at?: string
          email?: string
          gender?: string | null
          height?: number | null
          id?: string
          name?: string | null
          role?: string | null
          updated_at?: string
          weight?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      bmi_history: {
        Row: {
          bmi_value: number | null
          category: string | null
          created_at: string | null
          date: string | null
          height: number | null
          id: string | null
          user_id: string | null
          weight: number | null
        }
        Insert: {
          bmi_value?: number | null
          category?: string | null
          created_at?: string | null
          date?: string | null
          height?: number | null
          id?: string | null
          user_id?: string | null
          weight?: number | null
        }
        Update: {
          bmi_value?: number | null
          category?: string | null
          created_at?: string | null
          date?: string | null
          height?: number | null
          id?: string | null
          user_id?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      daily_hydration_summary: {
        Row: {
          amount: number | null
          date: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          date?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          date?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      nutrition_breakdown: {
        Row: {
          calories: number | null
          carbs: number | null
          category: string | null
          created_at: string | null
          date: string | null
          fats: number | null
          food: string | null
          id: string | null
          mealtime: string | null
          portion: string | null
          proteins: number | null
          user_id: string | null
        }
        Insert: {
          calories?: number | null
          carbs?: number | null
          category?: string | null
          created_at?: string | null
          date?: string | null
          fats?: number | null
          food?: string | null
          id?: string | null
          mealtime?: string | null
          portion?: string | null
          proteins?: number | null
          user_id?: string | null
        }
        Update: {
          calories?: number | null
          carbs?: number | null
          category?: string | null
          created_at?: string | null
          date?: string | null
          fats?: number | null
          food?: string | null
          id?: string | null
          mealtime?: string | null
          portion?: string | null
          proteins?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      sleep_quality_trend: {
        Row: {
          created_at: string | null
          date: string | null
          hoursslept: number | null
          id: string | null
          quality: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          hoursslept?: number | null
          id?: string | null
          quality?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          hoursslept?: number | null
          id?: string | null
          quality?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      weekly_activity_summary: {
        Row: {
          activity_id: string | null
          calories_burned: number | null
          date: string | null
          duration: number | null
          intensity: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          activity_id?: string | null
          calories_burned?: number | null
          date?: string | null
          duration?: number | null
          intensity?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          activity_id?: string | null
          calories_burned?: number | null
          date?: string | null
          duration?: number | null
          intensity?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_bmi: {
        Args:
          | { weight: number; height: number }
          | { weight: number; height: number }
        Returns: number
      }
      get_bmi_category: {
        Args: { bmi_value: number } | { weight: number; height: number }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
